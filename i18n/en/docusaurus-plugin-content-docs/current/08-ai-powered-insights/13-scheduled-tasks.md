---
title: AI Scheduled Tasks
sidebar_label: AI Scheduled Tasks
---

# 8.13 AI Scheduled Tasks

AI scheduled tasks run read-only AI queries and analysis in the background at an agreed time. Each execution is saved in AI Chat history. Typical uses include daily equipment summaries, weekly energy analysis, and a check after a delay. The browser does not need to stay open.

This differs from [Scheduled Reports](../04-visualization/06-scheduled-reports.md): scheduled reports export visualization content, while AI scheduled tasks perform queries and analysis described in natural language.

## 8.13.1 Prerequisites and Authorization

Scheduled tasks are available by default in the AI service without a feature switch. An administrator must configure an available [LLM connection](./01-connecting-to-llm.md) and grant the current user access to AI Chat. Users can manage only their own tasks; no additional scheduled-task management permission is required. If the entry is missing or tasks cannot be loaded, check AI Chat permissions and service status with an administrator.

:::info Persistent storage

Set `IDMP_DATA_PATH` to a persistent data directory. The first startup generates a master encryption key in `ai_scheduled_tasks/.credential-key`, and subsequent startups reuse it. Tasks and encrypted credentials are also stored under `ai_scheduled_tasks/`; back up and restore the entire directory. Existing deployments that explicitly configure a Base64-encoded 32-byte key through `IDMP_SCHEDULED_TASKS_KEY` must retain that original value. Only a single scheduler instance is supported. Route task management and chat confirmation requests to the same instance. Web links in notifications use `IDMP_FRONTEND_URL`.

The generated master key is stored as raw bytes in a file created with mode `0600`. Restrict access to the entire data directory and its backups: access to both the master key and credential files permits decryption.

Administrators should stop the AI scheduled task service before backing up the AI service's persistent data, the system metadata database, and the original master key from the same point in time. The system retains small task, execution, and session identifiers, along with the deletion status of results, to prevent duplicate execution, keep results read-only, and prevent deleted results from reappearing. This information contains no report content or credentials. Full execution records have capacity limits, but the space used by these identifiers and statuses grows as historical sessions accumulate; total storage is not a fixed size. Do not manually delete files to free space.

:::

Background execution uses your own IDMP API key with your current permissions and data access. It does not use the browser login token.

1. Open **AI Chat** from the navigation bar and click the small alarm clock in the history toolbar on the left. The dialog has **Scheduled tasks**, **All execution records**, and **Background authorization** tabs. Select **Background authorization**.
2. Select an existing key from **Your IDMP API key**. The list shows its title, masked value, and expiration; expired keys cannot be selected.
3. If needed, click **Add API Key** to create one in the existing [Profile Settings](../14-administration/08-profile-settings.md), then close Profile Settings and select the new key. No copying or pasting is required.
4. Click **Save authorization**. Creating a key does not automatically authorize background execution.
5. Verify the key name, expiration time, and valid authorization status in the persistent notice, then close the dialog.

The browser submits only the selected key ID. The server verifies ownership and validity before encrypting the stored credential; another user's key cannot be selected. All scheduled tasks owned by the account share this authorization. The shared-task count includes only enabled tasks and tasks awaiting authorization, excluding paused or completed tasks. It does not indicate how many tasks are executing at that moment. Updating authorization does not resume tasks or replay previous runs, and a failed save preserves the previous authorization.

When auditing is enabled and the resource requires a reason, saving authorization, pausing, resuming, stopping a task, and deleting an execution record use the standard reason dialog. Confirm a reason to send the request; canceling leaves the operation unapplied. Administrators can filter **System Log** by the **AI Scheduled Task** resource type to find these operations. Authorization keys and generated reports are excluded from operation snapshots.

## 8.13.2 Create and Confirm in Natural Language

In an ordinary AI Chat conversation, describe what to execute, when to execute it, the time zone, and the delivery channel. Include specific equipment, attributes, query periods, and output requirements. Put essential context in the task instruction; do not rely on the complete source conversation being loaded at execution time.

