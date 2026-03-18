---
title: "Example: Read Time-Series Data"
sidebar_label: Read Time-Series Data
---

# 15.1.6.2 Example: Read Time-Series Data


**Scenario:** Query the historical data of a specific element attribute, compute per-minute averages, and output the result as CSV. Useful for data export and report generation.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs groupId="language">
<TabItem value="python" label="Python">

```python
import os, time, csv, sys
import idmp_sdk

# ── Configuration ──────────────────────────────────────
ELEMENT_NAME = "em-11"          # replace with your target element name
ATTRIBUTE_NAME = "Current"      # replace with your target attribute name
INTERVAL = "1m"                 # aggregation window: 1m / 1h / 1d
AGGREGATE = "avg"               # aggregation function: avg / max / min / sum
HOURS_BACK = 24                 # how many hours back to query

# ── Authentication ─────────────────────────────────────
configuration = idmp_sdk.Configuration(
    host=os.environ["IDMP_HOST"],
    access_token=os.environ["BEARER_TOKEN"]
)

with idmp_sdk.ApiClient(configuration) as api_client:

    # 1. Find the target element
    element_api = idmp_sdk.ElementResourceApi(api_client)
    elements = element_api.api_v1_elements_get(name=ELEMENT_NAME)
    if not elements.data:
        print(f"Element '{ELEMENT_NAME}' not found", file=sys.stderr)
        sys.exit(1)
    element_id = elements.data[0].id

    # 2. Find the target attribute
    # See the OpenAPI spec or Swagger UI for the AttributeResourceApi method signature
    # attribute_api = idmp_sdk.AttributeResourceApi(api_client)
    # attributes = attribute_api.{METHOD_NAME}(element_id=element_id, name=ATTRIBUTE_NAME)
    # attribute_id = attributes.data[0].id

    # 3. Query historical data
    now_ms = int(time.time() * 1000)
    from_ms = now_ms - HOURS_BACK * 3600 * 1000

    # See the OpenAPI spec or Swagger UI for the MetricResourceApi method signature
    # metric_api = idmp_sdk.MetricResourceApi(api_client)
    # data = metric_api.{METHOD_NAME}(
    #     id=attribute_id,
    #     from_ts=from_ms,
    #     to_ts=now_ms,
    #     interval=INTERVAL,
    #     aggregate=AGGREGATE
    # )

    # 4. Output as CSV
    # writer = csv.writer(sys.stdout)
    # writer.writerow(["timestamp_ms", "value"])
    # for point in data.points:
    #     writer.writerow([point.timestamp, point.value])
```

</TabItem>
<TabItem value="java" label="Java">

```java
// The authentication pattern is identical to the Query Elements example.
// Business logic mirrors the Python example above.
// See the OpenAPI spec or Swagger UI for the complete MetricResourceApi method signatures.
```

</TabItem>
</Tabs>
