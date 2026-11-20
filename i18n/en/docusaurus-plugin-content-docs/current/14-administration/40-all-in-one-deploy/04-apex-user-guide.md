---
title: Apex User Guide
sidebar_label: Apex User Guide
---

# 14.13.4 Apex User Guide

This guide explains how Apex installs and manages TDengine All-in-One. It covers
the deployment workflow, directory layout, Windows and Linux host installation,
Docker, offline deployment, upgrades, troubleshooting, and operational practices.

Installation packages, images, and download pages may change between releases.
When a published filename or version differs from an example, follow the current
release page and installer output.

## 14.13.4.1 Quick Start

### 14.13.4.1.1 Download and Pin a Version

Use the TDengine download center to select the platform, architecture, and
version. The command-line installer uses the latest release by default. To pin a
version, pass it to the installer:

```bash
curl -fsSL https://downloads.taosdata.com/apex/v0.3.60/install.sh \
  | APEX_BASE_URL=https://downloads.taosdata.com/apex bash -s -- -m apex -v 0.3.60
```

For an internal release candidate, use the corresponding internal repository URL
and version shown by the release owner.

### 14.13.4.1.2 Install on a Windows Host

Before installation, confirm that the machine uses x64 Windows, has enough disk
space, and has no conflicting services on the required ports. Host deployments
require an ASCII Windows user name and user profile path by default. The
computer name must use ASCII characters. Host and Docker deployments require
AVX2-capable CPUs; TSDB-Enterprise and IDMP-Enterprise are not subject to this
check.

Run `TDengineSetup-x64.exe` as an administrator for Host mode. The recommended
quick installation deploys TDengine locally and opens the product page when it
finishes. For a custom installation, select **Host**, then choose the All-in-One,
TSDB-Enterprise, or IDMP-Enterprise profile. IDMP-Enterprise requires an
existing TSDB endpoint in `host:port` form, without an `http://` scheme.

The installer checks administrator privileges, architecture, system version,
disk space, and downgrade conditions before deployment. Additional checks for
the user name, computer name, ports, and security software run during deployment.
Record the Run ID shown on the final screen for troubleshooting.

If the required Visual C++ runtime is missing, Apex may attempt one silent
installation without restarting the computer. A reboot-required result stops
deployment and displays a restart prompt. Other runtime errors stop at a result
page with links to the Microsoft download and the installer log. A successful
installer return code is followed by a DLL version check; it is not treated as
proof that the runtime is usable.

Verify the installation and manage components from PowerShell:

```powershell
apex version
apex-component-status.ps1
apex-component-start.ps1 -Components tsdb,idmp
apex-component-stop.ps1 -Components tdgpt
```

Component uninstall normally retains product data. `apex-component-purge`
removes component data, configuration, logs, and residual files. It is a
destructive operation. Uninstalling TDengineSetup itself retains
`C:\ProgramData\TDengine\Apex` by default.

### 14.13.4.1.3 Install on a Linux Host

Host deployment supports Linux x64 and arm64 and requires root. All-in-One and
IDMP require glibc 2.28 or later. All-in-One on x86_64 also requires AVX2.
Ensure that `curl` and `tar` are available and that at least 20 GB of disk space
is free.

Install All-in-One:

```bash
curl -fsSL https://downloads.tdengine.com/apex/latest/install.sh \
  | bash -s -- -m apex
```

Select another profile with environment variables:

```bash
APEX_DEPLOY_PROFILE='TSDB-Enterprise' bash install.sh -m apex
APEX_DEPLOY_PROFILE='IDMP-Enterprise' \
  APEX_IDMP_ENDPOINT='127.0.0.1:6041' bash install.sh -m apex
```

The installer downloads the release, installs the Apex CLI, synchronizes
manifests and scripts, prepares artifacts, and starts deployment. The equivalent
explicit workflow is:

```bash
apex check -f deployment.yaml
apex validate -f deployment.yaml --manifests "$APEX_HOME/manifests"
apex prepare -f deployment.yaml --manifests "$APEX_HOME/manifests"
apex apply -f deployment.yaml --manifests "$APEX_HOME/manifests"
```

For remote or multi-node deployments, configure SSH access to each target and
verify the connection before deployment. A local single-node deployment uses
`transport: local` and does not require an SSH server or loopback SSH.

```bash
apex version
apex-component-status.sh
apex-component-start.sh tsdb,idmp
apex-component-stop.sh tdgpt
```

### 14.13.4.1.4 Deploy with Docker

Docker deployment supports Linux, macOS, and Windows. Install and start Docker
Engine or Docker Desktop, confirm that `docker version` and `docker compose
version` succeed, reserve at least 6 GiB of available memory, and ensure that
required TCP and UDP ports are available.

On Linux, run as root:

```bash
curl -fsSL https://downloads.tdengine.com/apex/latest/install.sh \
  | bash -s -- -m docker
```

