---
title: Element Relationship Graph
sidebar_label: Element Relationship Graph
---

# 3.8 Element Relationship Graph

The asset catalog tree expresses the **hierarchical** relationships between elements — the nesting of groups, plants, production lines, equipment, and measurement points. But in real industrial sites, elements also share a large number of **non-hierarchical** lateral connections: a clean-water tank controls a pump house, two devices serve as mutual redundancy, an interlock protects another device, and a shared measurement point affects multiple process lines. These relationships cannot be squeezed into a tree, yet they are exactly the key to understanding "who affects whom and who controls whom" between devices.

The **Element Relationship Graph** (the Related Elements view) exists for this purpose: it takes a single element as the center and renders the industrial semantic relationships — control, interlock, redundancy, fault propagation, production process, and so on — between that element and its surrounding elements as an interactive **local relationship network graph**. You can see at a glance which relationships the current element maintains and which elements relate to it, and explore outward step by step along the relationships.

:::note
The Element Relationship Graph shows **industrial semantic relationships between elements**, which differ from the hierarchical relationships in the element tree (Strong / Weak / Composition references). These relationships are carried by "Element reference" type attributes of elements, with a relationship direction and a relationship type (enum value) attached to describe the business semantics. For background on references and relationship types, see [3.5 Relationships and the Industrial Ontology](./05-relationships-and-ontology.md).
:::

## 3.8.1 Opening the Element Relationship Graph

1. In the **Explorer**, click an element in the **element tree** on the left to open its detail view in the main pane.
2. In the tab bar at the top of the detail pane, click **Related Elements**.

The page then loads and renders the relationship graph centered on that element. The selected element is called the **center element** and is highlighted in the graph.

:::info
The **Related Elements** tab only appears after you select a specific element, so you must select an element before you can enter the Element Relationship Graph page.
:::

## 3.8.2 Page Layout

The Element Relationship Graph page consists of three parts:

| Area | Position | Purpose |
|---|---|---|
| **Toolbar** | Top | Three filters (Display Depth, Relationship Type, Relationship Direction) plus action buttons such as Edit, Save, Refresh, and Collapse panel |
| **Graph canvas** | Middle | The G6 relationship network graph centered on the center element; nodes are elements and edges are relationships |
| **Right panel** | Right | Shows the name, path, description, and direct relationship list of the currently selected element |

### 3.8.2.1 Meaning of Nodes and Edges

Each **node** in the graph represents an element, and each **edge** represents a relationship between elements:

- **Center element**: highlighted in a prominent color, the focal point of the whole graph, and cannot be deleted.
- **First-degree elements**: elements directly connected to the center element, shown with the normal entity style.
- **Second-degree and beyond elements**: elements reachable through indirect relationships, shown with a de-emphasized style, viewable and navigable only.
- **Deleted elements**: relationships that still exist but whose target element has been deleted, shown with a warning-colored dashed style and named "Element deleted".