For example, after saving background authorization, send:

```text
Create a read-only scheduled task titled “Equipment inspection summary”.
Run Monday through Friday at 09:15 in the Asia/Shanghai time zone.
Query the system overview and summarize the available information.
Clearly state when data is unavailable; do not infer missing values.
Save results to Web history only, with no IM notification.
Show the configuration for my confirmation; do not execute the analysis now.
```

1. Wait for the `create_scheduled_task` confirmation card.
2. Expand **Details** and review the title, full instruction, schedule, time, time zone, and channel.
3. Select **I confirm the time zone: Asia/Shanghai**. Use the intended IANA time zone, such as `Asia/Shanghai` or `Europe/Berlin`, rather than an ambiguous abbreviation or `UTC+8`.
4. Click **Execute**. The task is created only after successful confirmation. Receiving a confirmation card does not activate the schedule.
5. Open **Scheduled tasks**, click the task title, and verify the schedule and **Next execution** on the **General** tab.

If the configuration is incorrect, cancel the operation, describe the changes in chat, and review a new confirmation. When no time zone is specified, Web requests use the browser-provided IANA time zone, which still requires confirmation on the card. If the browser time zone is unavailable, provide one first. Creating or editing a scheduled task always requires confirmation, even when the personal confirmation preference is off. Use Web chat for creation in this version; this confirmation flow cannot be completed in IM.

### 8.13.2.1 Supported Schedules

The following schedules are available for creation and editing. Verify the final configuration on the confirmation card and task detail page.

| Schedule | Example | Behavior |
|---|---|---|
| Once at a specified time | Check equipment tomorrow at 15:00, Asia/Shanghai | The time must be in the future |
| Once after a delay | Check the system overview 2 minutes after confirmation, Asia/Shanghai | The delay starts when confirmation is accepted and is then stored as a fixed time |
| Daily | Produce an operating summary every day at 08:30, Asia/Shanghai | Uses the task time zone |
| Weekly on selected days | Produce an inspection summary Monday through Friday at 09:15, Asia/Shanghai | “Workdays” means Monday through Friday; public holidays and substitute working days are not considered |

Recurring intervals of a few minutes, monthly schedules, and holiday calendars are not supported. Background tasks support read-only queries and analysis, not scheduled writes such as creating panels or changing configuration.

### 8.13.2.2 Result Delivery

Every execution uses Web history as its result entry. A request can also name an enabled IM channel bound to the current account, for example, “also notify me through Feishu”. See [IM Channels](./12-im-channels.md) for binding instructions. Review the channel before confirming.

When creating or editing a task, the system checks that the selected channel is running and bound to your account. A failed check leaves the proposed configuration unsaved. The recipient comes from your account's channel binding and cannot be specified in the task instruction. The channel and binding are checked again before sending. If the channel is later stopped or unbound, the execution record shows the notification failure reason, while the generated Web result remains available.

When an administrator switches a channel to another organization or bot, or deletes its configuration, existing user bindings and unused binding codes for that channel become invalid. Pending action confirmations cannot continue with the old binding. Bind your account to the new bot to restore that channel's scheduled notifications. Bindings for other channels are unaffected. Updating only the credentials of the same bot preserves bindings. A Slack bot token change requires rebinding because the token alone cannot reliably prove that it belongs to the same bot; changing only the Slack app token preserves bindings. Restart the channel after changing its configuration. The system does not send recipient identifiers from the old bot through the new bot.

Scheduled task notifications support Feishu, Telegram, DingTalk, Slack, and WeCom. **Personal WeChat does not support proactive scheduled notifications.** Personal WeChat can only reply within a conversation that the user starts, so it cannot push a message after a task runs. You cannot select personal WeChat when you create or edit a scheduled task: the confirmation card shows that the channel is unavailable and blocks execution. Even if you make the request from personal WeChat, choose another bound channel or Web history only. Ordinary personal WeChat chat is not affected.