On macOS, start Docker Desktop and run the same command as a regular user. Apex
rejects root, including `sudo`, on macOS. macOS supports Docker mode only, not
host deployment.

On Windows, start Docker Desktop and select **Docker** in `TDengineSetup-x64.exe`,
or use the standalone `install.ps1 -Mode docker` script. The standalone script
does not require administrator privileges. Docker mode is not subject to the
Host mode's non-ASCII user-directory restriction.

The Docker deployment assets are installed under `apex_home/docker/`. Copy
`.env.example` to `.env` and customize it as needed. Use the Apex-provided
`tdengine.sh` or `tdengine.ps1` script to start and stop services; direct Compose
start, stop, or down commands can bypass Apex handling for deployment mode,
images, health checks, compatibility, and volumes.

```bash
cd ~/.apex/docker
cp .env.example .env
./tdengine.sh start
./tdengine.sh stop
```

On Windows, use the corresponding `tdengine.ps1` script. Compose `ps` and `logs`
commands are suitable for read-only status checks. Do not use `down -v` unless
the persistent volumes are intentionally being deleted. When upgrading Docker
assets, compare the old `.env` with the new `.env.example` and retain existing
persistent volumes.

### 14.13.4.1.5 Advanced CLI Operations

```bash
apex version
apex check -f deployment.yaml
apex validate -f deployment.yaml --manifests manifests
apex validate --manifests manifests --check-urls
apex prepare -f deployment.yaml --manifests manifests
apex apply -f deployment.yaml --dry-run
apex deploy -f deployment.yaml --yes
apex clean -f deployment.yaml --yes
```

Use `--step`, `--from-step`, or `--steps` to select apply steps. Use
`--dependencies-only` or `--dependency <id>` to process dependency resources.
Review a `--dry-run` plan before the first deployment. Run
`apex <command> --help` for command-specific options.

After a successful full Host `deploy` or full `apply`, Apex saves a protected
Default Deployment under `apex_home/state/default-deployment/deployment.yaml`.
The snapshot records resolved component versions, nodes, transports, target
directories, and installation modes. It removes SSH passwords and retains only
private-key paths. A protected incomplete marker prevents package operations
from relying on an earlier snapshot after an interrupted or partially modifying
deployment. Use an explicit `-f` Deployment file until a full deployment
succeeds. Do not edit or remove the operation lock under
`apex_home/state/operation.lock`.

### 14.13.4.1.6 Common Deployment Scenarios

| Scenario | Recommended entry point | Notes |
| --- | --- | --- |
| Windows single-node Host | `TDengineSetup-x64.exe`, select Host | Requires administrator privileges. |
| Linux single-node Host | `install.sh -m apex` | Requires root; uses local transport by default. |
| Remote or multi-node Host | Apex CLI with SSH nodes | The controller prepares artifacts and distributes them over SSH. |
| Linux Docker | `install.sh -m docker` | Requires root, Docker Engine, and Compose. |
| macOS Docker | `install.sh -m docker` | Run as a regular user with Docker Desktop. |
| Windows Docker | TDengineSetup or `install.ps1 -Mode docker` | Standalone script does not require administrator privileges. |
| Offline Linux/Windows Host | Host offline Bundle | Build on a connected machine with matching OS and architecture. |

The default All-in-One profile includes TSDB, IDMP, and TDgpt. TDmodel is
included only when enabled by the release or deployment configuration and when
the target Host is a supported Ubuntu 24.04 Linux system. The installer summary
is authoritative. TSDB-Enterprise and IDMP-Enterprise are also available;
IDMP-Enterprise requires an existing TSDB REST endpoint. Host deployments of
IDMP write the AI service frontend URL into `scripts/.idmp-ai-env`; Docker mode
sets it through the Docker control script.

### 14.13.4.1.7 Component Delivery Modes and Optional Packages

Components that support package delivery can use `installMode: compact` or
`installMode: full` in a Deployment role. The default is `compact`. Availability
of `full` depends on the component version and platform manifest; unsupported
modes fail validation instead of silently falling back.

```yaml
roles:
  - id: node1-tsdb
    component: tsdb
    version: auto
    installMode: compact
```

On supported compact deployments, optional packages can be managed after a
successful full deployment:

```bash
apex package list
apex package install explorer
apex package remove explorer
```

The package name must exist in the component manifest. `list` checks package
state; `install` installs the selected package and its required resources but
does not run component lifecycle steps. `remove` requires confirmation unless
`--yes` is supplied. Full-mode nodes cannot manage optional packages separately.
Package operations do not delete cached artifacts. Windows TSDB extensions
cannot currently be removed independently; reinstalling TSDB core may remove an
existing extension.

`validate`, `prepare`, `apply`, and `deploy` also accept
`--install-mode compact|full` to apply a mode to all component roles without
rewriting the source YAML. If a trusted target record reports a different mode,
actual deployment asks for confirmation; automation can pass `--yes`.

### 14.13.4.1.8 Limited Partial Parallel Deployment

