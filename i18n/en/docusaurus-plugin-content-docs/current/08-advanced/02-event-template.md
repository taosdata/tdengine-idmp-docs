---
title: Event Templates
---

Analyses in TDengine IDMP can generate events. To better manage these events, TDengine IDMP requires that you specify an event template when creating an analysis.

Event templates support inheritance, so you can define base templates. An event template can also be marked as **Base Template Only**, in which case it cannot be used to create events.

An event template consists of a general event template and an event attribute template. Event templates are managed under the **Libraries** section in the main menu.

## General Templates

To create a new event template, click **Libraries** in the main menu, select Event Templates from the sidebar, and click the New Event Template (+) button.

Enter a name and description for the template and select its category, base template, and severity level. You can also configure whether the template is base-only, allows extension, or requires acknowledgment, among other settings.

Then, define a naming pattern for events created from the template. In the **Event Naming Pattern** field, you can enter text and click the + icon on the right to insert placeholder variables. For best results, include the element name, analysis name, and start time in the pattern, so the event name clearly shows which element and analysis generated it and when.

## Event Attribute Template

An event can have associated attributes that record relevant values at the time the event occurs. You can configure the name, category, data type, and default value for each attribute. You can also set whether the attribute is a constant, whether it is hidden, and whether it is excluded.

Event attributes do not support data reference settings, because all event-related data is stored in the relational database built in to TDengine IDMP.

When configuring an analysis, you can specify that the output of a calculation be saved to a particular event attribute.
