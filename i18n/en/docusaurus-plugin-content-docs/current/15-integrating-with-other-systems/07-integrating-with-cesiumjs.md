---
title: Integrating with CesiumJS
sidebar_label: Integrating with CesiumJS
---

# 15.7 Integrating with CesiumJS

CesiumJS renders a globe, while TDengine stores time-series data for the assets on it. This integration service queries taosAdapter and returns JSON. The page creates one Cesium entity per asset and updates it in place when the data refreshes.

The example package is published as [cesium-tdengine](https://github.com/arunTDengine/cesium-tdengine). The same service can support a wind farm, fleet, pipeline, or fixed instruments. Adjust the query to match the schema already in use.

:::note
Credentials stay on the service. The browser receives coordinates and measurements only.
:::

## 15.7.1 Requirements

Prepare the following:

1. TDengine 3.x is installed and running. See [Get Started](https://docs.tdengine.com/get-started/).
2. taosAdapter is running, and the service host can reach it. The REST endpoint for a standard installation is `http://<host>:6041/rest/sql`; use the address where taosAdapter listens in your environment.
3. A TDengine user and password. The defaults are `root` and `taosdata`.
4. Python 3.9 or later. The service uses the standard library only.
5. A browser that can load CesiumJS 1.114 from the Cesium CDN. The example page supplies its own imagery, so a Cesium ion token is optional.

## 15.7.2 Configure the Service

The service reads its connection settings from the process environment.

| Variable | Default | Purpose |
| --- | --- | --- |
| `TAOS_URL` | `http://localhost:6041/rest/sql` | taosAdapter REST address. |
| `TAOS_USER` | `root` | TDengine user. |
| `TAOS_PASSWORD` | `taosdata` | TDengine password. |
| `HOST` | `127.0.0.1` | Bind address for the page. |
| `PORT` | `8095` | Port for the page. |

`.env.example` records the same variable names. Export them before starting the process. The service sends SQL as the raw request body with HTTP Basic authentication, and taosAdapter returns column names in `column_meta`. Alias expressions in the query so their names match the fields below.

## 15.7.3 Start a Scenario

From the example package directory, run `run.py` with Python. The command loads a scenario, starts the service, and opens the page. With no argument it uses `scenarios/sample`, which creates the `cesium_sample` database and 3 fixed assets. Pass another directory under `scenarios/` to switch scenarios; `scenarios/fleet` is a moving-asset example.

```bash
git clone https://github.com/arunTDengine/cesium-tdengine.git
cd cesium-tdengine
python3 run.py
```

Run `python3 run.py fleet` to select the fleet scenario. To build a custom scene, copy `scenarios/sample` or `scenarios/fleet`, adjust `seed.sql` and `query.sql`, and run `python3 run.py <scenario-directory-name>`. The page, service, and JSON fields stay the same.

A scenario directory contains `seed.sql`, which creates tables and writes current values, and `query.sql`, which the page reads. Set `TAOS_URL` to the taosAdapter address before running the command. The service reads `.env` from the package directory to fill in variables not already set in the process environment; defaults apply when neither source provides a value. The standard address is `http://localhost:6041/rest/sql`. If the bind port is already in use, the service selects the next free port and prints the address it opened.

`server.py` serves only the `query.sql` in the package root and does not load a scenario. Opening the HTML file directly leaves the globe without data because the page requests `/api/assets` from the service.

## 15.7.4 Page Data API

`GET /api/assets` returns an object containing `source` and `assets`. Each asset uses the following fields:

| Field | Required | Meaning |
| --- | --- | --- |
| `id` | Yes | Stable asset identifier. The page uses it as the Cesium entity ID, so later refreshes update the same object. |
| `lon` | Yes | Longitude in decimal degrees. Cesium takes longitude first. |
| `lat` | Yes | Latitude in decimal degrees. |
| `height` | No | Meters above the ellipsoid. A missing value is drawn at 0. |
| Any other column | No | Shown when the asset is selected. `status` colors the point for `OK`, `WARN`, and `ALARM`. |

Rows with a null longitude or latitude are omitted. The service caches the JSON response for a few seconds so each browser does not query TDengine on its own timer. The page refreshes about every 5 seconds.

## 15.7.5 Map Your Tables

Edit `query.sql` and keep the aliases `id`, `lon`, `lat`, and `height`.

| Scene | Store longitude and latitude | Query |
| --- | --- | --- |
| Site, turbine, building, well, or meter | Store them in supertable tags. Coordinates are not new samples on every insert. | Use `LAST` for the latest measurements and group by child table. Each child table is one entity. |
| Vehicle, aircraft, vessel, or person | Store them in columns beside the timestamp. Coordinates are the time series. | Read the latest longitude and latitude for the current position. |

`examples/fixed-assets.sql` and `examples/moving-fleet.sql` implement these two models. Copy the relevant file to `query.sql` and rename the database, table, and columns.

Group by `tbname` when each child table is one asset, and alias every `LAST` expression. Without an alias, `LAST(longitude)` is returned as `last(longitude)`, and the page does not recognize it as a coordinate.

## 15.7.6 Tracks

The asset feed provides the current position. A track requires a second query, downsampled to keep long histories small.

Copy `examples/track.sql` to `track.sql` in the package directory, then set the table, time window, and interval for your data. `{id}` is replaced with the asset ID from `/api/track`. The example page draws the current position. A page that draws the path can read the second feed and build sampled positions from `ts`, `lon`, `lat`, and `height`.

## 15.7.7 Integrate with TDengine IDMP

When assets are already modeled as TDengine IDMP elements, keep the page unchanged and read attribute values in the service. IDMP attributes are bound to TDengine columns, so measurements still come from TDengine; the service uses an IDMP token instead of a SQL statement.

The example package currently implements taosAdapter SQL access. The following steps describe an IDMP adaptation that requires changes to the service to call IDMP APIs.

1. Authenticate with `POST /api/v1/users/login` and send the token on later requests.
2. List the child elements that should appear on the globe.
3. Cache the attribute identifiers for each element. They change rarely.
4. Read current values and return the same asset fields: `id`, `lon`, `lat`, `height`, and the measurements to display.

Take coordinates from the element location or from a lookup maintained by the service. As with the SQL path, cache the assembled JSON for a few seconds.

The page can be embedded in an IDMP dashboard as an iframe. The iframe address is the service address. See [Embedding Panels and Dashboards](./03-embedding-panels.md) for details.
