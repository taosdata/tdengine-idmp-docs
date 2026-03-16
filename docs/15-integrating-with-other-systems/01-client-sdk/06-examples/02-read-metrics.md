---
title: "示例：读取时序数据"
sidebar_label: 读取时序数据
---

**场景：** 查询指定元素某属性的历史数据，按分钟聚合计算平均值，输出为 CSV 格式。适用于数据导出、报表生成等场景。

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import os, time, csv, sys
import idmp_sdk

# ── 配置 ──────────────────────────────────────────────
ELEMENT_NAME = "em-11"          # 替换为目标元素名称
ATTRIBUTE_NAME = "Current"      # 替换为目标属性名称
INTERVAL = "1m"                 # 聚合窗口：1m / 1h / 1d
AGGREGATE = "avg"               # 聚合函数：avg / max / min / sum
HOURS_BACK = 24                 # 查询最近多少小时

# ── 认证 ──────────────────────────────────────────────
configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"],
    access_token=os.environ["BEARER_TOKEN"]
)

with idmp_sdk.ApiClient(configuration) as api_client:

    # 1. 找到目标元素
    element_api = idmp_sdk.ElementResourceApi(api_client)
    elements = element_api.api_v1_elements_get(name=ELEMENT_NAME)
    if not elements.data:
        print(f"元素 '{ELEMENT_NAME}' 未找到", file=sys.stderr)
        sys.exit(1)
    element_id = elements.data[0].id

    # 2. 找到目标属性
    # 完整方法签名请参阅 OpenAPI 规范或 Swagger UI 中的 AttributeResourceApi
    # attribute_api = idmp_sdk.AttributeResourceApi(api_client)
    # attributes = attribute_api.{METHOD_NAME}(element_id=element_id, name=ATTRIBUTE_NAME)
    # attribute_id = attributes.data[0].id

    # 3. 查询历史数据
    now_ms = int(time.time() * 1000)
    from_ms = now_ms - HOURS_BACK * 3600 * 1000

    # 完整方法签名请参阅 OpenAPI 规范或 Swagger UI 中的 MetricResourceApi
    # metric_api = idmp_sdk.MetricResourceApi(api_client)
    # data = metric_api.{METHOD_NAME}(
    #     id=attribute_id,
    #     from_ts=from_ms,
    #     to_ts=now_ms,
    #     interval=INTERVAL,
    #     aggregate=AGGREGATE
    # )

    # 4. 输出为 CSV
    # writer = csv.writer(sys.stdout)
    # writer.writerow(["timestamp_ms", "value"])
    # for point in data.points:
    #     writer.writerow([point.timestamp, point.value])
```

</TabItem>
<TabItem value="java" label="Java">

```java
// 认证方式与查询元素示例相同。
// 业务逻辑与上方 Python 示例一致。
// 完整的 MetricResourceApi 方法签名请参阅 OpenAPI 规范或 Swagger UI。
```

</TabItem>
</Tabs>
