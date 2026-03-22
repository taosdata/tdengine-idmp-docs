# Deploying to Vercel

The Capability Explorer Flask app can be deployed to Vercel as a Python
serverless function. This guide covers the setup and any caveats.

## Prerequisites

- A [Vercel](https://vercel.com) account
- The Vercel CLI (`npm i -g vercel`) or the Vercel dashboard

## Project layout

Vercel-specific files live in the `sub-projects/capability-map/` directory:

```
sub-projects/capability-map/
├── api/
│   └── index.py          # Serverless entry point (imports the Flask app)
├── vercel.json            # Build & routing config
├── requirements.txt       # Python deps (root-level, read by Vercel)
├── scripts/
│   └── serve.py           # Flask app
├── templates/             # Jinja2 templates
├── static/                # CSS & JS
├── .sections/             # Section data (bundled into deploy)
├── other-cap-sets/        # Comparison YAML files
└── *.yaml                 # Taxonomy, aliases, section-map
```

## How it works

1. `vercel.json` tells Vercel to build `api/index.py` with `@vercel/python`.
2. `api/index.py` adds the project root to `sys.path` and imports the Flask
   `app` object from `scripts.serve`.
3. Vercel auto-detects the WSGI `app` and serves it as a serverless function.
4. Static assets under `static/` are served directly via a separate build rule.
5. All other routes are forwarded to the Flask function.

## Deploying

### Via the Vercel dashboard

1. Import the repository in the Vercel dashboard.
2. Set **Root Directory** to `sub-projects/capability-map`.
3. Deploy — Vercel will detect `vercel.json` automatically.

### Via the CLI

```bash
cd sub-projects/capability-map
vercel
```

On first run, follow the prompts to link the project. Subsequent deploys:

```bash
vercel --prod
```

## Environment variables

| Variable          | Purpose                                   | Default                         |
|-------------------|-------------------------------------------|---------------------------------|
| `SUBPROJECT_ROOT` | Override the project root path at runtime | Auto-detected from `__file__`   |

In most cases you do not need to set `SUBPROJECT_ROOT` — the auto-detection
works when Vercel's root directory is set correctly.

## Limitations

### `/doc/` route is unavailable

The `/doc/<path>` route renders raw Markdown files from the main docs tree
(`i18n/en/docusaurus-plugin-content-docs/current/`). This directory is outside
the capability-map sub-project and is **not included** in the Vercel
deployment. The route will return 404 on Vercel.

This is acceptable because the same content is available on the live docs site
at `https://idmpdocs.taosdata.com`.

### Cold starts

As a serverless function, the first request after a period of inactivity will
incur a cold start (typically 1-3 seconds). Subsequent requests within the
same invocation window are fast.

### `.sections/` directory

The `.sections/` directory contains extracted section data (`extraction.yaml`,
`section.md` files). These are bundled into the deployment automatically since
they live under the project root. If the directory is large, it may affect
deploy times.

## Local testing with Vercel CLI

```bash
cd sub-projects/capability-map
vercel dev
```

This simulates the Vercel environment locally, useful for debugging path
resolution issues.

## Troubleshooting

**Import errors** — If the function fails with `ModuleNotFoundError`, ensure
the root directory is set to `sub-projects/capability-map` in your Vercel
project settings. The `api/index.py` entry point adds this directory to
`sys.path`.

**Missing data files** — If routes return 500 errors about missing YAML files,
verify the `.yaml` data files are not in `.vercelignore` or `.gitignore`.

**Static assets 404** — The `vercel.json` routes serve `/static/*` from the
`static/` directory. If styles or scripts fail to load, check that the
`@vercel/static` build entry is present in `vercel.json`.