Tasks that selected personal WeChat before the upgrade still run and save results to Web history, but their notifications are recorded as failed without a send attempt. Edit such a task in chat to use another channel or Web history only.

This version sends only to the task owner. Other users, groups, and arbitrary recipients are not supported. Telegram requires a private chat binding; Slack uses your direct messages. If a channel has multiple distinct bound recipients, sending is rejected. Remove the extra bindings in personal settings and bind your own account again. If notification delivery fails or cannot be confirmed, view the result on the Web. Notifications that might already have arrived are not automatically resent. The execution list shows notification failures and their reasons directly; expand a record to view the full result:

| Message | Cause and action |
|---|---|
| Personal WeChat does not support proactive scheduled notifications | The task uses personal WeChat. Edit the task to use another channel or Web history only. |
| Channel is not configured or enabled | An administrator has not configured or has disabled this IM channel. Ask the administrator to check the IM integration. |
| You have not bound this channel | Your account is not bound to this channel. Bind it, or edit the task to use another channel. |
| Notification failed or its delivery could not be confirmed | The platform call failed or timed out, or the service restarted while sending, so delivery is unknown. View Web history. Administrators can search service logs by execution ID. |

While signed in and connected, the Web displays a summary notification for successful, failed, or interrupted executions in the lower-right corner, using the same card style as system alerts. Only one card is visible there at a time. The latest ordinary event or scheduled task notification replaces the previous card; closing it does not reveal older cards.

The scheduled task card shows the latest task, execution status, time, and the current batch's new-result and failure counts. Timeout notifications identify the timeout reason. Click **View result** or **View failure details** to open the result conversation, or **View execution history** when no history result is available. **View all execution records** is always available to inspect recent results across your tasks. The new-result count includes failed results; the failure count covers failed or interrupted executions within that batch. These temporary counts reset when you close the card or use it to open a result, execution records, or authorization. They are not persistent unread counts.

The history list and any open task or execution record list refresh automatically. Receiving a notification does not switch conversations or clear draft input. User cancellations only refresh the status without displaying a result notification.

Web notifications require an active browser connection and are not operating-system notifications. Delivery while the page is closed, offline, or disconnected is not guaranteed. Signing in, reconnecting, or opening Background authorization checks authorization and summaries of executions awaiting history synchronization. You can also view history or execution records after returning. Authorization is not polled periodically. Web and IM notifications are independent; Web notifications also work when no IM channel is selected.

Administrators can set `SCHEDULED_TASK_TIMEOUT_SECONDS` on the Agent configuration page (seconds, default 180, range 1–86400). Changes apply to the next execution. An execution that times out is recorded as failed, saved to Web history, and sent through the selected IM channel. User cancellations do not send a result notification.

## 8.13.3 View Executions and Results

The task list shows the title, status, next execution, time zone, and delivery channel, with 10 tasks per page by default. Use the footer controls to change pages or page size. Task and execution tables scroll within a fixed area; the top tabs and footer pagination remain visible and do not move as the record count changes. The more menu at the end of each row provides a delete action. Execution times in the list and details use the task time zone.

The history list groups conversations by date and shows a small alarm clock beside source conversations associated with scheduled tasks. Use the **History** selector to switch between **All conversations** and **Conversations with scheduled tasks**. Changing the filter returns to page 1. The footer provides previous page, current page number, and next page controls, with up to 30 conversations per page. Unavailable navigation buttons are disabled. The small **Refresh** icon beside the selector preserves the filter and returns to page 1. Only summaries load initially; full content loads when you select a conversation. Viewing your history, badges, and filter requires AI Chat viewing access without additional scheduled task management permissions.

Each result is appended to the conversation where its task was created, without creating a separate conversation. A conversation can contain several scheduled tasks and continue to accept ordinary questions. Scheduled result messages retain their original content and cannot be edited or regenerated. The alarm clock identifies the source conversation. After all associated tasks have been stopped and deleted, refresh the list to remove its badge.

