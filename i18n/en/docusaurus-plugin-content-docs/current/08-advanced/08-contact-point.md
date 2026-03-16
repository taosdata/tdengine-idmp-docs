# Contact Point

The [Event Management](../05-basic/07-event-management.md) documentation details how the system triggers notifications when events meet specific conditions, sending alerts to predefined users or channels. Currently, the system supports two notification methods: email and Feishu.

## Configuring Contact Points

Click the avatar icon in the top-right corner, select "Admin Console" to access settings, then navigate to "System Configuration" → "Notification Contact Point" to view the current list of contact points. The system creates a default contact point with the administrator's email. Click the "+" button to add more contact points.

### Email Notifications

Email notifications send alerts to specified email addresses when events are triggered.
Configuration steps:

1. Click the "+" button
2. Enter a contact point name
3. Select "Email" from the notification type dropdown
4. Choose recipients from the address list (invite users first if needed)
5. Optionally add a description
6. Click "Save" to complete setup

Once configured, the contact point will appear in the notification rule contact point selection list.

### Feishu and Webhook Notifications

Feishu notifications send alerts to specified Feishu groups when events are triggered.

:::warning Tip
Before adding a Feishu contact point, you need to first create a custom bot in Feishu, add the bot to your group chat, and obtain the bot's Webhook address.

Please refer to [Feishu Documentation - Custom bot usage guide](https://open.feishu.cn/document/client-docs/bot-v3/add-custom-bot?lang=en-US).
:::

Configuration steps for Feishu notifications:

1. Click the "+" button
2. Enter a contact point name
3. Select "Feishu" or "Webhook" from the notify type dropdown
4. Enter the Feishu bot's Webhook URL in the address field
5. Optionally add a description
6. Click "Save" to complete setup

Once configured, the contact point will appear in the notification rule contact point selection list.
