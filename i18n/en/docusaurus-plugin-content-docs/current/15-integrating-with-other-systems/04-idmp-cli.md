---
title: IDMP CLI
sidebar_label: IDMP CLI
---

# 15.4 IDMP CLI

`idmp-cli` is the official command-line tool for TDengine IDMP. It is designed for local terminal workflows, scripted automation, and agent-driven operations. The CLI combines configuration management, authentication, OpenAPI command discovery, and explicit safety controls in one entry point, so operators can query, troubleshoot, and perform controlled write actions without relying on the Web UI.

If the goal is to let an LLM connect to IDMP directly through remote MCP, see [15.2 MCP Interface](./02-mcp-interface.md). If the goal is to run stable, auditable IDMP commands from a terminal, CI pipeline, or agent runtime, `idmp-cli` is the better fit.

:::tip Shortest onboarding path

1. Install `idmp-cli`.
2. Run `idmp-cli config init` to save the server URL and complete the first login.
3. Run `idmp-cli auth check --remote` to confirm the server accepts the current credential.
4. Use `idmp-cli schema search <keyword>` before running a command, and always use `--dry-run` before write operations.

:::

## 15.4.1 When to Use IDMP CLI

`idmp-cli` is a good fit for the following cases:

- Daily terminal-based IDMP queries and troubleshooting, such as inspecting elements, analyses, panels, and authentication state.
- Scripted, CI, or batch API execution with explicit risk acknowledgement for non-readonly operations.
- Claude Code or other agent workflows that need discoverable, reusable, and auditable IDMP commands.
- Situations where the exact command path is not known in advance and must be located through schema inspection.

## 15.4.2 Prerequisites

Prepare the following items before starting:

| Item | Description |
|---|---|
| IDMP server URL | Use the real endpoint that your environment can reach. The examples below use `https://<IDMP_HOST>:6034`. For certificate or network troubleshooting, switch temporarily to `http://<IDMP_HOST>:6042`. |
| Credential | Use either a username and password or a pre-issued API key. |
| Local dependency | The minimum requirement for both online and offline CLI installation is `Node.js 16+` and `npm`. Prefer a currently supported Node.js LTS release when possible. |
| Supported platforms | The CLI supports macOS, Linux, and Windows on `x64` and `arm64`. |
| Optional agent runtime | If the CLI will be used with Claude Code or another agent, install the related plugin or skills later in the process. |

:::warning Use HTTP only for temporary troubleshooting
If you must switch temporarily to `http://<IDMP_HOST>:6042` for connectivity checks, do so only inside a trusted, isolated network and avoid logging in or sending real passwords, API keys, bearer tokens, or other sensitive credentials over HTTP.
:::

On an interactive terminal, `config init` and `auth login` can prompt for missing secrets. The examples in this page prefer `stdin` so they can be copied into scripts and automation flows directly.

In the examples below, `<IDMP_HOST>`, `admin@example.com`, `$IDMP_PASSWORD`, and `$IDMP_API_KEY` are placeholders. Replace them with real values before running the commands, or set the environment variables first.

**Linux / macOS**

```bash
export IDMP_PASSWORD='<password>'
export IDMP_API_KEY='api_<key_id>.<secret>'
```

**Windows PowerShell**

```powershell
$env:IDMP_PASSWORD = '<password>'
$env:IDMP_API_KEY = 'api_<key_id>.<secret>'
```

## 15.4.3 Installing IDMP CLI

Install the CLI first. Claude Code plugins and third-party agent skills are add-ons and should be installed only after the CLI itself works correctly.

### 15.4.3.1 Online Installation

Install the published npm package globally:

```bash
npm install -g @tdengine/idmp-cli
```

Then verify that the command is available:

```bash
idmp-cli --help
idmp-cli --version
```

This step installs the CLI only. It does not install the Claude Code plugin or any other agent skills.

### 15.4.3.2 Offline Installation

If the environment cannot reach npm directly, use the extracted release bundle instead. Run the installer from the root of the extracted offline bundle:

**Linux / macOS**

```bash
bash installers/install-cli-offline.sh
```

**Windows**

```cmd
installers\install-cli-offline.cmd
```

`install-cli-offline.*` installs the launcher package plus the matching platform binary package, and validates `Node.js` / `npm` availability and package version consistency before changing the global npm state.

## 15.4.4 Using IDMP CLI with Agents

`idmp-cli` works on its own, but it also serves as an execution backend for agent workflows. The recommended order is to install the CLI first and then add the plugin or skills that match the target runtime.

### 15.4.4.1 Claude Code