1. Open **AI Chat → Scheduled tasks → All execution records** to view currently retained records across your tasks. Use **Task name** to select **All tasks** or a specific task; changing the task filter returns to page 1. Alternatively, select a task title on the **Scheduled tasks** tab and open its **Execution history** tab to view that task alone.
2. The table lists executions newest first, with 10 records per page by default. **All execution records** also shows the task name and time zone; times use each task's time zone. Use the controls below the table to change pages or page size. Changing page size returns to page 1; the **Refresh** icon at the top of the dialog preserves the current page.
3. Expand a row to read the full result or error.
4. Once the history is published, click **Open result conversation** to open the original conversation and scroll to that execution's result message. Result links in notifications also locate the corresponding message. The same conversation is available in the history list on the left.
5. Continue asking questions or creating other tasks in the original conversation. Sending an ordinary question calls AI without changing previously saved scheduled result messages.

An execution record is saved before AI starts. Successful, failed, canceled, and interrupted runs are recorded. If history synchronization is pending, inspect **Execution history** and refresh later. A temporary service failure can prevent the conversation from opening without implying that the task never ran.

To remove a finished execution record, choose **Delete** from its row's more menu and confirm. This hides the record from the execution list while **preserving result messages in the original conversation** and future task executions. Queued, running, or unfinished records cannot be deleted. After a finished record is deleted, any pending result synchronization and background cleanup still continue. Deleting the last record on the last page returns to a valid page. Deleted records do not generate new notifications; notifications already being sent can still arrive.

### 8.13.3.1 Execution Record Retention

Execution records provide a recent view available only to the owner, rather than permanent history or an unread notification center. This retention policy only cleans up execution records; it does not automatically expire, pause, or delete tasks. Recurring tasks continue on schedule. Each task normally retains at most its latest 100 full records, for up to 30 days after execution finishes. Capacity pressure can reclaim safe, settled older records sooner. Collection occurs during storage commits or background cleanup, rather than exactly at the expiration time.

Unfinished runs and records still awaiting result synchronization, notification completion, or background cleanup are protected. The 100-record window is therefore not an absolute bound on all pending records. If no space can safely be reclaimed, the system pauses the task with a capacity error instead of silently dropping failed records. Deleting a record still allows pending history synchronization and background cleanup to finish before its content is reclaimed. Expiration or reclamation of execution records does not delete result messages already saved in the original conversation.

The cumulative execution count differs from the number of retained records. Failed executions count, and deletion, expiration, and task edits do not reset the cumulative count. Recurring tasks no longer have a lifetime limit of 100 executions; one-time tasks still complete after execution. Recurring tasks completed under the former 100-run limit require explicit resumption after upgrading; they are not reactivated automatically.

## 8.13.4 Edit, Pause, and Resume

Task actions are available on the **General** tab. Editing and pausing are separate operations: editing a paused task leaves it paused until it is explicitly resumed.

### 8.13.4.1 Edit a Task

1. Click **Copy edit request**, then **Open source conversation**, or close the dialog and start an ordinary conversation.
2. Paste the request, append the desired changes, and send it. For example: “Run once 2 minutes after confirmation. Keep Asia/Shanghai, the instruction, and Web history only.”
3. Wait for `edit_scheduled_task`, review the target and full replacement configuration, confirm the time zone, and click **Execute**.
4. Refresh the task detail and verify the updated schedule. Copying the request alone does not change the task.

One conversation can create several independent tasks. Creating another task does not replace the earlier one. The copied edit request includes the exact task identifier to distinguish tasks with identical titles or the same source conversation. If a version conflict occurs, refresh and request the edit again.

### 8.13.4.2 Pause and Resume

1. Click **Pause** and confirm the target. This prevents future occurrences and attempts to cancel current execution. Existing results are retained; notifications already being sent can still arrive.
2. The detail shows **Paused** with no next execution time.
3. Click **Resume** and confirm. The service checks the owner's authorization and schedules the next future occurrence without replaying recorded runs. For a recurring task completed under the former 100-run limit, use **Resume** in the same detail view. Completed one-time tasks do not offer this action.

