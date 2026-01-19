---
title: Troubleshooting
---

## Confirming Issues

If you encounter problems while using TDengine IDMP, please first try clearing your browser cache and refreshing the page. Follow these steps:

1. Open your browser’s developer tools.
1. Switch to the Network tab.
1. Check the Disable cache option.
1. Refresh the page and check whether the issue persists.

If the issue still exists, please follow the steps below to collect both frontend and backend error information to help us troubleshoot.

## Collecting Frontend Information

Please follow the steps below to gather error messages and network request details from the browser console:

### Collecting Console Error Information

1. Open your browser’s developer tools.
1. Switch to the Console tab
1. If there are any errors in the console, right-click the error and select "Save as" to save it to a file

### Collecting Network Request Information

1. Open your browser’s developer tools.
1. Switch to the Network tab.
1. If there are failed requests, right-click on a failed request and select "Copy".
1. Copy the request headers, response headers, response body, and stack trace (if available), then save them to a file

## Collecting Backend Logs

Please follow the steps below to collect logs from TDengine IDMP and TDengine TSDB-Enterprise:

## Local Installation

If you deployed TDengine IDMP via local installation, log files can be found in the following locations:

| Component      | Location                           |
|-----------|---------------------------------------|
| TDengine IDMP logs | /var/log/taos/tda.log          |
| TDengine IDMP error logs | /var/log/taos/tda-error.log |
| TDengine TSDB-Enterprise logs | /var/log/taos/taosdlog.*      |

## Containerized Deployment

If you deployed TDengine IDMP using Docker, you can copy the log files from the container to your local machine using the following commands:

```bash
docker cp tdengine-tsdb:/var/log/taos/taosdlog.*    ./
docker cp tdengine-idmp:/var/log/taos/tda.log       ./
docker cp tdengine-idmp:/var/log/taos/tda-error.log ./
```

## Submit an Issue

We use [GitHub Issues](https://github.com/taosdata/tdengine-idmp-docs/issues/new/choose) to track and manage problems. Follow the template provided on GitHub Issues and submit the information you collected above. Our support team will respond as soon as possible to help resolve your issue.