For local Claude Code, the recommended installation path is the TDengine `idmp-plugin`. The plugin already bundles the matching skills, so the same skills should not be installed into Claude Code a second time.

**Online installation**

```bash
claude plugin marketplace add taosdata/agent-skills
claude plugin install idmp-plugin@taosdata
```

**Offline installation**

From the root of the extracted offline bundle:

**Linux / macOS**

```bash
bash installers/install-plugin-offline.sh
```

**Windows**

```cmd
installers\install-plugin-offline.cmd
```

By default, the plugin is installed into `~/.claude/plugins/idmp-plugin`. To load that directory explicitly, run:

**Linux / macOS**

```bash
claude --plugin-dir "$HOME/.claude/plugins/idmp-plugin"
```

**Windows PowerShell**

```powershell
claude --plugin-dir "$env:USERPROFILE\.claude\plugins\idmp-plugin"
```

### 15.4.4.2 Other Agents

For agents other than Claude Code, install `taosdata/agent-skills` separately when the runtime supports a skills directory or an equivalent mechanism. One important detail is that `install-skills-offline.*` still defaults to Claude's skills directory: `~/.claude/skills`, or `%USERPROFILE%\.claude\skills` on Windows. For non-Claude agents, do not rely on the default target.

**Online installation**

If you want to inspect which skills are available in the repository first, preview them with:

```bash
npx --yes skills add taosdata/agent-skills -g -y --list
```

Then install the skills:

```bash
npx --yes skills add taosdata/agent-skills -g -y
```

**Offline installation**

From the root of the extracted offline bundle, pass the target agent's skills directory explicitly so the installer does not keep writing into Claude's default location:

**Linux / macOS**

```bash
bash installers/install-skills-offline.sh --target-dir /path/to/other-agent/skills
```

**Windows**

```cmd
installers\install-skills-offline.cmd --target-dir C:\path\to\other-agent\skills
```

If `--target-dir` is omitted, the script copies the skills into Claude's default directory and does not infer which other agent should receive them. The offline installer is only a directory copier; whether another agent can discover those skills still depends on that agent's own directory convention or import flow.

If the target agent does not provide a dedicated skills directory, copy `assets/skills/*` from the offline bundle into that agent's skill location, or import each skill's Markdown content into the agent's reusable prompt or instruction system manually. In every case, make sure `idmp-cli` is already installed and available on `PATH`.

### 15.4.4.3 Recommended Agent Workflow

The following execution order works well for most agent tasks:

1. Let the skill classify the task first: element, analysis, panel, data import/export, permissions, and so on.
2. Use `idmp-cli schema search <keyword>` to locate the real command path.
3. For unfamiliar commands, inspect `idmp-cli schema <service.resource.method>` before execution.
4. Prefer shortcut commands when they fit; switch to structured commands when more precision is needed; use raw API calls only as the final fallback.
5. For write operations, run `--dry-run` first and execute the real command only after the preview looks correct.
6. After a write, reread the target object or run `auth check --remote` / `doctor` when connection state must be confirmed.

## 15.4.5 Creating a Profile and Logging In

A `profile` is a saved environment configuration. For most first-time users, starting with the `default` profile is enough. `config init` can create or update that profile, authenticate immediately, and persist the session locally.

### 15.4.5.1 Log In with Username and Password

**Linux / macOS**

```bash
printf '%s\n' "$IDMP_PASSWORD" | idmp-cli config init \
  --profile default \
  --server https://<IDMP_HOST>:6034 \
  --username admin@example.com \
  --password-stdin
```

**Windows PowerShell**

```powershell
$env:IDMP_PASSWORD | idmp-cli config init `
  --profile default `
  --server https://<IDMP_HOST>:6034 `
  --username admin@example.com `
  --password-stdin
```

This command does 4 things in one step:

1. Saves the `default` profile.
2. Stores the target server URL.
3. Logs in with the supplied account.
4. Persists the session for later commands.

### 15.4.5.2 Log In with an API Key

If an API key is already available, use this flow instead:

**Linux / macOS**

```bash
printf '%s\n' "$IDMP_API_KEY" | idmp-cli config init \
  --profile default \
  --server https://<IDMP_HOST>:6034 \
  --api-key-stdin
```

**Windows PowerShell**

```powershell
$env:IDMP_API_KEY | idmp-cli config init `
  --profile default `
  --server https://<IDMP_HOST>:6034 `
  --api-key-stdin
