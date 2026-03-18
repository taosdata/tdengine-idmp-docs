---
title: 错误处理
sidebar_label: 错误处理
---

# 15.1.7 错误处理

## 异常类型

SDK 将所有 API 错误统一封装为 `ApiException`，您可以从中获取 HTTP 状态码和服务端返回的错误消息。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="java" label="Java">

```java
import org.openapitools.client.ApiException;

try {
    ElementDTO element = elementApi.apiV1ElementsIdGet("nonexistent-id");
} catch (ApiException e) {
    System.err.println("HTTP 状态码：" + e.getCode());
    System.err.println("错误消息：" + e.getMessage());
    System.err.println("响应体：" + e.getResponseBody());
}
```

</TabItem>
<TabItem value="python" label="Python">

```python
from idmp_sdk.rest import ApiException

try:
    element = element_api.api_v1_elements_id_get("nonexistent-id")
except ApiException as e:
    print(f"HTTP 状态码：{e.status}")
    print(f"错误原因：{e.reason}")
    print(f"响应体：{e.body}")
```

</TabItem>
</Tabs>

## 常见错误码

| HTTP 状态码 | 含义 | 常见原因 | 建议处理方式 |
|---|---|---|---|
| 400 | 请求参数错误 | 参数类型不对、必填项缺失 | 检查请求参数 |
| 401 | 未认证 | Token 缺失或已过期 | 重新登录获取 Token |
| 403 | 无权限 | 当前用户无权访问该资源 | 检查用户角色与元素访问权限配置 |
| 404 | 资源不存在 | ID 错误或资源已被删除 | 确认资源 ID 是否正确 |
| 429 | 请求过于频繁 | 超出 API 限流阈值 | 降低请求频率，加入重试等待 |
| 500 | 服务器内部错误 | 服务端异常 | 稍后重试，或联系管理员 |

## 推荐的重试模式

对于 `429`（限流）和 `5xx`（服务端错误），建议使用**指数退避**重试：

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import time
from idmp_sdk.rest import ApiException

def call_with_retry(fn, max_retries=3, base_delay=1.0):
    """
    带指数退避的重试包装器。
    仅对 429 和 5xx 错误重试，4xx（客户端错误）直接抛出。
    """
    for attempt in range(max_retries):
        try:
            return fn()
        except ApiException as e:
            if e.status == 429 or e.status >= 500:
                if attempt == max_retries - 1:
                    raise
                wait = base_delay * (2 ** attempt)   # 1s, 2s, 4s...
                print(f"请求失败（{e.status}），{wait}s 后重试...")
                time.sleep(wait)
            else:
                raise  # 4xx 错误直接抛出，不重试

# 使用示例
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
                System.err.println("请求失败（" + e.getCode() + "），" + waitMs + "ms 后重试...");
                TimeUnit.MILLISECONDS.sleep(waitMs);
            } else {
                throw e;
            }
        }
    }
    throw new RuntimeException("不应到达此处");
}

@FunctionalInterface
interface ApiCall<T> {
    T execute() throws ApiException;
}
```

</TabItem>
</Tabs>

## 调试建议

- 收到 `401` 时，优先检查 Token 是否已过期，而不是检查代码逻辑。
- 收到 `400` 时，打印完整的 `responseBody`，服务端通常会在其中说明具体哪个参数有问题。
- 开发阶段建议开启 SDK 的 HTTP 请求日志，方便追踪原始请求和响应。
