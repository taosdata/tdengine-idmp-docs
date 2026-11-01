---
title: 集成 CesiumJS
sidebar_label: 集成 CesiumJS
---

# 15.7 集成 CesiumJS

CesiumJS 用于绘制三维地球，TDengine 用于存储地球上资产的时序数据。本集成服务查询 taosAdapter 并返回 JSON，页面为每个资产创建一个 Cesium 实体，并在刷新时更新实体数据。

集成示例发布在 [cesium-tdengine](https://github.com/arunTDengine/cesium-tdengine)。风电场、车队、管线和固定仪器等场景均可使用同一服务，只需根据已有的数据模型调整查询语句。

:::note
凭据仅保留在服务端，浏览器只接收坐标和测量值。
:::

## 15.7.1 前置条件

开始前准备以下环境：

1. 已安装并运行 TDengine 3.x，参见[快速入门](https://docs.taosdata.com/get-started/)。
2. 已运行 taosAdapter，且运行本服务的主机可以访问 taosAdapter。标准安装的 REST 接口为 `http://<host>:6041/rest/sql`，请根据实际监听地址配置。
3. TDengine 用户名和密码。默认值为 `root` 和 `taosdata`。
4. Python 3.9 或更高版本。本服务仅使用 Python 标准库。
5. 支持从 Cesium CDN 加载 CesiumJS 1.114 的浏览器。示例页面自带影像图层，因此 Cesium ion token 为可选配置。

## 15.7.2 配置服务

服务通过进程环境变量读取连接配置。

| 变量 | 默认值 | 说明 |
| --- | --- | --- |
| `TAOS_URL` | `http://localhost:6041/rest/sql` | taosAdapter REST 地址。 |
| `TAOS_USER` | `root` | TDengine 用户名。 |
| `TAOS_PASSWORD` | `taosdata` | TDengine 密码。 |
| `HOST` | `127.0.0.1` | 页面服务绑定地址。 |
| `PORT` | `8095` | 页面服务端口。 |

`.env.example` 中记录了相同的变量名。启动进程前导出这些变量。服务以 HTTP Basic 认证发送原始 SQL 请求，taosAdapter 通过 `column_meta` 返回列名。请为查询中的别名表达式指定与下文字段一致的名称。

## 15.7.3 启动场景

在示例包目录中使用 Python 运行 `run.py`。该命令加载场景、启动服务并打开页面。不带参数时使用 `scenarios/sample`，创建 `cesium_sample` 数据库和 3 个固定资产；传入 `scenarios/` 下的其他目录名即可切换场景。`scenarios/fleet` 是移动资产场景。

```bash
git clone https://github.com/arunTDengine/cesium-tdengine.git
cd cesium-tdengine
python3 run.py
```

运行 `python3 run.py fleet` 可切换到车队场景。构建自定义场景时，复制 `scenarios/sample` 或 `scenarios/fleet` 目录，调整 `seed.sql` 和 `query.sql`，然后运行 `python3 run.py <场景目录名>`。页面、服务及 JSON 字段结构保持一致。

场景目录包含 `seed.sql` 和 `query.sql`：前者创建表并写入当前值，后者提供页面读取的查询。启动前请将 `TAOS_URL` 设置为实际的 taosAdapter 地址。服务读取包目录中的 `.env` 文件，仅补充进程环境中尚未设置的变量；两处均未配置时使用默认值。默认地址为 `http://localhost:6041/rest/sql`。如果绑定端口已被占用，服务会自动使用下一个空闲端口并打印访问地址。

`server.py` 只服务包根目录中的 `query.sql`，不会加载场景。直接打开 HTML 文件时，页面不会显示数据，因为页面需要从服务请求 `/api/assets`。

## 15.7.4 页面数据接口

`GET /api/assets` 返回包含 `source` 和 `assets` 的对象。每个资产使用以下字段：

| 字段 | 必填 | 说明 |
| --- | --- | --- |
| `id` | 是 | 稳定的资产标识符。页面将其作为 Cesium 实体 ID，后续刷新会更新同一实体。 |
| `lon` | 是 | 经度，单位为十进制度。Cesium 使用经度在前的顺序。 |
| `lat` | 是 | 纬度，单位为十进制度。 |
| `height` | 否 | 椭球面以上高度，单位为米。缺失时按 0 绘制。 |
| 其他列 | 否 | 资产选中后显示。`status` 为 `OK`、`WARN` 或 `ALARM` 时，页面会使用对应颜色显示点位。 |

经度或纬度为空的行会被忽略。服务会将 JSON 响应缓存数秒，避免每个浏览器分别按计时器查询 TDengine。页面大约每 5 秒刷新一次。

## 15.7.5 映射数据表

编辑 `query.sql`，并保留 `id`、`lon`、`lat` 和 `height` 别名。

| 场景 | 经度和纬度的存储方式 | 查询方式 |
| --- | --- | --- |
| 站点、风机、建筑、油井或仪表 | 存储在超级表标签中。坐标不是每次写入时新增的采样值。 | 使用 `LAST` 获取最新测量值，并按子表分组。每个子表对应一个实体。 |
| 车辆、飞机、船舶或人员 | 与时间戳并列存储在列中。坐标本身是时序数据。 | 获取当前位置信息中的最新经度和纬度。 |

`examples/fixed-assets.sql` 和 `examples/moving-fleet.sql` 分别对应上述两种模型。复制相应文件为 `query.sql`，并替换数据库、表和列名。

当每个子表对应一个资产时，使用 `tbname` 分组，并为每个 `LAST` 表达式设置别名。未设置别名时，`LAST(longitude)` 会返回为 `last(longitude)`，页面无法将其识别为坐标。

## 15.7.6 轨迹

资产数据接口提供当前位置，轨迹需要使用第二个查询，并进行降采样，以控制长时间历史数据的大小。

将 `examples/track.sql` 复制为包目录中的 `track.sql`，并根据数据设置表、时间窗口和采样间隔。`{id}` 会被 `/api/track` 的资产 ID 替换。示例页面绘制当前位置；需要绘制轨迹的页面可以读取第二个数据接口，并根据 `ts`、`lon`、`lat` 和 `height` 构建采样位置。

## 15.7.7 与 TDengine IDMP 集成

当资产已经建模为 TDengine IDMP 元素时，页面可以保持不变，由服务读取属性值。IDMP 属性绑定到 TDengine 列，因此测量值仍然来自 TDengine；服务端使用 IDMP token 代替 SQL 语句。

示例包当前实现的是 taosAdapter SQL 访问。以下步骤描述 IDMP 适配方案，需要修改服务端以调用 IDMP API。

1. 调用 `POST /api/v1/users/login` 完成认证，并在后续请求中携带 token。
2. 列出需要显示在地球上的子元素。
3. 缓存每个元素的属性标识符。属性标识符通常很少变化。
4. 读取当前值并返回相同的资产字段：`id`、`lon`、`lat`、`height` 以及需要显示的测量值。

坐标可以取自元素位置或服务维护的查找表。与 SQL 路径一样，对组装后的 JSON 缓存数秒。

页面可以作为 iframe 嵌入 IDMP 仪表盘，iframe 地址为本服务地址。更多信息请参见[嵌入面板与仪表盘](./03-embedding-panels.md)。