Execution is serial by default. An audited single-node deployment can request
`mode: partial-parallel` under `spec.execution`, explicitly selecting a
prerequisite role and a group of subsequent roles, and providing an audit file
with target-state declarations. The built-in Windows All-in-One manifest runs
TSDB first, then IDMP and TDgpt in parallel.

This is not a general parallel-execution switch. Partial step or resource
selection, missing audit data, an ineligible target, or manifests that do not
meet isolation requirements cause Apex to fall back to serial execution and
record the reason in the plan. Windows parallel execution also requires local
transport, the default Apex directory, the TSDB/IDMP/TDgpt component set,
administrator privileges, and a 64-bit x64 environment. The audit declarations
are operator authorization; they do not prove installation isolation. Artifact
verification, installation locks, mode confirmation, and health checks still
run.

## 14.13.4.2 Apex Workflow

### 14.13.4.2.1 What Apex Does

Apex is a manifest-driven deployment orchestrator. It reads the Deployment YAML
to determine nodes, platforms, transports, components, and versions; reads each
Component Manifest for installers, resources, dependencies, checksums, and
lifecycle commands; prepares and validates artifacts; and runs installation,
configuration, initialization, startup, and health checks. Apex records plans,
reports, and logs. Product installers remain responsible for product-specific
installation details and data formats.

### 14.13.4.2.2 Deployment YAML and Component Manifests

The Deployment YAML describes the deployment topology and execution environment.
Common fields include nodes, roles, `spec.apexDir`, SSH settings, release profile
and channel, and post-deployment actions. A Component Manifest describes how a
specific component version is installed, including supported platforms,
artifacts and SHA256 values, dependencies, required and optional resources, and
lifecycle steps.

Online `validate` can refresh versioned Component Manifests at paths derived from
their URL templates. It validates the candidate before replacing the local file.
Static manifests and standalone `prepare` or `apply` do not refresh manifests;
`validate --offline` does not access the network. A manifest can specify
`spec.minApexVersion`; Apex checks this requirement during validation and related
deployment and package operations.

### 14.13.4.2.3 Check, Validate, Prepare, and Apply

The standard workflow is:

```text
check -> validate -> prepare -> apply
```

| Stage | Purpose | Does not do |
| --- | --- | --- |
| `check` | Parses the Deployment YAML and checks node configuration and connectivity. | Load Component Manifests, access the network, or check artifacts. |
| `validate` | Checks schemas, versions, platforms, dependencies, resources, and lifecycle commands. | Download or install product artifacts. |
| `prepare` | Downloads or imports artifacts, verifies SHA256 values, and writes the cache index. | Connect to target nodes or install products. |
| `apply` | Creates a plan, distributes files, runs lifecycle commands, and checks component health. | Download artifacts or scan an offline directory. |

`deploy` combines these stages. For a manual workflow, complete `prepare` before
`apply`. If an artifact is missing from the prepared index, `apply` fails rather
than downloading it automatically. Start with `--dry-run` to inspect the target
nodes, components, paths, and commands.

### 14.13.4.2.4 Local and SSH Transports

`transport: local` executes commands on the machine running Apex. It is normally
used for a single-node host deployment and does not require SSH credentials.
`transport: ssh` is used when the controller and target are separate machines.
Apex uploads verified artifacts and scripts and runs lifecycle commands over
SSH. A Deployment can contain both transport types. The node's platform, not the
controller's operating system, selects the installer and lifecycle commands.

### 14.13.4.2.5 Platforms, Resources, and Commands

Use complete platform keys such as `linux-x64` and `windows-x64` for installers
and artifacts. Lifecycle steps first look up the complete platform key, then
fall back to an operating-system key such as `linux` or `windows`. An explicitly
empty list means no operation and does not fall back. Commands run from the
target's `spec.apexDir` by default; an explicit `workingDir` takes precedence.

If a resource omits `checkCommand` or `installCommand`, Apex derives a default
from the resource file. An explicit empty string disables that command.

### 14.13.4.2.6 Version Catalog

Components can use a fixed version or `version: auto` with a release profile and
channel. `validate` resolves automatic versions from the Version Catalog and
produces a resolved Deployment. `prepare` and `apply` use that resolved file and
do not resolve versions again.

When a catalog is cached, interactive use can prompt whether to refresh it.
Non-interactive use must specify `--use-cached-versions` or
`--refresh-versions`. Offline validation uses the existing `versions.json` and
fails if it is missing. Components must support dynamic manifests and artifacts
for `version: auto`; otherwise pin an exact version and ensure the local
Component Manifest contains the matching installer entry.

### 14.13.4.2.7 Artifacts, Reports, and Telemetry

Artifacts are product installers and runtime resources identified by filename,
URL, and SHA256. Offline imports match filenames exactly. Missing required
artifacts or checksum failures stop deployment; missing optional resources
normally produce a warning.