The arrow direction of an edge is determined jointly by the **relationship direction** and the **relationship owner** (Outgoing, Incoming, Bidirectional, Undirected). See [3.8.3.2 Relationship Direction](#3832-relationship-direction).

### 3.8.2.2 Node Name Display

Element names are **centered inside the node circle, up to two lines**, with the font size automatically reduced as the name gets longer; overly long names are truncated with an ellipsis. The full element name is always shown in the right panel.

## 3.8.3 Understanding Relationship Semantics

### 3.8.3.1 Owner and Counterpart

Every relationship is formed by two elements:

- **Owner**: the element that holds this relationship attribute, and the subject of the relationship. For example, "Clean-water Tank CW-01" maintains a relationship attribute in its own attributes that points to the "Pump House".
- **Counterpart**: the element that the relationship attribute points to.

:::tip
"Who owns the relationship" and "where the arrow points" are two different things. The arrow direction is determined jointly by the **relationship direction** and the **relationship owner**: the direction describes where the relationship points from the owner's perspective, while the owner determines which element holds the relationship attribute. See [3.8.3.2 Relationship Direction](#3832-relationship-direction).
:::

### 3.8.3.2 Relationship Direction

Every relationship has a **relationship direction** that determines the arrow direction in the graph:

| Direction | Meaning | Arrow in graph |
|---|---|---|
| **Outgoing** | From owner to counterpart | Single arrow pointing to the counterpart |
| **Incoming** | From counterpart to owner | Single arrow pointing to the owner |
| **Bidirectional** | Bidirectional semantics | Arrows on both ends |
| **Undirected** | No explicit direction | No arrow |

:::note
The relationship direction is defined **relative to the owner**. When you view a relationship with center element C, if C happens to be the counterpart (rather than the owner), "Outgoing" and "Incoming" swap from C's perspective. For example: the counterpart element maintains a relationship with direction "Incoming" (arrow pointing to the owner); from C's perspective, this relationship is "Outgoing". Direction filtering performs this perspective conversion automatically.
:::

### 3.8.3.3 Relationship Type

Every relationship belongs to a **relationship type** (an enum set) and takes a **relationship value** (an enum value) from that set to describe the concrete semantics. For example, if the relationship type is "Control", the relationship value might be "Control", "Interlock", "Redundancy", and so on. Both the relationship type and the relationship value are predefined in enum sets (see [3.4 Data Standardization](./04-data-standardization.md)).

## 3.8.4 Viewing the Relationship Graph

### 3.8.4.1 Layer-by-Layer Expansion

The relationship graph shows **Level 2** by default (center element + first-degree elements + second-degree elements). The page builds the graph through **layer-by-layer loading**: it first loads the center element's first-degree relationships and renders them immediately, then loads the second degree using the first-degree elements as the frontier, merging layer by layer until it reaches the layer count set by **Display Depth**.

### 3.8.4.2 Adjusting the Display Depth

The **Display Depth** dropdown in the toolbar supports Levels 1 through 7:

- Select **Level 1**: only the center element and its directly connected first-degree elements are shown; second-degree and beyond elements are hidden.
- Select **Level 2** and deeper: expand outward to include more indirect elements.

:::warning
The deeper the display depth, the more nodes and edges appear in the graph. When the number of relationships exceeds the display limit, the page shows "The relationship limit was reached. Only partial results are shown." In this case, reduce the depth or use filters to narrow the scope.
:::

### 3.8.4.3 Exploring by Clicking Nodes

Click any **non-deleted node** in the graph to switch the right panel to that node, showing its name, path, description, and direct relationship list. At the same time, that node's first-degree relationships are **incrementally merged into the main graph**, letting you explore outward along the relationships — while the center element of the main graph remains unchanged.

:::info
Clicking a **deleted node** (warning-colored dashed style) does not trigger a load request; the right panel shows "The related element was deleted" along with the currently known edge information.
:::

### 3.8.4.4 Right Panel

The right panel changes with the selected node in the graph and always shows information about the **currently selected element**:

- Element name, path, and description;
- Direct relationship count;
- A relationship table with columns "Source node / Target node / Relationship type / Relationship value / Relationship Direction".

:::note
When you first enter the page, the right panel shows the center element's information by default. After clicking another node, the panel switches to that node's information, but the center element of the main graph remains unchanged.
:::

### 3.8.4.5 Collapsing and Expanding the Panel

Click the **collapse / expand** button at the far right of the toolbar to collapse or expand the right panel, freeing up more space for the graph canvas.

## 3.8.5 Filtering Relationships

The toolbar provides three filters to help you focus on the relationships you care about in a complex graph. Filters can be combined.

### 3.8.5.1 Relationship Type Filter

The **Relationship Type** dropdown (multi-select) filters edges by relationship type. It applies to **all edges** in the graph (including indirect edges), keeping only the selected types and allowing multiple disconnected subgraphs in the result.

### 3.8.5.2 Relationship Direction Filter

The **Relationship Direction** dropdown (multi-select) filters edges by direction. It applies **only to first-degree edges directly connected to the center element**; indirect edges are always kept. After filtering, orphan nodes disconnected from the center element are automatically removed, ensuring the result graph always remains connected with the center element as its root.

:::note
Relationship type filtering and direction filtering have different semantics: type filtering is global (applies to all edges), while direction filtering applies only to direct edges. This keeps the "outgoing / incoming relationships as seen from the center element" perspective clear.
:::

### 3.8.5.3 Filtering in Edit Mode

:::info
The filters are disabled in **edit mode**. Before entering edit mode, use the filters to determine the scope of relationships you want to maintain.
:::

## 3.8.6 Editing Relationships

The relationship graph supports maintaining relationships directly related to the center element in **edit mode**. Editing uses a **draft + batch save** model: all operations are first recorded as front-end drafts and submitted all at once when you click **Save**.

### 3.8.6.1 Entering and Exiting Edit Mode

- Click the **Edit** button in the toolbar to enter edit mode; the Edit button then switches to **Save** and **Discard**.
- Click **Save**: submit all drafts at once; on success, exit edit mode and refresh the graph.
- Click **Discard**: discard all unsaved drafts and exit edit mode.

:::warning
If you switch the center element while there are unsaved drafts in edit mode, the system prompts you to save or discard to avoid losing the drafts.
:::

### 3.8.6.2 Adding a Relationship from the Center Element

1. Enter edit mode and click the **center element** to open its menu.
2. Select **Add relationship** to open the "Add relationship" dialog.
3. Select the **counterpart element**, then the **relationship type** and **relationship value**.
4. Click **Confirm**; the new relationship is added to the graph as a draft (not yet written to the backend).
5. Click **Save** in the toolbar; the relationship attribute is written to the center element and takes effect.

:::tip
For a relationship initiated from the center element, the owner is the center element itself, and the counterpart element is selectable.
:::

### 3.8.6.3 Adding a Relationship from Another Node

1. Enter edit mode and click a **first-degree** or **second-degree** element to open its menu.
2. Select **Add relationship** to open the "Add relationship" dialog.
3. The **counterpart element is locked to the center element**; you only need to select the relationship type and relationship value.
4. Click **Confirm** and save; the relationship attribute is written to **the clicked node** (the owner is that node, and the counterpart is the center element).

### 3.8.6.4 Creating a Relationship by Dragging an Element

1. Enter edit mode and drag an element from the **element tree** on the left onto the graph canvas.
2. On release, the element appears on the canvas as a **white dashed isolated draft node** (no relationship is established yet, and nothing is written to the backend).
3. Click the draft node to open its menu, where you can choose:
   - **Add relationship**: create a relationship with the draft node as the owner and the center element as the counterpart;
   - **Remove object**: remove only the draft node from the canvas (the real element is not deleted).

:::warning
"Remove object" only removes the temporary draft node from the canvas; it does **not delete the real element asset**.
:::

:::note
If the dragged element is already a node in the graph (or an already-dragged draft), the page shows "This element is already in the relationship graph".
:::

### 3.8.6.5 Editing and Deleting Direct Edges

After entering edit mode, click a **direct edge** (an edge directly connected to the center element) to open the edge menu:

- **Edit**: modify the relationship's target element or relationship value.
- **Delete**: delete the relationship.

:::note
Only **direct edges** directly connected to the center element can be edited or deleted; **indirect edges** at degree two and beyond are read-only and have no edit entry.
:::

### 3.8.6.6 Maintaining Relationships from the Right Panel

In the relationship list of the right panel, **only when the center element C is selected** does each relationship row provide an edit / delete menu; when other nodes are selected, the list is read-only and shows no action column.

### 3.8.6.7 Deleting Relationships and the Pending-Delete State

When you delete a relationship, the edge is first kept in the graph as a **red dashed line** (marked as pending deletion) and a delete command is recorded; after you click **Save**, the delete commands take effect in batch and the relationship is truly deleted.

:::info
If you delete a newly added relationship that has not yet been saved (a draft edge), saving directly cancels the corresponding create command; no backend deletion is needed.
:::

### 3.8.6.8 Batch Save and Rollback

All create, update, and delete operations are combined into a single **batch submission**:

- The backend executes all commands in sequence within the same element transaction;
- If any command fails, the whole batch **rolls back**, the front end keeps the drafts and edit mode, and no "partially succeeded, partially failed" intermediate state occurs.

## 3.8.7 Handling Invalid Relationships

When a relationship points to an element that has been deleted, the relationship is kept in the graph as an **invalid relationship (dangling)**:

- The missing element is shown as a warning-colored dashed node named "Element deleted";
- The right panel shows "The related element was deleted. Check the attribute that maintains this relationship.";
- You can delete this invalid relationship in edit mode to clean up the dangling attribute left in the owner element.

:::note
When a target element is deleted, the system does **not** automatically modify other elements' attributes. Therefore relationship attributes in other elements that point to the deleted element are kept and become invalid relationships, which you need to clean up explicitly.
:::

## 3.8.8 FAQ

**Q: Why can't I see the relationships between certain elements?**

A: The relationship graph is centered on the currently selected element and only shows relationships connected to it (within its expansion depth). Confirm that the selected element actually maintains relationship attributes or is pointed to by other elements' relationship attributes. Also check whether the Display Depth is set too low and whether the filters have filtered out the target relationships.

**Q: Why is the arrow direction different from what I expected?**

A: The arrow direction is determined jointly by the **relationship direction** and the **relationship owner** — the direction describes where the relationship points from the owner's perspective, while the owner determines which element holds the relationship attribute. Combined, the arrow may point from the owner to the counterpart, or from the counterpart to the owner:

| Relationship direction | Who the owner is | Arrow in graph |
|---|---|---|
| Outgoing | Current element | Current element → counterpart |
| Outgoing | Counterpart element | Counterpart → current element |
| Incoming | Current element | Counterpart → current element |
| Incoming | Counterpart element | Current element → counterpart |
| Bidirectional | Either side | Arrows on both ends |
| Undirected | Either side | No arrow |

For example: the counterpart element maintains a relationship with direction "Incoming"; from the current element's perspective, the arrow points to the counterpart (i.e., "Outgoing"). Therefore, if the arrow direction does not match your expectation, check both the relationship's **direction value** and its **owner**.

**Q: Why can't some edges be edited?**

A: Only **direct edges** directly connected to the center element can be edited; **indirect edges** at degree two and beyond are read-only. If you need to edit an indirect edge, first switch to the element that makes that edge a direct edge.

**Q: Why is no relationship established after I drag an element in?**

A: Dragging an element only creates an **isolated draft node** — the purpose is to let you organize the canvas first and then explicitly decide whether to add a relationship. Click the draft node, select **Add relationship**, and save.