```

In this mode, the CLI records the session as `api_key` authentication. This is usually more stable than managing a login session manually in long-running scripts and agent workflows.

### 15.4.5.3 Verify the Current State

After the first login, run the following checks immediately:

```bash
idmp-cli profile list
idmp-cli auth check --remote
idmp-cli doctor --offline
```

These commands confirm the saved environments, verify that the server accepts the current credential, and check whether local configuration, session storage, and generated metadata are all in place.

These examples use IDMP's default external HTTPS port `6034`. When certificate or network troubleshooting is required, switch only the protocol and port temporarily to `http://<IDMP_HOST>:6042`, but only for short-lived troubleshooting inside a trusted, isolated network. Avoid logging in or sending real passwords, API keys, bearer tokens, or other sensitive credentials over HTTP, and move back to HTTPS after the issue is resolved.

If the environment uses a self-signed certificate, `idmp-cli` does not skip certificate verification by default. HTTPS works only when that certificate, or the CA that issued it, has already been imported into the current machine's system trust store. If the trust chain is not in place yet, use `http://<IDMP_HOST>:6042` only as a temporary troubleshooting path, and avoid sending sensitive credentials over HTTP. The CLI does not currently provide a `--insecure`-style flag to bypass certificate verification.

## 15.4.6 Understanding the Command Model

`idmp-cli` is easiest to learn when its command model is treated as 4 layers.

| Type | Structure | Best use | Example |
|---|---|---|---|
| Built-in commands | `idmp-cli auth ...` | Configuration, login, profile switching, troubleshooting | `idmp-cli auth check --remote` |
| Shortcut commands | `idmp-cli element +list` | High-frequency read operations with simpler arguments | `idmp-cli panel +search meter --size 10` |
| Structured commands | `idmp-cli <service> <resource> <method>` | Precise control of the OpenAPI-derived command path and parameters | `idmp-cli element elements list --params '{"current":1,"size":20}'` |
| Raw API command | `idmp-cli api GET /api/v1/...` | Cases where the exact path is already known, or the surface is not exposed as a top-level command | `idmp-cli api GET /api/v1/elements --params '{"current":1,"size":20}'` |

When the exact command path is uncertain, start with `schema search`. That is more reliable than guessing, and it works especially well in agent-driven flows.

### 15.4.6.1 What `+list` Actually Means

Commands such as `+list`, `+search`, and `+get` are shortcut subcommands attached to one service command group. The leading `+` is part of the command name itself. It is not shell syntax and not an original IDMP API path. The CLI registers these shortcuts under the related service, such as `element +list`, `analysis +list <element-id>`, and `panel +search <keyword>`.

A shortcut still resolves to one real schema path before execution. For example:

| Shortcut command | Actual mapping |
|---|---|
| `idmp-cli element +list` | `element.elements.list` |
| `idmp-cli element +search <keyword>` | `element.elements.search` |
| `idmp-cli analysis +list <element-id>` | `analysis.analyses.list` |

Because of that, the same shortcut name can mean slightly different things under different services. `element +list` means “list elements”, while `analysis +list <element-id>` means “list analyses for one element”. What they share is the design goal of a high-frequency shortcut layer, not one universal argument template.

If the final target is unclear, the safest way to inspect a shortcut is to use `--dry-run` first:

```bash
idmp-cli element +list --parent-id 100 --dry-run
idmp-cli analysis +list <ELEMENT_ID> --dry-run
```

The preview prints fields such as `shortcut`, `method`, `path`, `params`, and `risk`, so you can see which structured command the shortcut resolves to. At execution time, shortcuts still pass through the same validation, safety acknowledgement, auto paging, and output formatting pipeline.

## 15.4.7 Recommended Daily Workflow

Use the sequence “find the path → inspect the schema → run a readonly command → preview writes” as the default working pattern.

### 15.4.7.1 Find the Right Command Path First

```bash
idmp-cli schema search elements
idmp-cli schema element.elements.list
idmp-cli element elements list --help
```

`schema search` finds candidate paths from a keyword. `schema <service.resource.method>` shows parameters, risk classification, paging support, and example commands. For unfamiliar commands, inspect the schema first and execute the real call second.

### 15.4.7.2 Prefer Shortcut Commands for Common Reads

```bash
idmp-cli element +search <keyword> --size 20 --format table
idmp-cli element +list --size 20 --format table
idmp-cli analysis +list <ELEMENT_ID> --format pretty
idmp-cli panel +search meter --size 10 --format table
```

Shortcut commands are a good fit for common read scenarios such as searching for elements, listing elements, or reviewing analyses for one element. Under the hood they still call generated commands, but the interface is easier to remember for routine operator work. For commands that need an `ELEMENT_ID`, locate the target ID first with `element +search` or `element +list`.