Plans and reports are written under `apex_home/reports/`. Each operation also
records logs and command evidence under
`<apex_home>/logs/YYYYMMDD-HHMMSS-<operation>-<shortId>/`. SSH logs remain on the
controller and are not automatically uploaded through Telemetry. Remove
passwords, private keys, and other sensitive values before sharing logs or
support bundles.

Telemetry is enabled by default and is best-effort: a send failure does not
change the installation result. Disable it with `telemetry_enabled: false` or
`APEX_TELEMETRY_DISABLED=1`. Dry runs do not send deployment events.

### 14.13.4.2.8 End-to-End Example: Deploy All-in-One

This example shows the stages of a single-node All-in-One deployment. TDmodel
is included only when enabled by the current release and supported by the target
platform.

```yaml
apiVersion: tdengine.taosdata.com/v1
kind: Deployment
metadata:
  name: TDengine Deployment on Single Node
spec:
  release:
    profile: all-in-one
    channel: stable
  nodes:
    - name: node1
      transport: local
      host: localhost
      platform: linux-x64
      roles:
        - id: node1-tsdb
          component: tsdb
          version: auto
        - id: node1-idmp
          component: idmp
          version: auto
        - id: node1-tdgpt
          component: tdgpt
          version: auto
```

The Deployment YAML declares the desired topology and profile. Apex makes it
executable in stages:

1. `check` parses the YAML, checks basic fields, and tests each node's transport.
   Local transport runs on the controller; SSH transport checks connectivity
   and merged SSH settings. This stage does not load manifests or access artifact
   sources.
2. `validate` loads the manifests for selected components, checks schemas,
   dependencies, platform support, artifact metadata, and lifecycle commands,
   then resolves `version: auto` to exact versions. It does not download
   artifacts, connect to targets, or install products.
3. `prepare` downloads online artifacts or imports exact filenames from an
   offline directory, verifies checksums, and writes the cache index. It does
   not connect to targets or install products.
4. `apply` creates a plan, distributes artifacts and scripts, runs component
   lifecycle commands in dependency order, and performs health checks. It writes
   reports and run logs. `--dry-run` only generates the plan and command preview.

`deploy` runs the same stages in sequence, passing the resolved Deployment from
validation to preparation and apply. It stops if a stage fails. Interactive
deployment asks for confirmation after displaying resolved component versions;
`--yes` skips the prompt.

## 14.13.4.3 Installation and Working Directories

### 14.13.4.3.1 The Three Directory Concepts

Keep these paths distinct:

1. **Controller Apex Home:** stores CLI configuration, manifests, scripts, cache,
   reports, and logs.
2. **Artifact cache:** stores downloaded or imported artifacts and their index;
   by default, it is under Apex Home.
3. **Target Apex directory:** selected by `spec.apexDir` and stores artifacts
   and scripts used on a target node.

When `spec.apexDir` is omitted, it defaults to Apex Home: `$HOME/.apex` on Linux
and macOS, and `C:\ProgramData\TDengine\Apex` on Windows. For a local
single-node deployment, these paths refer to the same directory. Product
installation, service, and data paths are determined by product installers and
Component Manifests, not by Apex Home.

### 14.13.4.3.2 Default Controller Paths

| Item | Linux/macOS script installation | Windows TDengineSetup |
| --- | --- | --- |
| Apex CLI | `/usr/local/bin/apex`, or `$HOME/.local/bin/apex` without write access | `C:\Program Files\TDengine\Apex\apex.exe` |
| Apex Home | `$HOME/.apex` | `C:\ProgramData\TDengine\Apex` |
| Configuration | `apex_home/config.yaml` | `C:\ProgramData\TDengine\Apex\config.yaml` |
| Artifact cache | `apex_home/cache` | `C:\ProgramData\TDengine\Apex\cache` |
| Docker assets | `apex_home/docker` | `C:\ProgramData\TDengine\Apex\docker` |

TDengineSetup keeps program files under Program Files and runtime data under
ProgramData. Its data directory is fixed; options such as `/apexhome` are
rejected. Do not treat the `C:\apex` path used in older documentation as the
current default.

Script installations can use custom locations:

```bash
./install.sh -m apex -H /data/apex-home -C /data/apex-cache
```

`APEX_HOME`, `APEX_CACHE_DIR`, and `APEX_INSTALL_DIR` can also configure the
Linux/macOS script installation paths. Changing Apex Home does not change the
default target `spec.apexDir`; configure it explicitly when needed.

### 14.13.4.3.3 Apex Home Layout

A typical Apex Home contains configuration, manifests, scripts, cache, reports,
run logs, and Docker assets:

```text
<apex_home>/
├── config.yaml
├── config.yaml.new
├── manifests/
├── scripts/
├── deploy-scripts/
├── cache/
│   ├── versions.json
│   ├── artifact-index.yaml
│   └── <verified-artifacts>
├── reports/
├── logs/YYYYMMDD-HHMMSS-<operation>-<shortId>/
└── docker/
    ├── tdengine.sh or tdengine.ps1
    ├── docker-compose-tdengine.yml
    ├── .env.example
    └── init-anode.sql
```

