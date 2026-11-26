---
title: Setting Symbol States
sidebar_label: Setting Symbol States
---

import LoopVideo from '@site/src/components/LoopVideo';
import stateUrl from '../images/canvas-combine-state.mp4';

# 5.8.2 Setting Symbol States

Both regular symbols and combined symbols can have states. A state consists of a condition plus an appearance: the condition is evaluated against the bound value of a symbol attribute, and when it matches, the symbol automatically switches to the corresponding appearance — a regular symbol changes color or plays an animation, while a combined symbol switches to the corresponding child symbol. For example, on and off, or the rotation and stop of a fan, can be configured as two states of a combined symbol; red, yellow, and green alarm lights can serve as three states that switch automatically with the collected value.

<LoopVideo src={stateUrl} label="States" />

## 5.8.2.1 Regular Symbols: State Configuration

Regular symbols add states through the state configuration module under **Appearance** in the right-hand configuration panel:

1. Select the symbol, switch to **Appearance**, expand the states section, and click **Add State**.
2. Configure the following items in the "Configure State - Normal Pen" dialog:

| Item | Description |
| --- | --- |
| State Name | Display name of the state |
| Symbol Property | The drive attribute the condition is evaluated against; defaults to "Value" and can be changed to another bound attribute |
| Condition | Supports greater than, greater than or equal, less than, less than or equal, equal to, not equal to, and between; entering upper and lower bounds when "between" is selected |
| Property Value | The comparison value of the condition |
| Color Target | The color attribute written when the state matches: Background Color, Color, or Text Color |
| State Color | The color written to the color target when the state matches |
| Animation | The animation played when the state matches: None or Pen Animation (selectable only when the symbol has a configured animation) |

3. Click **OK** to save. Existing states can be edited or removed from the state list at any time; duplicated state values must be modified before saving.

## 5.8.2.2 Combined Symbols: Group as State

Select two or more symbols, right-click, and choose **Group as State** to combine them into a combined symbol with states: each child symbol inside the group corresponds to one state, and the screen switches to the corresponding child symbol when a state matches.

States of a combined symbol are also maintained in the state configuration module under **Appearance**, with the dialog titled "Configure State - Combined Pen": the drive attribute defaults to "State", and each state's name, condition, and animation can be configured, but there is no color target or state color (the appearance switch is presented by the child symbols). States correspond one-to-one to child symbols and cannot be added or removed individually.

## 5.8.2.3 Appending Child Symbols (Append Status)

After creating a "Group as State" combined symbol, you can continue to append child symbols to it; each appended child symbol adds one corresponding state. The procedure is as follows:

1. Place a new symbol to be embedded on the canvas.
2. Select both the "Group as State" combined symbol and the new symbol, by box selection or by clicking them one by one while holding `Ctrl`.
3. Right-click and choose **Append Status** from the context menu.
4. The new symbol becomes a child symbol of the combined symbol, moves and scales with it as a whole, and a corresponding state is added to the state list.

:::note
**Append Status** takes effect only on "Group as State" combined symbols; regular "Group" symbols do not have this entry, so ungroup and regroup first to add content.
:::

## 5.8.2.4 Driving State Switching

State conditions are automatically evaluated against the latest bound value of the selected symbol attribute:

1. **Attribute binding**: bind the drive attribute (such as "Value") to an IDMP element attribute, and the state switches automatically as the collected value changes. See [5.8.3 Setting Symbol Values](./03-property-values.md) for the binding method.
2. **Event-driven**: use the "set symbol attributes" event action to change the state attribute of the symbol. See [5.8.6 Setting Symbol Events](./06-events.md).

## 5.8.2.5 Manual State Preview

While configuring states, you can manually force a preview of a state in the state list to verify its colors and animation without waiting for the collected value to cross a threshold. Check the manual preview switch on a state row and the symbol switches to that state's appearance; uncheck it to restore. During setup and acceptance, this helps quickly distinguish a styling issue from a value that has not yet matched.
