# Dashboard and Panel Notifications

Dashboards and panels can periodically send snapshot notifications to specified users.

## Configuring Notification Rules

When editing a panel or dashboard, you can configure notification rules.

In the "Notification Rules" area on the right side of the editing page, click the "Add Notification Rule" button and configure the following:

- **Notification Frequency**: How often the notification should be sent.
- **Start Time**: When the first notification should be sent.
- **End Time**: When the notification rule should end (optional).
- **Notification Method**: How the notification should be delivered.

If you select a periodic frequency, subsequent notifications are scheduled based on the start time. For example, if the frequency is weekly and the start time is Monday at 9 AM, a notification will be sent every Monday at 9 AM. The end time is optional; if it's not set, notifications will continue indefinitely.

After configuring the notification rules, click the save button to save the panel or dashboard.

## Sending Notifications

If a notification is configured for a panel template, a snapshot of the panel or dashboard will be generated and sent for each element that uses the template.