`config.yaml` can set `apex_home`, `base_url`, `versions_url`,
`component_manifest_urls`, `install_mode`, `telemetry_enabled`, and
`telemetry_endpoint`. During an upgrade, compare any generated `config.yaml.new`
file with the current configuration and merge intentional changes; do not
blindly replace user values.

## 14.13.4.4 Offline Deployment

This section covers Apex offline Bundle behavior only. It does not cover the
full offline installation and licensing workflow for the commercial All-in-One
edition.

The Apex offline Bundle supports Host mode on Linux x64/arm64 and Windows x64.
Docker, macOS, and reuse across operating systems or architectures are not
supported. The tested Linux distribution list includes Ubuntu, Kylin V10,
Kylinsec OS Linux 3, openEuler, Anolis, Rocky Linux, and RHEL. Component glibc,
CPU, and artifact platform requirements still apply.

### 14.13.4.4.1 Build a Bundle

Build the Bundle on an online machine with the same operating system and
architecture as the offline target:

```bash
bash install.sh --build-offline-bundle -m apex \
  -o ./apex-offline-linux-x64.tar.gz
```

On Windows:

```powershell
.\install.ps1 -BuildOfflineBundle -Mode apex `
  -Output .\apex-offline-windows-x64.zip
```

The Bundle includes the CLI, installation and deployment scripts, manifests,
cache, artifact index, and Bundle metadata. Only artifacts listed in
`artifact-index.yaml` are packaged; unrelated old files in the cache are not
included automatically.

### 14.13.4.4.2 Install from a Bundle

Copy the matching Bundle to the offline target and run:

```bash
sudo bash install.sh --offline -m apex \
  -b ./apex-offline-linux-x64.tar.gz -H /data/apex-home
```

On Windows:

```powershell
.\install.ps1 -Offline -Mode apex `
  -Bundle C:\staging\apex-offline-windows-x64.zip -H C:\ApexData
```

Windows online Host installation should use `TDengineSetup-x64.exe`; the
PowerShell command above is for offline Bundle installation. Offline mode
validates operating system, architecture, manifests, and cache completeness. It
fails with a list of missing artifacts instead of attempting an HTTP download.

## 14.13.4.5 Troubleshooting and Upgrades

### 14.13.4.5.1 Port Conflicts

Installation and redeployment perform port preflight checks. The checked ports
depend on the selected profile and may include both TCP and UDP. Review the
reported process and stop the conflicting service or change the deployment
configuration. IDE-created Remote SSH forwarding is normally ignored; set
`APEX_PORT_PREFLIGHT_STRICT=1` to treat it as a conflict. In non-interactive mode,
conflicts fail without prompting. Linux and macOS require at least one of `ss`,
`lsof`, or `netstat` for port detection.

### 14.13.4.5.2 Artifact Download or SHA256 Failure

Check the base URL, proxy, DNS, network region, and artifact URLs in the
Component Manifest. Do not bypass checksum validation or rename files from an
untrusted source. Remove the damaged cache entry and download it again, or
rebuild the offline Bundle from a trusted online machine.

```bash
apex validate -f deployment.yaml --manifests manifests --check-urls
apex prepare -f deployment.yaml --manifests manifests
```

### 14.13.4.5.3 SSH Connection Failure

Confirm that the node uses `transport: ssh`, then check its address, SSH port,
user name, private-key permissions, SSH server, firewall, merged global and
node-level SSH settings, and host-key policy. A local single-node deployment
does not require SSH; use `transport: local` instead.

### 14.13.4.5.4 Docker Startup Failure

Check Docker and Compose versions, Engine or Desktop status, user access to the
Docker socket, available memory, writable disk and volumes, port conflicts, and
registry or proxy settings. Inspect container status and logs with Compose. Do
not run `docker compose down -v` as a troubleshooting shortcut because it can
delete persistent volumes.

### 14.13.4.5.5 Windows Security Software Blocks Installation

Review Defender or third-party antivirus quarantine records if downloaded CLI,
scripts, or service files disappear. Have an administrator allow trusted release
files through the organization's security process, then download and verify the
official installer again. Keep the Run ID and logs for investigation.

### 14.13.4.5.6 Version Catalog Errors

Run `validate` before `prepare` or `apply` when using `version: auto`. In
automation, explicitly choose a catalog policy:

```bash
apex validate -f deployment.yaml --use-cached-versions
apex validate -f deployment.yaml --refresh-versions
```

Pass the resolved Deployment to `prepare` and `apply`; they do not accept an
unresolved `auto` version.

### 14.13.4.5.7 Upgrade Apex

