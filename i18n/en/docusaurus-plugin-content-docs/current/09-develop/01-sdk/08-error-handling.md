# Error Handling

## Exception Type

All API errors are wrapped in `ApiException`. You can extract the HTTP status code and server error message from it.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiException;

try {
    ElementDTO element = elementApi.apiV1ElementsIdGet("nonexistent-id");
} catch (ApiException e) {
    System.err.println("HTTP status: " + e.getCode());
    System.err.println("Message: "     + e.getMessage());
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
    print(f"Reason:      {e.reason}")
    print(f"Body:        {e.body}")
```

</TabItem>
</Tabs>

## Common Error Codes

| HTTP Status | Meaning | Common Cause | Recommended Action |
|---|---|---|---|
| 400 | Bad Request | Invalid parameter type, missing required field | Check request parameters |
| 401 | Unauthorized | Token missing or expired | Re-authenticate and get a new token |
| 403 | Forbidden | Current user lacks permission | Check user permissions in IDMP |
| 404 | Not Found | Wrong ID, or resource was deleted | Verify the resource ID |
| 429 | Too Many Requests | Rate limit exceeded | Back off and retry with exponential delay |
| 500 | Internal Server Error | Server-side exception | Retry later or contact the administrator |

## Retry Pattern (Exponential Backoff)

Use exponential backoff for `429` and `5xx` errors. Do **not** retry `4xx` (client errors).

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import time
from idmp_sdk.rest import ApiException

def call_with_retry(fn, max_retries=3, base_delay=1.0):
    """
    Retry wrapper with exponential backoff.
    Retries on 429 and 5xx only; raises immediately on 4xx.
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
                raise  # 4xx: don't retry

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

public static <T> T callWithRetry(ApiCall<T> call, int maxRetries)
        throws ApiException, InterruptedException {
    for (int attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return call.execute();
        } catch (ApiException e) {
            if ((e.getCode() == 429 || e.getCode() >= 500) && attempt < maxRetries - 1) {
                long waitMs = (long) (1000 * Math.pow(2, attempt));
                TimeUnit.MILLISECONDS.sleep(waitMs);
            } else {
                throw e;
            }
        }
    }
    throw new IllegalStateException("Should not reach here");
}

@FunctionalInterface
interface ApiCall<T> { T execute() throws ApiException; }
```

</TabItem>
</Tabs>

## Debugging Tips

- On `401`: check whether the token has expired before looking at your code logic
- On `400`: print the full `responseBody` — the server usually specifies exactly which parameter is invalid
- During development, enable HTTP request logging in the SDK to inspect raw requests and responses
