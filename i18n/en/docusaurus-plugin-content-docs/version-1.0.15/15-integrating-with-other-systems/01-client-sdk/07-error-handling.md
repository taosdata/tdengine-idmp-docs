---
title: Error Handling
sidebar_label: Error Handling
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 15.1.7 Error Handling

## 15.1.7.1 Exception Type

The SDK wraps all API errors in a single `ApiException` class. You can retrieve the HTTP status code and the server-side error message from it.

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiException;

try {
    ElementDTO element = elementApi.apiV1ElementsIdGet("nonexistent-id");
} catch (ApiException e) {
    System.err.println("HTTP status: " + e.getCode());
    System.err.println("Error message: " + e.getMessage());
    System.err.println("Response body: " + e.getResponseBody());
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from idmp_sdk.rest import ApiException

try:
    element = element_api.api_v1_elements_id_get("nonexistent-id")
except ApiException as e:
    print(f"HTTP status: {e.status}")
    print(f"Reason: {e.reason}")
    print(f"Response body: {e.body}")
```

</TabItem>
</Tabs>

## 15.1.7.2 Common Error Codes

| HTTP Status | Meaning | Common Cause | Recommended Action |
|---|---|---|---|
| 400 | Bad request | Wrong parameter type or missing required field | Check request parameters |
| 401 | Unauthenticated | Token missing or expired | Re-authenticate and obtain a new token |
| 403 | Forbidden | Current user has no permission for this resource | Review user role and element access configuration |
| 404 | Not found | Wrong ID or resource has been deleted | Verify the resource ID |
| 429 | Too many requests | API rate limit exceeded | Reduce request frequency; add retry with backoff |
| 500 | Internal server error | Server-side exception | Retry later, or contact the administrator |

## 15.1.7.3 Recommended Retry Pattern

For `429` (rate limiting) and `5xx` (server errors), use **exponential backoff**:

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import time
from idmp_sdk.rest import ApiException

def call_with_retry(fn, max_retries=3, base_delay=1.0):
    """
    Retry wrapper with exponential backoff.
    Retries on 429 and 5xx errors only; raises immediately on 4xx client errors.
    """
    for attempt in range(max_retries):
        try:
            return fn()
        except ApiException as e:
            if e.status == 429 or e.status >= 500:
                if attempt == max_retries - 1:
                    raise
                wait = base_delay * (2 ** attempt)   # 1s, 2s, 4s...
                print(f"Request failed ({e.status}), retrying in {wait}s...")
                time.sleep(wait)
            else:
                raise  # 4xx errors are not retried

# Usage
result = call_with_retry(
    lambda: element_api.api_v1_elements_get(page_num=1, page_size=50)
)
```

</TabItem>
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiException;
import java.util.concurrent.TimeUnit;

public static <T> T callWithRetry(ApiCall<T> call, int maxRetries) throws ApiException, InterruptedException {
    for (int attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return call.execute();
        } catch (ApiException e) {
            if ((e.getCode() == 429 || e.getCode() >= 500) && attempt < maxRetries - 1) {
                long waitMs = (long) (1000 * Math.pow(2, attempt)); // 1s, 2s, 4s...
                System.err.println("Request failed (" + e.getCode() + "), retrying in " + waitMs + "ms...");
                TimeUnit.MILLISECONDS.sleep(waitMs);
            } else {
                throw e;
            }
        }
    }
    throw new RuntimeException("Should not reach here");
}

@FunctionalInterface
interface ApiCall<T> {
    T execute() throws ApiException;
}
```

</TabItem>
</Tabs>

## 15.1.7.4 Debugging Tips

- On `401`, check first whether the token has expired — do not assume a code bug.
- On `400`, print the full `responseBody`. The server typically includes a specific description of which parameter is invalid.
- During development, enable HTTP request logging in the SDK to trace the raw request and response.