Do not upgrade by replacing only the Apex binary. Record the current version and
deployment configuration, stop active operations, and back up configuration,
manifests, cache, Deployment YAML, Docker `.env`, Compose customizations, and
persistent data. Use the release-specific installer, then review any generated
`.new` configuration files and confirm that Apex Home, base URL, install mode,
and manifest sources are correct. Run `apex version`, `validate`, and
`apex apply --dry-run` before preparing artifacts and deploying again.

Older Windows Host installations made with PowerShell scripts may use
`%LOCALAPPDATA%\Apex\bin\apex.exe` and `%USERPROFILE%\.apex`. Back up these paths
and product data before migrating to TDengineSetup and its ProgramData layout.

### 14.13.4.5.8 Upgrade Windows Docker Assets

Back up `.env`, customized Compose files, and persistent data. Use the target
release's `TDengineSetup-x64.exe` and choose Docker to update Apex and the
deployment assets. Merge custom values into the new `.env`, review image tags,
ports, volumes, and networks, then use the current `tdengine.ps1` to stop and
start the services. Check health, logs, versions, volume mounts, and Anode
initialization before removing old containers or images. Never remove volumes
unless independent backups exist and data deletion is intended.

### 14.13.4.5.9 Uninstall, Purge, and Clean

These operations have different effects:

| Operation | Effect | Removes Apex Home? |
| --- | --- | --- |
| Component `uninstall` | Stops a component and invokes its product uninstaller; product data is normally retained. | No |
| Component `purge` | Stops and uninstalls components and removes their data, configuration, logs, and residual files. | No |
| `apex clean` | Removes the target node's Apex working directory. | Removes the target Apex directory, not the product. |

When `apexDir` is omitted, it defaults to Apex Home. For a local single-node
deployment, `apex clean` can therefore also remove configuration, cache,
reports, and logs. Confirm the target before running it. Purge is destructive and
requires explicit confirmation by default; use a dry run first.

```bash
bash scripts/apex-componentctl.sh purge --all --yes --dry-run
bash scripts/apex-componentctl.sh purge --all --yes
```

Uninstalling Apex itself does not uninstall TSDB, IDMP, or other products, and
does not remove Docker containers, images, or volumes. Remove those separately
using component lifecycle and Docker control scripts.

### 14.13.4.5.10 Logs, Reports, and Failure Handling

After a failure, record the error summary, node, component, stage, and Run ID.
Review `apex_home/reports/deployment-report.txt`, the deployment plan, and the
current run's `summary.txt` and `apex.log`. Component stdout and stderr are stored
under a component, node, and stage-specific path. Inspect a suspicious command
with `apex apply --dry-run` and check component status before retrying. Fix the
cause before repeating a destructive operation.

The run summary reports deployment execution time from creation of the run
record through the result page. Time spent waiting to close the completed
installer is excluded, as may be startup and elevation time before the run record
is created.

The machine-readable `report.yaml` is an internal state file and should not be
edited manually. Windows Apex MSI output is consolidated into the operation's
`install.log` when successful; the original MSI log remains if consolidation
fails. Redact passwords, private keys, and other sensitive values before sharing
logs or support bundles.

### 14.13.4.5.11 Uninstall Apex

On Windows, uninstall TDengineSetup from the installer or Windows Apps settings.
The default uninstall retains `C:\ProgramData\TDengine\Apex`. Use
`/remove-data` only after backing up and when deleting that data is intentional:

```powershell
TDengineSetup-x64.exe /uninstall
TDengineSetup-x64.exe /uninstall /remove-data
```

On Linux and macOS, script installation does not provide an uninstall command.
Remove the Apex CLI, Apex Home, and the PATH block added to `~/.profile` as
needed. If `-H` was used, also check for a configuration copy under
`$HOME/.apex/config.yaml`. Apex uninstall does not remove installed products or
Docker resources.

## 14.13.4.6 Best Practices

### 14.13.4.6.1 Windows Host

- Use the current `TDengineSetup-x64.exe` and retain installer verification
  information.
- Run with administrator privileges and check disk space, ASCII user and
  computer names, port availability, and security software policy in advance.
- Back up `C:\ProgramData\TDengine\Apex` separately from product business data.
- Retain configuration, Deployment YAML, manifests, cache indexes, and the Apex
  version used for each upgrade.
- Review `apex apply --dry-run` before deployment and verify services, ports,
  health checks, and product logs after an upgrade.
- Require approval and an independent backup before uninstall, purge, or
  `/remove-data` operations.

### 14.13.4.6.2 Docker

- Use `tdengine.sh` or `tdengine.ps1` to start, stop, and upgrade images.
- Keep `.env`, Compose customizations, and persistent data in known locations;
  test data backup and restore independently.
- Fix image tags, Apex versions, and registries in production instead of relying
  on an untracked `latest` tag.
- Set `APEX_NETWORK_REGION` or `APEX_DOCKER_REGISTRY` for the deployment network.
- Reserve at least 6 GiB of memory and sufficient disk for data, logs, and image
  layers.
