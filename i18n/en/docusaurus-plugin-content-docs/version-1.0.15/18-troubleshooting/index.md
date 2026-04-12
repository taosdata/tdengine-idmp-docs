---
title: Troubleshooting
sidebar_label: Troubleshooting
---

# 18 Troubleshooting

## Confirming the Problem

If you encounter an issue while using TDengine IDMP, start by disabling the browser cache and reloading the page:

1. Open your browser's developer tools.
2. Switch to the **Network** tab.
3. Check **Disable cache**.
4. Reload the page and check whether the problem persists.

If the problem persists, follow the steps below to collect frontend and backend diagnostic information before submitting a report.

## Collecting Frontend Information

### Console Errors

1. Open your browser's developer tools.
2. Switch to the **Console** tab.
3. If errors are present, right-click any error entry and choose **Save as** to save the console output to a file.

### Network Request Failures

1. Open your browser's developer tools.
2. Switch to the **Network** tab.
3. Identify any failed requests (shown in red).
4. Right-click a failed request and choose **Copy**. Save the following to a file:
   - Request headers
   - Response headers
   - Response body
   - Stack trace (if available)

## Collecting Backend Logs

### Local Installation

For a locally installed deployment, log files are located at the following paths:

| Component | Log File Path |
| --- | --- |
| TDengine IDMP | `/var/log/taos/tda.log` |
| TDengine IDMP error log | `/var/log/taos/tda-error.log` |
| TDengine IDMP AI | `/var/log/taos/idmp-ai.log` |
| TDengine IDMP AI error log | `/var/log/taos/idmp-ai-error.log` |
| TDengine TSDB-Enterprise | `/var/log/taos/taosdlog.*` |

### Docker Deployment

For a Docker-based deployment, copy the log files out of the containers using the following commands:

```bash
docker cp tdengine-tsdb:/var/log/taos/taosdlog.* ./
docker cp tdengine-idmp:/var/log/taos/tda.log ./
docker cp tdengine-idmp:/var/log/taos/tda-error.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai.log ./
docker cp tdengine-idmp:/var/log/taos/idmp-ai-error.log ./
```

## Submitting an Issue

TDengine uses [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) to track and manage bug reports and support requests. Follow the issue template and attach the information collected above. The support team will respond as soon as possible.