If cancellation is still finishing, wait and refresh before resuming. A one-time schedule whose time has already passed needs a new future schedule.

### 8.13.4.3 Renew Authorization

An expired or deleted API key, or invalid user permissions, can fail an execution and change the task to **Authorization required**. Prepare a new key in Profile Settings, save it under **Scheduled tasks → Background authorization**, then open the affected task and click **Resume**. The updated credential applies to all tasks owned by the account but does not automatically resume them or repeat failed AI calls.

When execution detects invalid authorization, it keeps a failed record and notifies the connected owner. The failure reason, current key name, expiration, and **Authorize again** action appear in the same failure card without stacking another authorization card. A standalone authorization reminder can appear when no execution card is visible. Click **Authorize again** to open the configuration page. A persistent tip shows the current key, expiration, authorization status, and affected task count. If the invalid key prevents saving the result conversation in history, execution records remain available; history synchronization resumes after authorization is restored without repeating the AI execution. Network or temporary service failures indicate that the check is unavailable and do not require replacing the key or permanently pausing future scheduling.

Invalid authorization is discovered during execution or existing checks such as signing in, reconnecting, or opening Background authorization. There is no periodic authorization poll or guarantee of advance detection before a key expires. Select a valid key owned by the account, save it, and explicitly resume each affected task.

## 8.13.5 Stop Tasks and Delete History

Stopping a task keeps results already saved in its conversation. Deleting the conversation also closes all its associated tasks. Choose the action that matches the intended result.

| Goal | Action | Result |
|---|---|---|
| Suspend execution temporarily | **Pause** in task details and confirm | Keeps the task and results; it can be resumed |
| Stop permanently | **Delete** in the task row's more menu, or **Stop and delete task** in task details, then confirm | Stops future runs, attempts to cancel in-flight execution, and removes the task from the list; existing results in the conversation remain, and task restoration is not provided |
| Remove a finished execution record | **Delete** in the execution row's more menu and confirm | Removes the execution record, retains result messages in the original conversation, and preserves future task executions |
| Delete a conversation and its results | **Delete** in the history item's more menu, review the associated task names, and confirm | Closes every task associated with the conversation and deletes all its ordinary messages and scheduled results |

The confirmation dialog lists the affected task names. If several tasks share a conversation, confirming closes all of them and prevents future executions. If deletion fails, refresh to check the current state and retry. A failure while closing tasks or deleting history retains the conversation for retry; some tasks might already be stopped, so check their refreshed status.

The system first saves the conversation's closed status, cancels associated tasks, and waits for any result synchronization in progress before deleting the conversation. Delayed results or task confirmations cannot recreate it or restore its tasks. Minimal receipts remain for duplicate prevention and audit, without report content from the deleted conversation.

## 8.13.6 Troubleshooting and Limits

The following table describes current limits and suggested actions.

| Symptom or limit | Action or behavior |
|---|---|
| Entry missing or tasks cannot be loaded | Check permissions, service status, and AI service connection settings |
| Task did not run at the expected time | Check confirmation, task time zone, status, and next execution |
| Failed or interrupted execution | Read the execution error. A service restart can interrupt a running execution; AI is not automatically called again |
| Pending history synchronization | Inspect the execution record and refresh later; do not create duplicate tasks to retry synchronization |
| Result conversation unavailable or deleted | Refresh history; this entry does not recreate deleted conversations |
| Task count | Up to 20 non-deleted tasks per owner; stop and delete unused tasks |
| Older recurring task completed after 100 runs | Check its schedule and authorization, then explicitly resume it; there is no longer a lifetime execution limit |
| Retention | Normally a window of the latest 100 records, up to 30 days after finishing; capacity reclamation can occur sooner and does not affect Web history |
| Deployment | A single scheduler instance with a persistent data directory is required; parallel schedulers over the same tasks are not supported |

AI conclusions depend on the model and accessible data. Include equipment identifiers, time ranges, and missing-data requirements in the instruction, and check reports before using them.