- Back up `.env` and data before upgrades, then check Compose status, health, and
  logs after restarting services.
- Do not remove old images until confirming that no other Compose project uses
  them. Avoid `down -v` to prevent data loss.
- Docker mode does not support offline installation or upgrades.

### 14.13.4.6.3 General Deployment Practices

- Version-control Deployment YAML, and inject passwords and private keys through
  a secure credential mechanism.
- Use `validate --check-urls` for online deployment and exact versions and Bundle
  metadata for offline deployment.
- Specify each node's platform and transport explicitly in multi-node
  deployments.
- Use `check`, `validate`, `prepare`, and `apply` for initial deployments; use
  `deploy` for automation after the process is stable.
- Retain each Run ID, report, and version list for upgrades and support cases.
- Evaluate optional model resources for disk space, memory, and startup time
  before enabling them.
- CLS is intended mainly for All-in-One and IDMP scenarios. Confirm the licensing
  design before using it with standalone TSDB.

## 14.13.4.7 Apex Behavior History

This section summarizes notable changes recorded in the repository history. It
does not replace the current operational behavior described above. When history
conflicts with the current release, follow the current implementation, release
package, and installer output.

### 14.13.4.7.1 Directory and Project Evolution

| Stage | Representative paths or files | User-visible change |
| --- | --- | --- |
| Initial project (2026-07-08) | `manifests/`, `templates/`, installation design documents | Deployment and component manifests and configuration templates existed before a complete CLI project. |
| CLI established (2026-07-09) | `cmd/apex/`, `internal/`, `testdata/`, `docs/`, `Makefile` | CLI, validation, planning, artifact handling, execution, reports, and tests were organized. |
| Host scripts added (2026-07-16) | `install.sh`, `install.ps1`, `deploy-scripts/`, `scripts/`, `tests/` | Installers began bootstrapping Apex, with platform scripts handling Host deployment. |
| Docker and release tooling (2026-07-17 to 2026-07-24) | Registry scripts, Docker assets, release tools | Docker became a separate installation mode using scripts, Compose assets, and deployment tooling. |
| Windows installer added (2026-08-25) | `cmd/apexsetup/`, `internal/installer/`, `installer/wix/` | Windows added the TDengineSetup graphical installer. |
| Installer renamed (2026-09-10) | `ApexSetup-x64.exe` to `TDengineSetup-x64.exe` | The installer filename and product name changed; installation paths and options did not. |
| Current structure (2026-11) | `internal/`, `installer/`, `deploy-scripts/`, `scripts/`, `manifests/`, `tools/`, `tests/` | Source, runtime scripts, installer, release pipeline, examples, and tests are maintained in separate areas. |

### 14.13.4.7.2 Feature Evolution

#### Manifest-Driven Deployment

The deployment process evolved from fixed components and Deployment YAML to
versioned Component Manifests, schema and platform checks, dependency validation,
resource installation, SHA256 verification, lifecycle steps, and deployment
reports. Online validation can retrieve a versioned manifest when required;
offline validation does not download one. Prefer validating first and then using
the resolved Deployment instead of replacing a fixed manifest directly.

#### Local and SSH Transports

The original executor centered on SSH. Local transport was added so single-node
deployments can run directly without an SSH server. SSH remains available for
remote and multi-node deployments. Loopback SSH is unnecessary for a local
single-node deployment.

#### Host, Docker, and Offline Modes

Platform installation scripts and Host deployment were added in July 2026,
followed by Windows Docker support and Host offline Bundles. Docker does not use
the Host offline Bundle, and macOS does not support Host or offline deployment.

#### Docker Improvements

Docker support gained registry detection, image-source configuration, restart
handling, Compose health-check retries, and failure recovery guidance. Asset
names were standardized, memory preflight was aligned with the 6 GiB requirement,
and platform-specific privilege rules were clarified: Linux Docker requires
root, macOS Docker rejects root, and the standalone Windows Docker script does
not require administrator privileges.

### 14.13.4.7.3 Platform and Product Changes

#### Windows Host

Windows Host support added PowerShell compatibility, service startup timeouts,
stale-process handling, localized service queries, and Defender/AMSI and
third-party antivirus checks. Host deployments require ASCII user and profile
paths; Docker mode is not subject to that restriction. TDengineSetup later added
profile selection, update checks, data-directory locking, and a quick-install
home page. The current quick-install page indicates approximately 8 GB for the
product directory, while Apex performs a separate 500 MB program/data directory
preflight.

#### Component Lifecycle

Component lifecycle scripts now support start, stop, status, uninstall, and
purge. These operations manage products and do not remove the Apex CLI, Apex
Home, or cache. Uninstall and purge have distinct data-retention behavior.

#### Telemetry, Logs, and Errors

Telemetry, unified logs, failure evidence, reports, and Docker stage reporting
were added over time. Each operation now has a readable run directory, while
SSH evidence remains on the controller. Telemetry is best-effort and does not
upload complete logs automatically.

