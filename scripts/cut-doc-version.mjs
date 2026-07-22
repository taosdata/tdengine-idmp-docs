#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const args = parseArgs(process.argv.slice(2));

if (!args.tag) {
  fail('Missing required argument: --tag ver-a.b.c.0');
}
if (!args.previousVersion) {
  fail('Missing required argument: --previous-version a.b.c');
}

const tagInfo = parseTag(args.tag);
const previousVersion = parseVersion(args.previousVersion);
if (tagInfo.hotfix !== '0') {
  fail(`Tag ${args.tag} is not a version-cut tag. Expected a.b.c.0.`);
}

const versionsPath = path.join(repoRoot, 'versions.json');
const assembleConfigPath = path.join(repoRoot, 'assemble_config.json');
const zhReleaseDir = path.join(repoRoot, 'docs', '21-release-history');
const enReleaseDir = path.join(
  repoRoot,
  'i18n',
  'en',
  'docusaurus-plugin-content-docs',
  'current',
  '21-release-history'
);

const versions = readJson(versionsPath);
const assembleConfig = readJson(assembleConfigPath);

if (previousVersion === tagInfo.shortVersion) {
  fail(
    `previousVersion is already ${tagInfo.shortVersion}. ` +
      'Nothing to cut.'
  );
}

log(`Previous version: ${previousVersion}`);
log(`Next latest version: ${tagInfo.shortVersion}`);
log(`Release note file: ${tagInfo.fullVersion}.md`);

if (!args.skipInstall && !fs.existsSync(path.join(repoRoot, 'node_modules'))) {
  run('pnpm', ['install']);
}

if (!versions.includes(previousVersion)) {
  run('pnpm', ['run', 'docusaurus', 'docs:version', previousVersion]);
} else {
  log(`Skip docs:version. ${previousVersion} already exists in versions.json.`);
}

assembleConfig.assembleVersions.latest.version = tagInfo.shortVersion;
writeJson(assembleConfigPath, assembleConfig, args.dryRun);

const tagNotes = args.releaseNotes
  ? readFile(path.resolve(repoRoot, args.releaseNotes))
  : readTagAnnotation(args.tag);
const zhNotes = args.releaseNotesZh
  ? readFile(path.resolve(repoRoot, args.releaseNotesZh))
  : tagNotes;
const enNotes = args.releaseNotesEn
  ? readFile(path.resolve(repoRoot, args.releaseNotesEn))
  : tagNotes;

writeReleaseNote({
  dir: zhReleaseDir,
  fileName: `${tagInfo.fullVersion}.md`,
  title: tagInfo.fullVersion,
  body: zhNotes || defaultZhBody(),
  dryRun: args.dryRun,
  force: args.forceReleaseNotes,
});

writeReleaseNote({
  dir: enReleaseDir,
  fileName: `${tagInfo.fullVersion}.md`,
  title: tagInfo.fullVersion,
  body: enNotes || defaultEnBody(),
  dryRun: args.dryRun,
  force: args.forceReleaseNotes,
});

log('Done.');

function parseArgs(argv) {
  const parsed = {
    dryRun: false,
    forceReleaseNotes: false,
    skipInstall: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const current = argv[index];
    const next = argv[index + 1];

    if (current === '--') {
      continue;
    }

    switch (current) {
      case '--tag':
        parsed.tag = next;
        index += 1;
        break;
      case '--previous-version':
        parsed.previousVersion = next;
        index += 1;
        break;
      case '--release-notes':
        parsed.releaseNotes = next;
        index += 1;
        break;
      case '--release-notes-zh':
        parsed.releaseNotesZh = next;
        index += 1;
        break;
      case '--release-notes-en':
        parsed.releaseNotesEn = next;
        index += 1;
        break;
      case '--dry-run':
        parsed.dryRun = true;
        break;
      case '--force-release-notes':
        parsed.forceReleaseNotes = true;
        break;
      case '--skip-install':
        parsed.skipInstall = true;
        break;
      default:
        fail(`Unknown argument: ${current}`);
    }
  }

  return parsed;
}

function parseTag(tag) {
  const match = /^(?:ver-)?(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(tag);
  if (!match) {
    fail(`Invalid tag format: ${tag}. Expected ver-a.b.c.d or a.b.c.d.`);
  }

  const [, major, minor, patch, hotfix] = match;
  return {
    fullVersion: `${major}.${minor}.${patch}.${hotfix}`,
    shortVersion: `${major}.${minor}.${patch}`,
    hotfix,
  };
}

function parseVersion(version) {
  if (!/^\d+\.\d+\.\d+$/.test(version)) {
    fail(`Invalid previous version: ${version}. Expected a.b.c.`);
  }
  return version;
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, value, dryRun) {
  const content = `${JSON.stringify(value, null, 4)}\n`;
  writeFile(filePath, content, dryRun, true);
}

function writeReleaseNote({ dir, fileName, title, body, dryRun, force }) {
  const filePath = path.join(dir, fileName);
  if (fs.existsSync(filePath) && !force) {
    log(`Skip release note. ${path.relative(repoRoot, filePath)} already exists.`);
    return;
  }

  const content = `---\n` +
    `title: "${title}"\n` +
    `sidebar_label: "${title}"\n` +
    `---\n\n` +
    `${body.trim()}\n`;

  writeFile(filePath, content, dryRun);
}

function writeFile(filePath, content, dryRun, overwrite = false) {
  const relativePath = path.relative(repoRoot, filePath);
  if (dryRun) {
    log(`[dry-run] write ${relativePath}`);
    return;
  }

  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  if (!overwrite && fs.existsSync(filePath)) {
    fail(`Refusing to overwrite existing file: ${relativePath}`);
  }
  fs.writeFileSync(filePath, content, 'utf8');
  log(`Wrote ${relativePath}`);
}

function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readTagAnnotation(tag) {
  const result = spawnSync(
    'git',
    ['tag', '-l', '--format=%(contents)', tag],
    {
      cwd: repoRoot,
      encoding: 'utf8',
    }
  );

  if (result.status !== 0) {
    return '';
  }

  return result.stdout.trim();
}

function run(command, commandArgs) {
  if (args.dryRun) {
    log(`[dry-run] ${[command, ...commandArgs].join(' ')}`);
    return;
  }

  const result = spawnSync(command, commandArgs, {
    cwd: repoRoot,
    stdio: 'inherit',
    encoding: 'utf8',
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function defaultZhBody() {
  return [
    '## 特性',
    '',
    '1. 待补充。',
    '',
    '## 优化',
    '',
    '1. 待补充。',
    '',
    '## 修复',
    '',
    '1. 待补充。',
  ].join('\n');
}

function defaultEnBody() {
  return [
    '## Features',
    '',
    '1. TBD.',
    '',
    '## Improvements',
    '',
    '1. TBD.',
    '',
    '## Bug Fixes',
    '',
    '1. TBD.',
  ].join('\n');
}

function log(message) {
  console.log(`[cut-doc-version] ${message}`);
}

function fail(message) {
  console.error(`[cut-doc-version] ${message}`);
  process.exit(1);
}