### 15.4.7.3 Use Structured Commands for Precise Control

```bash
idmp-cli element elements list --params '{"current":1,"size":20}' --format table
idmp-cli analysis analyses list --params '{"elementId":"<ELEMENT_ID>","current":1,"size":20}' --format pretty
```

Structured commands map directly to the OpenAPI service, resource, and method model. They are the right choice when the `service / resource / method` relationship must be explicit or when the schema output is part of the execution workflow.

### 15.4.7.4 Use Raw API Calls as the Fallback Layer

```bash
idmp-cli api GET /api/v1/elements --params '{"current":1,"size":20}'
```

Use the raw `api` command when the endpoint path is already known or when the target surface exists only as a proxy path. Even then, it is still best to check whether a shortcut or structured command already provides a more stable abstraction first.

### 15.4.7.5 Use Auto Paging When the Result Set Is Large

```bash
idmp-cli element +list --size 100 --page-all --page-limit 500 --page-delay 200ms --format table
idmp-cli api GET /api/v1/elements --params '{"current":1,"size":100}' --page-all --page-limit 500
```

`--page-all` is only for GET commands that use `current / size` style pagination. When enabled, the CLI fetches page by page and merges the result set. Use `--page-limit` to cap the merged row count; `0` means unlimited. Use `--page-delay` to add a pause between page requests when the backend should not be hit too aggressively.

If the server does not clearly indicate that pagination has finished, the CLI aborts auto paging after 500 pages. In scripts, CI, and agent workflows, it is safer to pair `--page-all` with `--page-limit` instead of collecting pages without a bound.

## 15.4.8 Safe Write Execution

`idmp-cli` enables explicit risk acknowledgement for non-readonly operations by default. This matters even more in scripts, CI jobs, and agent-driven workflows.

### 15.4.8.1 Preview the Request First

```bash
idmp-cli schema analysis.analyses.create
idmp-cli analysis analyses create \
  --params '<PARAMS_JSON_FROM_SCHEMA>' \
  --data '<DATA_JSON_FROM_SCHEMA>' \
  --dry-run
```

`--dry-run` prints a request preview instead of performing the write. The preview usually includes `method`, `path`, `risk`, `params`, and `data`, which makes it the safest way to confirm the request shape before execution. Required fields vary by method, so use `schema` to inspect the current parameter and request-body structure before composing the real payload.

### 15.4.8.2 Execute the Write Deliberately

```bash
idmp-cli analysis analyses create \
  --params '<PARAMS_JSON_FROM_SCHEMA>' \
  --data '<DATA_JSON_FROM_SCHEMA>' \
  --ack-risk
```

If `--ack-risk` is omitted on a non-readonly command, the CLI refuses to execute the operation. On interactive terminals, some write actions may also ask for an explicit confirmation. The safest default is always “`--dry-run` first, `--ack-risk` second”.

## 15.4.9 Local Storage and Environment Variables

The following local paths and environment variables are especially useful in scripts and agent integrations:

| Item | Default or variable | Purpose |
|---|---|---|
| Config directory | `~/.idmp-cli` | Default location for CLI configuration and session metadata. |
| Config file | `~/.idmp-cli/config.json` | Stores profiles and the current default environment. |
| Sessions file | `~/.idmp-cli/sessions.json` | Stores session metadata for each profile. |
| Current profile | `--profile` or `IDMP_PROFILE` | Switch the active environment temporarily. |
| Server URL | `IDMP_BASE_URL` | Point the CLI to a server directly without loading a local profile first. |
| API key | `IDMP_API_KEY` | Supply an API key through the environment. |
| Token | `IDMP_TOKEN` | Supply a bearer token through the environment. |
| Config directory override | `IDMP_CLI_CONFIG_DIR` | Redirect config and session storage to a custom directory. |
| Session storage mode | `IDMP_CLI_SESSION_STORAGE` | Choose `file`, `keyring`, or `auto` storage mode. |

On Windows, these default paths usually map to `%USERPROFILE%\.idmp-cli`, `%USERPROFILE%\.idmp-cli\config.json`, and `%USERPROFILE%\.idmp-cli\sessions.json`.

`IDMP_CLI_SESSION_STORAGE=auto` does not always mean keyring. On macOS and Windows it usually resolves to the system keychain. On Linux it uses keyring only when the current session has a working D-Bus session bus; otherwise it falls back to `file`. To confirm the effective backend, run `idmp-cli auth status` or `idmp-cli doctor --offline` and check `session_storage_mode` and `session_storage_backend` in the output.