#### Network Regions and Artifact Sources

Apex detects `lan`, `cn`, and `overseas` network regions to select default
artifact URLs and Docker registries. Public downloads use
`downloads.tdengine.com`; `APEX_BASE_URL`, `APEX_NETWORK_REGION`, and
`APEX_DOCKER_REGISTRY` can override defaults. Recheck internal sources, proxies,
and registries when upgrading an older environment.

### 14.13.4.7.4 Paths, Configuration, and Upgrades

1. Apex Home and local configuration separated cache, scripts, and runtime data
   from code defaults.
2. Custom Apex Home and Windows installation paths were added.
3. Upgrades began preserving user configuration and manifests; conflicts can be
   written to `.new` files for review.
4. Deployment reports and offline Bundles were aligned with Apex Home.
5. Release paths adopted `latest/` and version-specific directories, separating
   Windows MSI program files from ProgramData.
6. Apex Home, cache, online/offline configuration merging, and upgrade rules were
   further standardized; new configuration keys may be added without replacing
   user values.
7. Components added `compact` and `full` delivery modes and optional package
   management. Windows TSDB silent uninstall retains `data`, `cfg`, and `log`;
   purge removes them.
8. Offline OS support expanded to RHEL and Kylinsec OS Linux 3. TDengineSetup
   added quick/custom installation and custom `/deployment` manifests. Deployment
   gained limited partial parallel execution and `apex analyze` timing analysis.
9. Successful full Host deployments now save a protected Default Deployment.
   Component Manifests can also set `spec.minApexVersion`.

Recent corrections clarify that macOS Docker must run as a regular user,
standalone Windows Docker does not require administrator privileges, and Host
mode does. Windows installer progress and cancellation reporting were improved;
Linux no longer assumes `/etc/os-release` contains `VERSION_ID`. Component
packages can use compact/full modes, while Windows TSDB extensions cannot yet be
removed independently. Optional TDmodel inclusion depends on release settings
and supported platforms.

### 14.13.4.7.5 Migration from Older Behavior

| Older behavior | Current guidance |
| --- | --- |
| Use loopback SSH for a single machine | Use `transport: local`; use SSH for remote nodes. |
| Maintain only a fixed Component Manifest | Run `validate`; prepare exact manifest files for offline use. |
| Replace only the Apex binary | Use the full installer and retain configuration, manifests, cache, and `.new` files. |
| Use only `install.sh` or `install.ps1` on Windows | Use TDengineSetup for current Windows Host installation and select Host or Docker explicitly. |
| Use `ApexSetup-x64.exe` | The installer is now named `TDengineSetup-x64.exe`; installation and data paths are unchanged. |
| Delete component directories manually | Use lifecycle commands and distinguish component purge, `apex clean`, and product data removal. |
| Rely on old Docker asset names or registries | Refresh current `tdengine` assets and check registry, memory, and Compose health. |
| Expect one package for every component | Use `compact` by default, `full` where supported, and `apex package` for optional packages. |
| Assume every Linux distribution supports offline installation | Check the OS and architecture allowlist and each component's runtime requirements. |

## 14.13.4.8 Command Reference

| Purpose | Linux/macOS | Windows |
| --- | --- | --- |
| Online Host installation | `./install.sh -m apex` | `TDengineSetup-x64.exe`, select Host |
| Online Docker installation | `./install.sh -m docker` | `TDengineSetup-x64.exe`, select Docker |
| Build an offline Bundle | `./install.sh --build-offline-bundle -m apex -o bundle.tar.gz` | `.install.ps1 -BuildOfflineBundle -Mode apex -Output bundle.zip` |
| Install offline | `./install.sh --offline -m apex -b bundle.tar.gz` | `.install.ps1 -Offline -Mode apex -Bundle bundle.zip` |
| Show version | `apex version` | `apex version` |
| Check nodes | `apex check -f deployment.yaml` | `apex check -f deployment.yaml` |
| Validate deployment | `apex validate -f deployment.yaml` | `apex validate -f deployment.yaml` |
| Prepare artifacts | `apex prepare -f deployment.yaml` | `apex prepare -f deployment.yaml` |
| Preview deployment | `apex apply -f deployment.yaml --dry-run` | `apex apply -f deployment.yaml --dry-run` |
| Deploy | `apex deploy -f deployment.yaml --yes` | `apex deploy -f deployment.yaml --yes` |
| Clean Apex directory | `apex clean -f deployment.yaml --yes` | `apex clean -f deployment.yaml --yes` |
| Uninstall Apex | Remove the CLI, Apex Home, and PATH configuration as needed | `TDengineSetup-x64.exe /uninstall` |

For detailed field definitions, offline options, lifecycle scripts, and release
information, see `docs/cli.md`, `docs/yaml.md`,
`docs/offline-deployment-guide.md`, `docs/component-lifecycle-scripts-zh.md`, and
`docs/release.md` in the Apex source repository.
