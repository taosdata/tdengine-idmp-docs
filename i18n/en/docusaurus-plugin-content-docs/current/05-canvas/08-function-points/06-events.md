---
title: Setting Symbol Events
sidebar_label: Setting Symbol Events
---

import LoopVideo from '@site/src/components/LoopVideo';
import eventUrl from '../images/canvas-event.mp4';
import triggerUrl from '../images/canvas-event-trigger.mp4';

# 5.8.6 Setting Symbol Events

Events are the core mechanism that drives the canvas with data: by defining event types, event actions, and trigger conditions, symbols automatically change their appearance on data changes or mouse operations. Event types include mouse enter, mouse leave, selection, etc., but the most important is "symbol attribute value change." The attributes of a symbol can be bound to an IDMP element's attribute, and when a trigger condition for this value is met, a specified event action can be triggered. Event actions include starting animations, stopping animations, etc., but the most important action is "setting symbol attributes," which can change the display of the symbol, such as its color, background color, displayed text, etc.

## 5.8.6.1 Adding Events

Add the corresponding events to achieve the corresponding event behaviors. Tip: Some event behaviors only show effects when viewing and cannot be displayed during editing.

Event types: mouse enter, mouse leave, selection, deselection, mouse down, mouse up, click, double click, symbol attribute value change.

Event actions: open link, set symbol attributes, execute animation, pause animation, stop animation, execute JavaScript, execute Window function, custom message.

The following figure shows two events set for the symbols on the canvas: when the mouse enters, the background color is set to green, and when the mouse leaves, the background color is restored.

<LoopVideo src={eventUrl} label="Symbol Events" />

## 5.8.6.2 Conditional Triggers

You can add trigger conditions to events. The most commonly used trigger condition is "relational operation," which allows logical judgments on the attributes of symbols, including value, progress, status, and text (other attributes do not support logical judgments).

The following figure shows that the event is triggered only when the symbol text is greater than 30 upon mouse enter. In the figure, the symbol with text 40 meets the condition and triggers the background to turn green, while the symbol with text 20 does not meet the condition and does not trigger the background to turn green upon mouse enter.

<LoopVideo src={triggerUrl} label="Conditional Triggers" />

### Trigger Condition Data Structure

A trigger condition is described by the `where` object on a symbol event and contains the following fields:

- `type`: An arbitrary value; using the condition's functional name is recommended for readability. When empty, no trigger condition is applied.
- `fn`: A condition function that returns a boolean value. Highest priority.
- `fnJs`: A JavaScript code snippet for the condition. It can access the `pen` and `context` parameters and must return a boolean value. Second priority.
- `key`: Compare against an attribute name. Lowest priority.
- `comparison`: The comparison operator, used together with `key`.
- `value`: The value to compare against, used together with `key`.

The operators supported by `comparison` are:

| Operator | Meaning                                                                                                                                                                                                                                                                                                                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `>`      | Greater than                                                                                                                                                                                                                                                                                                                                                                                 |
| `>=`     | Greater than or equal to                                                                                                                                                                                                                                                                                                                                                                     |
| `<`      | Less than                                                                                                                                                                                                                                                                                                                                                                                    |
| `<=`     | Less than or equal to                                                                                                                                                                                                                                                                                                                                                                        |
| `=`      | Equal to                                                                                                                                                                                                                                                                                                                                                                                     |
| `!=`     | Not equal to                                                                                                                                                                                                                                                                                                                                                                                 |
| `[)`     | Between. The operator itself only indicates the "between" semantic; the actual interval boundaries are specified by the `value` field using standard mathematical interval notation, supporting all four combinations: `[]`, `[)`, `(]`, `()`. For example, a `value` of `[0, 100)` includes 0 but excludes 100; `(0, 100]` excludes 0 but includes 100; `[0, 100]` includes both 0 and 100. |
| `![)`    | Not between, i.e., outside the "between" range. Interval boundaries are likewise specified by the `value` field.                                                                                                                                                                                                                                                                             |
| `[]`     | Belongs to a set, for example `[1,20,30..50,65]`, where `30..50` denotes a continuous integer range from 30 to 50 (inclusive). String values are also supported, for example `[1,20,aaa,value1]`.                                                                                                                                                                                            |
| `![]`    | Does not belong to the set above.                                                                                                                                                                                                                                                                                                                                                            |

## 5.8.6.3 Execute JavaScript

When the event action is set to "Execute JavaScript," a user-defined JavaScript snippet runs after the event is triggered. This is useful for reporting data, calling APIs, refreshing business state, and similar scenarios. The following variables are available inside the snippet:

- `pen`: The symbol object that triggered the event.
- `params`: The parameters passed in from the event configuration.
- `context`: The execution context.
- `arguments`: The original event arguments.

The equivalent symbol-event data structure looks like this:

```typescript
// EventAction is provided by the Canvas runtime; inlined here so the example
// is self-contained. The value "JS" stands for the "Execute JavaScript" action.
const EventAction = { JS: "JS" };

const pen = {
  name: "rectangle",
  text: "rectangle",
  x: 100,
  y: 100,
  width: 100,
  height: 100,
  events: [
    {
      name: "click",
      action: EventAction.JS,
      params: "my params", // parameters passed to the code block
      value: `
        console.log('arguments', arguments);
        console.log('current symbol', pen);
        console.log('params', params);
        console.log('context', context);
      `, // code block
    },
  ],
};
```

Example of calling an API (assign either snippet below as a string to the event's `value` field):

```javascript
// Using chained .then()
fetch("/api/device/data?mock=1")
  .then((res) => res.text())
  .then((data) => console.log(data));

// Or using async/await
(async () => {
  const res = await fetch("/api/device/data?mock=1");
  const data = await res.text();
  console.log(data);
})();
```

## 5.8.6.4 Applying Events

Events are the common mechanism that drives the other function points. The "set symbol attributes" event action can change attributes such as state, value, and progress, and event actions such as "execute animation" can play animations:

- Changing symbol states: see [5.8.2 Setting Symbol States](./02-states.md)
- Changing symbol values: see [5.8.3 Setting Symbol Values](./03-property-values.md)
- Changing progress value and progress color: see [5.8.4 Setting Progress](./04-progress.md)
- Playing, pausing, and stopping animations: see [5.8.5 Setting Symbol Animations](./05-animation.md)
