---
title: AI Functions
sidebar_label: AI Functions
---

# 8.11 AI Functions

An AI Function is a unified AI entry point available across pages. It combines the context of the current page (elements, attributes, events, panels, RT analyses, and so on) with a piece of AI processing logic, giving a scenario-aware analysis result in one click. AI Functions can be seen as a generalization of [AI Panel Insights](./03-ai-panel-insights.md): panel insights act on a single panel, whereas AI Functions can run on almost any page.

The same AI Functions button automatically collects different context depending on the page it sits on, so clicking it on an element detail page, an event page, or a panel page yields analyses with different focus. IDMP ships with several ready-to-use built-in AI Functions, and space administrators can also upload custom AI Functions for their teams.

## 8.11.1 Running an AI Function

AI Functions are available to all users and require no configuration to use (features that rely on a large language model need a valid [AI connection](./01-connecting-to-llm.md)).

On pages that support AI Functions, an AI icon button sits at the right end of the left-hand button group. The element detail, attributes, events, panels, dashboards, search, and RT analysis pages all provide this button. Clicking the button directly runs the highest-priority AI Function for the current page; hovering over the button for about half a second expands the list of candidate functions, and clicking any item runs that function.

The dropdown lists only the functions applicable to the current page. The system filters by each function's applicable page, so functions unrelated to the current page do not appear in the list.

## 8.11.2 Viewing Results and Asking Follow-Ups

After a function runs, an execution panel opens on the right and streams the AI analysis in real time. A follow-up question can be entered in the input box at the bottom of the panel, and the answer continues in the same session panel as a coherent multi-turn conversation. The AI Functions session is independent of AI Chat, so follow-ups do not pollute the AI Chat history.

Clicking a function item in the dropdown pins it to the top of the list for quick access next time. The pin setting is saved per page and persists across refreshes.

## 8.11.3 Managing Custom AI Functions

In addition to the built-in functions, space administrators can upload custom AI Functions to extend the analysis capabilities available to their team.

On the **Libraries → Agentic AI → Functions** list page, click New, upload a Markdown (`.md`) skill file, set the metadata in the form, and save. After saving, the list page opens and the new function appears under the Customized scope. The row actions on the list page can be used at any time to edit a function's content and settings or to delete it; once deleted, the function is immediately removed from the candidates on all pages.

When creating a function, three key settings are configured in the edit form. Any matching metadata carried in the uploaded file is overridden by the values selected in the form, so these settings follow the form rather than the file.

- **Applicable page (contextType)** determines which pages show the function in their dropdown. Choosing a specific page type (such as panel, element, or event) makes it available only on that page; choosing "any" makes it available on all supported pages.
- **Public (isPublic)** controls whether the function is visible to other users in the space. When turned off, only the creator can see and use it.
- **Page callable (pageCallable)** controls whether the function appears as a candidate in the page AI Functions dropdown. When turned off, the function is still stored in the library but does not appear in page dropdowns. To let a custom function be executed on pages, this switch must be turned on.

## 8.11.4 Built-In AI Functions

IDMP ships with several system AI Functions that work out of the box, with no upload required. Built-in functions are page-callable by default and appear automatically in the relevant page dropdowns according to their applicable page.

| Built-In Function | Purpose | Applicable Page |
|---|---|---|
| Panel Interpretation | Generates a natural-language summary and interpretation of a single panel's data | Panel view page |
| Root Cause Analysis | Produces a structured root cause investigation report for an event | Event detail page |
| General Analysis | Analyzes all visible content on the current page (including child-element expansion) | Any page |
