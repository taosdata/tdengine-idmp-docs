---
title: Scheduled Reports
sidebar_label: Scheduled Reports
---

# 4.6 Scheduled Reports


Scheduled Reports let you deliver a rendered image of a panel or dashboard to one or more recipients on a recurring schedule. At the configured time, IDMP captures the panel or dashboard at its current state, generates a PNG image, and sends it through the configured notification contact point — no login or manual export required.

Typical uses include weekly energy summary dashboards sent to management, daily production-line trend charts delivered to shift engineers, and one-time panel exports triggered on demand.

## 4.6.1 Configuring Reports for a Panel

Scheduled report delivery is configured in the **Notification Rule** section of the panel editor.

1. Open the panel editor (**Edit** on any panel card or in view mode).
2. In the right settings panel, scroll to **Notification Rule** and click **+** to add a new rule.
3. Configure the rule fields:

| Field | Description |
|---|---|
| **Frequency** | How often to send the report: **Single** (once only), **Daily**, **Weekly**, or **Monthly** |
| **Job Start Time** | The date and time of the first (or only) delivery. Required. |
| **End Date** | The date on which the recurring schedule stops. Optional — if left blank, the schedule runs indefinitely. |
| **Notification Contact Point** | The notification channel(s) that will receive the report. Select one or more pre-configured contact points from the dropdown. Required. |

4. Click **+** again to add additional rules with different frequencies or recipients.
5. Click **Save** to save the panel and activate the schedule.

Each saved rule appears as a row in the Notification Rule section. Use the delete icon on the row to remove a rule. Expand a collapsed rule row to edit its settings.

## 4.6.2 Configuring Reports for a Dashboard

Dashboard-level reports send a full-dashboard image instead of a single panel. The configuration is identical to panel-level rules.

1. Open the dashboard editor.
2. In the right settings panel, find the **Notification Rule** field.
3. Click **+** to add a rule and fill in the same fields: Frequency, Job Start Time, End Date, and Notification Contact Point.
4. Click **Save** to activate the schedule.

When triggered, IDMP renders the full dashboard canvas — all panels at the dashboard's default time range — and sends it as an image.

## 4.6.3 How Delivery Works

When a scheduled report fires:

- IDMP renders the panel or dashboard as it would appear at that moment, using the panel or dashboard's saved time range configuration.
- The report is generated as a PNG image.
- The image is delivered to all configured contact points for that rule.
- If the panel belongs to a template, the report is generated and sent for each element that uses that template.

Single-frequency rules fire once at the Job Start Time and are then inactive. Recurring rules (Daily, Weekly, Monthly) fire on the same schedule relative to the Job Start Time — for example, a Weekly rule with a Monday 09:00 start time fires every Monday at 09:00.

## 4.6.4 Notification Contact Points

A **Notification Contact Point** is a delivery channel — an email address list, a webhook, a messaging platform integration, or another supported channel — configured in the system's notification settings.

Contact points are selected by name from the dropdown when configuring a rule. If no contact points appear in the dropdown, they must be created in the notification configuration section before scheduled report rules can be activated.

See [System Configuration](../14-administration/04-system-configuration.md) for instructions on creating and managing notification contact points.