If multiple agents, parallel CI jobs, or multiple terminals may run local state changing commands such as `config init`, `auth login`, or `profile add/remove/use` at the same time, do not share the same `IDMP_CLI_CONFIG_DIR`. A separate config directory per runtime unit is the safer pattern.

For quick multi-environment switching, combine `profile use <name>`, `profile list`, and the global `--profile <name>` flag.

## 15.4.10 Security Guidance

`idmp-cli` often runs with write access in automation and agent workflows, so its operating model should be treated as a security boundary rather than a convenience wrapper.

### 15.4.10.1 Protect Secret Input and Storage

Use the following defaults for sensitive data:

1. Prefer `--password-stdin`, `--api-key-stdin`, or environment variables over inline secret flags on the command line.
2. Do not place real credentials in scripts, shared shell history, screenshots, or documentation examples.
3. When the environment supports it, set `IDMP_CLI_SESSION_STORAGE=auto` or `IDMP_CLI_SESSION_STORAGE=keyring` so session tokens can be stored in the system keychain instead of relying only on local files.
4. Enable `--debug-http` only for short-lived troubleshooting, and avoid shipping that output into shared or long-retention logs.

### 15.4.10.2 Separate Environments and Permission Boundaries

Treat environment isolation as part of the CLI setup:

1. Keep separate profiles for `default`, `staging`, `prod`, and any other operational boundary.
2. In scripts and CI, pass `--profile <name>` explicitly instead of relying on whichever profile is currently active.
3. Use least-privilege accounts or API keys in production and avoid giving broad write access to general-purpose agents.
4. In CI or multi-user systems, use `IDMP_CLI_CONFIG_DIR` to redirect config and session data into an isolated directory.

### 15.4.10.3 Preview Changes Before Execution

For any non-readonly operation, keep the following sequence:

1. Run `idmp-cli schema <service.resource.method>` first to inspect the expected parameters and request body.
2. Run the command with `--dry-run` to preview the request shape.
3. Add `--ack-risk` only after the target object, environment, and payload are confirmed.
4. Add `--request-id <id>` when the operation may need audit or backend correlation.

### 15.4.10.4 Understand Environment Variable Precedence

When both saved profiles and environment variables are present, pay attention to these overrides:

1. `IDMP_BASE_URL` overrides the server URL stored in the profile.
2. `IDMP_TOKEN` and `IDMP_API_KEY` override the saved local session.
3. If both are present, `IDMP_TOKEN` takes precedence over `IDMP_API_KEY`.

Check these values first during troubleshooting, or the CLI may talk to a different environment than the current profile suggests.

## 15.4.11 Frequently Asked Questions

### 15.4.11.1 `idmp-cli: command not found` after installation

Check these 2 points first:

1. Whether the global npm bin directory is already on `PATH`.
2. Whether the terminal session has been reopened after `npm install -g`.

### 15.4.11.2 The Web UI can log in, but the CLI cannot

Use this troubleshooting sequence:

1. Run `idmp-cli config init` again and confirm the `--server` value is correct.
2. Confirm that the current password or API key is still valid.
3. Run `idmp-cli auth check --remote` so the server verifies the current credential directly.

### 15.4.11.3 What if HTTPS uses a self-signed certificate?

`idmp-cli` follows the operating system trust store and does not automatically ignore untrusted self-signed certificates. In practice:

1. If the self-signed certificate, or its issuing CA, is already trusted by the current machine, the CLI can use HTTPS normally.
2. If the trust chain has not been imported yet, the CLI will fail during TLS verification.
3. The CLI does not currently provide a `--insecure`-style flag to skip certificate verification.
4. If you only need temporary connectivity troubleshooting, switch to `http://<IDMP_HOST>:6042` only inside a trusted, isolated network and avoid sending sensitive credentials over HTTP; then move back to HTTPS after the issue is resolved.

### 15.4.11.4 The correct command path is unknown

Use this order every time:

1. `idmp-cli schema search <keyword>`
2. `idmp-cli schema <service.resource.method>`
3. Then run the generated command or raw `api` call

This workflow is more stable than guessing the path and is also much easier to automate.

### 15.4.11.5 The agent keeps guessing the wrong command

The usual fixes are:

1. For Claude Code, install only `idmp-plugin` and do not duplicate the same skills.
2. For other agents, install `taosdata/agent-skills` first, and for offline installs pass `--target-dir` explicitly or copy `assets/skills/*` manually.
3. Instruct the agent to follow the sequence “`schema search` first, `schema` second, real command last”.
