# "Analysis" → "RT Analysis" Changes for English Docs

## Summary
This table lists all occurrences where `Analysis` / `analysis` in the English docs refers to the **IDMP real-time analysis (stream-computing) feature** and should be changed to `RT Analysis` / `RT analysis`.

**Contexts excluded** (per the 宁缺毋滥 principle):
- Generic analytical verbs (analyze data, analyze metrics)
- Named techniques (root cause analysis, correlation analysis, regression analysis, window analysis, clustering analysis, trend analysis, process analysis, batch analysis)
- "Associated Analysis" event field name
- Template variables (${Analysis#name}, {analysisName})
- Standard UI terms (Analysis form, Analysis expression, Analysis name, Analysis task, Analysis algorithm, Analysis type, Analysis chart, Analysis panel)
- "AI-assisted analysis" / "AI-Powered Analysis" (AI qualifies it)
- "anomaly detection analysis" (prefix qualifies)
- Data analyst job titles
- CLI commands and API paths (analysis +list, analysis.analyses.list, etc.)

---

## Chapter 7: Real-Time Intelligent Analysis and Response

### 07-real-time-analysis/index.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 1 | 07-real-time-analysis/index.md | 24 | the analysis list | the RT analysis list | Feature-specific list |
| 2 | 07-real-time-analysis/index.md | 31 | applicable analysis plans | applicable RT analysis plans | Feature-specific plans |
| 3 | 07-real-time-analysis/index.md | 32 | the analysis configuration form | the RT analysis configuration form | Feature-specific configuration |
| 4 | 07-real-time-analysis/index.md | 36 | element's **Analyses** tab | element's **RT analysis** tab | Tab name |
| 5 | 07-real-time-analysis/index.md | 43 | The analysis list, toolbar controls | The RT analysis list, toolbar controls | Descriptive text |
| 6 | 07-real-time-analysis/index.md | 44 | **[Creating an Analysis](./02-creating-analysis.md)** | **[Creating an RT Analysis](./02-creating-analysis.md)** | Cross-reference link text |
| 7 | 07-real-time-analysis/index.md | 49 | **[Analysis Templates](./07-analysis-templates.md)** | **[RT Analysis Templates](./07-analysis-templates.md)** | Cross-reference link text |
| 8 | 07-real-time-analysis/index.md | 49 | Defining reusable analysis rules | Defining reusable RT analysis rules | Feature-specific rules |
| 9 | 07-real-time-analysis/index.md | 50 | in an analysis to run actions | in an RT analysis to run actions | Feature instance |

### 07-real-time-analysis/01-browsing-analyses.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 10 | 07-real-time-analysis/01-browsing-analyses.md | 2 | title: Browsing and Managing Analyses | title: Browsing and Managing RT Analyses | Chapter section title |
| 11 | 07-real-time-analysis/01-browsing-analyses.md | 3 | sidebar_label: Browsing Analyses | sidebar_label: Browsing RT Analyses | Sidebar label |
| 12 | 07-real-time-analysis/01-browsing-analyses.md | 6 | # 7.1 Browsing and Managing Analyses | # 7.1 Browsing and Managing RT Analyses | Section heading |
| 13 | 07-real-time-analysis/01-browsing-analyses.md | 8 | Analyses are managed from the **Analyses** tab | RT analyses are managed from the **RT analysis** tab | Tab name and feature reference |
| 14 | 07-real-time-analysis/01-browsing-analyses.md | 10 | ## 7.1.1 The Analysis List | ## 7.1.1 The RT Analysis List | Section heading |
| 15 | 07-real-time-analysis/01-browsing-analyses.md | 12 | The analysis list is the core view for managing element analyses | The RT analysis list is the core view for managing element RT analyses | Feature list |
| 16 | 07-real-time-analysis/01-browsing-analyses.md | 14 | The analysis list includes the following columns | The RT analysis list includes the following columns | Feature list |
| 17 | 07-real-time-analysis/01-browsing-analyses.md | 18 | The analysis name | The analysis name | KEEP — standard UI term |
| 18 | 07-real-time-analysis/01-browsing-analyses.md | 21 | The analysis template this analysis was created from | The RT analysis template this RT analysis was created from | Feature template + instance |
| 19 | 07-real-time-analysis/01-browsing-analyses.md | 24 | the analysis was last modified | the RT analysis was last modified | Feature instance |
| 20 | 07-real-time-analysis/01-browsing-analyses.md | 28 | above the analysis list ... exporting analyses | above the RT analysis list ... exporting RT analyses | Feature list |
| 21 | 07-real-time-analysis/01-browsing-analyses.md | 32 | Create a new analysis manually | Create a new RT analysis manually | Creation action |
| 22 | 07-real-time-analysis/01-browsing-analyses.md | 33 | Paste a previously copied analysis | Paste a previously copied RT analysis | Feature instance |
| 23 | 07-real-time-analysis/01-browsing-analyses.md | 34 | Reload the analysis list | Reload the RT analysis list | Feature list |
| 24 | 07-real-time-analysis/01-browsing-analyses.md | 36 | Export the analysis list as a CSV file | Export the RT analysis list as a CSV file | Feature list |
| 25 | 07-real-time-analysis/01-browsing-analyses.md | 43 | any analysis row | any RT analysis row | Feature instance |
| 26 | 07-real-time-analysis/01-browsing-analyses.md | 47 | this analysis | this RT analysis | Feature instance |
| 27 | 07-real-time-analysis/01-browsing-analyses.md | 48 | the analysis in edit mode | the RT analysis in edit mode | Feature instance |
| 28 | 07-real-time-analysis/01-browsing-analyses.md | 49 | Copy this analysis | Copy this RT analysis | Feature instance |
| 29 | 07-real-time-analysis/01-browsing-analyses.md | 50 | Save this analysis as a reusable analysis template | Save this RT analysis as a reusable RT analysis template | Feature template |
| 30 | 07-real-time-analysis/01-browsing-analyses.md | 51 | inspecting analysis output | inspecting RT analysis output | Feature output |
| 31 | 07-real-time-analysis/01-browsing-analyses.md | 52 | the analysis over historical data | the RT analysis over historical data | Feature instance |
| 32 | 07-real-time-analysis/01-browsing-analyses.md | 53 | Pause the analysis | Pause the RT analysis | Feature instance |
| 33 | 07-real-time-analysis/01-browsing-analyses.md | 54 | Delete the analysis and optionally delete the output data | Delete the RT analysis and optionally delete the output data | Feature instance |
| 34 | 07-real-time-analysis/01-browsing-analyses.md | 58 | Each analysis has a definitive execution status | Each RT analysis has a definitive execution status | Feature instance |
| 35 | 07-real-time-analysis/01-browsing-analyses.md | 58 | the analysis list | the RT analysis list | Feature list |
| 36 | 07-real-time-analysis/01-browsing-analyses.md | 62 | The analysis stream computation | The RT analysis stream computation | Feature instance |
| 37 | 07-real-time-analysis/01-browsing-analyses.md | 63 | The analysis has been manually paused | The RT analysis has been manually paused | Feature instance |
| 38 | 07-real-time-analysis/01-browsing-analyses.md | 65 | deleting an analysis ... the analysis | deleting an RT analysis ... the RT analysis | Feature instance |

### 07-real-time-analysis/02-creating-analysis.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 39 | 07-real-time-analysis/02-creating-analysis.md | 2 | title: Creating an Analysis | title: Creating an RT Analysis | Chapter section title |
| 40 | 07-real-time-analysis/02-creating-analysis.md | 3 | sidebar_label: Creating an Analysis | sidebar_label: Creating an RT Analysis | Sidebar label |
| 41 | 07-real-time-analysis/02-creating-analysis.md | 6 | # 7.2 Creating an Analysis | # 7.2 Creating an RT Analysis | Section heading |
| 42 | 07-real-time-analysis/02-creating-analysis.md | 8 | create a new analysis manually | create a new RT analysis manually | Creation action |
| 43 | 07-real-time-analysis/02-creating-analysis.md | 8 | an element's **Analyses** tab | an element's **RT analysis** tab | Tab name |
| 44 | 07-real-time-analysis/02-creating-analysis.md | 14 | the analysis's identification | the RT analysis's identification | Feature instance |
| 45 | 07-real-time-analysis/02-creating-analysis.md | 18 | A unique name for this analysis | A unique name for this RT analysis | Feature instance |
| 46 | 07-real-time-analysis/02-creating-analysis.md | 19 | organize and filter analyses | organize and filter RT analyses | Feature instances |
| 47 | 07-real-time-analysis/02-creating-analysis.md | 20 | the analysis starts running immediately | the RT analysis starts running immediately | Feature instance |
| 48 | 07-real-time-analysis/02-creating-analysis.md | 20 | the analysis in a paused state | the RT analysis in a paused state | Feature instance |
| 49 | 07-real-time-analysis/02-creating-analysis.md | 21 | the analysis re-runs | the RT analysis re-runs | Feature instance |
| 50 | 07-real-time-analysis/02-creating-analysis.md | 22 | what this analysis computes | what this RT analysis computes | Feature instance |
| 51 | 07-real-time-analysis/02-creating-analysis.md | 26 | when the analysis runs | when the RT analysis runs | Feature instance |
| 52 | 07-real-time-analysis/02-creating-analysis.md | 31 | the analysis runs over historical data | the RT analysis runs over historical data | Feature instance |
| 53 | 07-real-time-analysis/02-creating-analysis.md | 37 | the analysis generates an event | the RT analysis generates an event | Feature instance |
| 54 | 07-real-time-analysis/02-creating-analysis.md | 41 | what the analysis computes | what the RT analysis computes | Feature instance |
| 55 | 07-real-time-analysis/02-creating-analysis.md | 45 | the analysis fires | the RT analysis fires | Feature instance |
| 56 | 07-real-time-analysis/02-creating-analysis.md | 45 | the analysis behaves as before | the RT analysis behaves as before | Feature instance |
| 57 | 07-real-time-analysis/02-creating-analysis.md | 49 | create the analysis | create the RT analysis | Feature instance |
| 58 | 07-real-time-analysis/02-creating-analysis.md | 49 | the analysis starts running immediately | the RT analysis starts running immediately | Feature instance |

### 07-real-time-analysis/03-trigger-types.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 59 | 07-real-time-analysis/03-trigger-types.md | 8 | when an analysis fires | when an RT analysis fires | Feature instance |
| 60 | 07-real-time-analysis/03-trigger-types.md | 55 | an independent sub-analysis for each target | an independent sub-RT analysis for each target | Feature sub-instance |
| 61 | 07-real-time-analysis/03-trigger-types.md | 102 | the analysis to react | the RT analysis to react | Feature instance |
| 62 | 07-real-time-analysis/03-trigger-types.md | 116 | downstream dashboard and analysis | downstream dashboard and RT analysis | Feature instance |
| 63 | 07-real-time-analysis/03-trigger-types.md | 117 | an analysis on every new reading | an RT analysis on every new reading | Feature instance |
| 64 | 07-real-time-analysis/03-trigger-types.md | 137 | an independent sub-analysis for each attribute | an independent sub-RT analysis for each attribute | Feature sub-instance |
| 65 | 07-real-time-analysis/03-trigger-types.md | 208 | The analysis runs once the silence gap is detected | The RT analysis runs once the silence gap is detected | Feature instance |
| 66 | 07-real-time-analysis/03-trigger-types.md | 226 | the analysis fires | the RT analysis fires | Feature instance |
| 67 | 07-real-time-analysis/03-trigger-types.md | 228 | the analysis at the end of each session | the RT analysis at the end of each session | Feature instance |

### 07-real-time-analysis/04-calculation.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 68 | 07-real-time-analysis/04-calculation.md | 8 | what the analysis computes | what the RT analysis computes | Feature instance |
| 69 | 07-real-time-analysis/04-calculation.md | 61 | in a single analysis | in a single RT analysis | Feature instance |
| 70 | 07-real-time-analysis/04-calculation.md | 65 | the analysis completes its calculation | the RT analysis completes its calculation | Feature instance |

### 07-real-time-analysis/05-generating-events.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 71 | 07-real-time-analysis/05-generating-events.md | 8 | the analysis creates an event | the RT analysis creates an event | Feature instance |
| 72 | 07-real-time-analysis/05-generating-events.md | 24 | events generated by this analysis | events generated by this RT analysis | Feature instance |
| 73 | 07-real-time-analysis/05-generating-events.md | 29 | generated by the same analysis | generated by the same RT analysis | Feature instance |
| 74 | 07-real-time-analysis/05-generating-events.md | 35 | an analysis computes | an RT analysis computes | Feature instance |
| 75 | 07-real-time-analysis/05-generating-events.md | 43 | Events generated by this analysis | Events generated by this RT analysis | Feature instance |
| 76 | 07-real-time-analysis/05-generating-events.md | 45 | Events generated by analyses | Events generated by RT analyses | Feature instances |
| 77 | 07-real-time-analysis/05-generating-events.md | 45 | the analysis name | the analysis name | KEEP — standard UI term |
| 78 | 07-real-time-analysis/05-generating-events.md | 47 | the analysis calculation or output writes | the analysis calculation or output writes | KEEP — borderline, "analysis calculation" refers to the calculation section |

### 07-real-time-analysis/06-ai-analysis.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 79 | 07-real-time-analysis/06-ai-analysis.md | 8 | creating analyses without manually filling in | creating RT analyses without manually filling in | Feature instances |
| 80 | 07-real-time-analysis/06-ai-analysis.md | 12 | the Analyses tab | the RT analysis tab | Tab name |
| 81 | 07-real-time-analysis/06-ai-analysis.md | 12 | above the analysis list | above the RT analysis list | Feature list |
| 82 | 07-real-time-analysis/06-ai-analysis.md | 36 | create the analysis | create the RT analysis | Feature instance |
| 83 | 07-real-time-analysis/06-ai-analysis.md | 49 | generates analysis configurations | generates RT analysis configurations | Feature configurations |

### 07-real-time-analysis/07-analysis-templates.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 84 | 07-real-time-analysis/07-analysis-templates.md | 2 | title: Analysis Templates | title: RT Analysis Templates | Chapter section title |
| 85 | 07-real-time-analysis/07-analysis-templates.md | 3 | sidebar_label: Analysis Templates | sidebar_label: RT Analysis Templates | Sidebar label |
| 86 | 07-real-time-analysis/07-analysis-templates.md | 6 | # 7.7 Analysis Templates | # 7.7 RT Analysis Templates | Section heading |
| 87 | 07-real-time-analysis/07-analysis-templates.md | 8 | An **analysis template** defines a reusable analysis rule | An **RT analysis template** defines a reusable RT analysis rule | Feature template and rule |
| 88 | 07-real-time-analysis/07-analysis-templates.md | 8 | all of its analysis templates | all of its RT analysis templates | Feature templates |
| 89 | 07-real-time-analysis/07-analysis-templates.md | 10 | ## 7.7.1 The Analysis Template Tab | ## 7.7.1 The RT Analysis Template Tab | Section heading |
| 90 | 07-real-time-analysis/07-analysis-templates.md | 12 | The **Analysis Template** tab | The **RT Analysis Template** tab | Tab name |
| 91 | 07-real-time-analysis/07-analysis-templates.md | 12 | defined analysis templates | defined RT analysis templates | Feature templates |
| 92 | 07-real-time-analysis/07-analysis-templates.md | 14 | create analysis templates | create RT analysis templates | Feature templates |
| 93 | 07-real-time-analysis/07-analysis-templates.md | 16 | Describe the analysis | Describe the RT analysis | Feature instance |
| 94 | 07-real-time-analysis/07-analysis-templates.md | 19 | all analysis templates on the element template | all RT analysis templates on the element template | Feature templates |
| 95 | 07-real-time-analysis/07-analysis-templates.md | 23 | an analysis template is shared across many elements | an RT analysis template is shared across many elements | Feature template |
| 96 | 07-real-time-analysis/07-analysis-templates.md | 23 | used in analysis templates | used in RT analysis templates | Feature templates |
| 97 | 07-real-time-analysis/07-analysis-templates.md | 25 | ## 7.7.3 Creating an Analysis Template | ## 7.7.3 Creating an RT Analysis Template | Section heading |
| 98 | 07-real-time-analysis/07-analysis-templates.md | 27 | creating an analysis template | creating an RT analysis template | Feature template creation |
| 99 | 07-real-time-analysis/07-analysis-templates.md | 27 | creating a regular analysis | creating a regular RT analysis | Feature instance |
| 100 | 07-real-time-analysis/07-analysis-templates.md | 30 | the **Analysis Template** tab | the **RT Analysis Template** tab | Tab name |
| 101 | 07-real-time-analysis/07-analysis-templates.md | 31 | describe the analysis | describe the RT analysis | Feature instance |
| 102 | 07-real-time-analysis/07-analysis-templates.md | 32 | Configure the analysis | Configure the RT analysis | Feature instance |
| 103 | 07-real-time-analysis/07-analysis-templates.md | 35 | See [Creating an Analysis](./02-creating-analysis.md) | See [Creating an RT Analysis](./02-creating-analysis.md) | Cross-reference link text |
| 104 | 07-real-time-analysis/07-analysis-templates.md | 39 | The core value of analysis templates | The core value of RT analysis templates | Feature templates |
| 105 | 07-real-time-analysis/07-analysis-templates.md | 39 | the analysis rules defined in the template | the RT analysis rules defined in the template | Feature rules |
| 106 | 07-real-time-analysis/07-analysis-templates.md | 39 | concrete, runnable analyses | concrete, runnable RT analyses | Feature instances |
| 107 | 07-real-time-analysis/07-analysis-templates.md | 43 | Each analysis template is instantiated as a concrete analysis | Each RT analysis template is instantiated as a concrete RT analysis | Feature template + instance |
| 108 | 07-real-time-analysis/07-analysis-templates.md | 45 | The analyses start running | The RT analyses start running | Feature instances |
| 109 | 07-real-time-analysis/07-analysis-templates.md | 47 | additional custom analyses | additional custom RT analyses | Feature instances |

### 07-real-time-analysis/08-actions.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 110 | 07-real-time-analysis/08-actions.md | 8 | an analysis automatically run predefined actions | an RT analysis automatically run predefined actions | Feature instance |
| 111 | 07-real-time-analysis/08-actions.md | 8 | the action rule on the analysis side | the action rule on the RT analysis side | Feature instance |
| 112 | 07-real-time-analysis/08-actions.md | 10 | An analysis on a distribution transformer element | An RT analysis on a distribution transformer element | Feature instance |
| 113 | 07-real-time-analysis/08-actions.md | 25 | action rules to the same analysis | action rules to the same RT analysis | Feature instance |
| 114 | 07-real-time-analysis/08-actions.md | 48 | the current analysis | the current RT analysis | Feature instance |
| 115 | 07-real-time-analysis/08-actions.md | 53 | the same analysis | the same RT analysis | Feature instance |
| 116 | 07-real-time-analysis/08-actions.md | 61 | the analysis is saved | the RT analysis is saved | Feature instance |
| 117 | 07-real-time-analysis/08-actions.md | 65 | the analysis is reopened | the RT analysis is reopened | Feature instance |
| 118 | 07-real-time-analysis/08-actions.md | 65 | the saved analysis | the saved RT analysis | Feature instance |
| 119 | 07-real-time-analysis/08-actions.md | 66 | the analysis can still display | the RT analysis can still display | Feature instance |
| 120 | 07-real-time-analysis/08-actions.md | 70 | the analysis fires | the RT analysis fires | Feature instance |
| 121 | 07-real-time-analysis/08-actions.md | 76 | same analysis ... the analysis's own | same RT analysis ... the RT analysis's own | KEEP — "analysis name" is a standard UI term |
| 122 | 07-real-time-analysis/08-actions.md | 82 | An older analysis has no action configuration | An older RT analysis has no action configuration | Feature instance |
| 123 | 07-real-time-analysis/08-actions.md | 85 | the main analysis flow | the main RT analysis flow | Feature instance |

---

## Chapter 3: Data Modeling

### 03-data-modeling/01-elements.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 124 | 03-data-modeling/01-elements.md | 75 | analysis rules | RT analysis rules | Feature rules |
| 125 | 03-data-modeling/01-elements.md | 82 | Apply configurations, analysis rules, and dashboard | Apply configurations, RT analysis rules, and dashboard | Feature rules |
| 126 | 03-data-modeling/01-elements.md | 109 | real-time analysis rules | real-time analysis rules | KEEP — already qualified by "real-time" |
| 127 | 03-data-modeling/01-elements.md | 179 | its attributes, analyses, panels, and dashboards | its attributes, RT analyses, panels, and dashboards | Feature instances as element components |
| 128 | 03-data-modeling/01-elements.md | 209 | additional custom attributes, analyses, or panels | additional custom attributes, RT analyses, or panels | Feature instances |
| 129 | 03-data-modeling/01-elements.md | 225 | custom attributes, analyses, or panels | custom attributes, RT analyses, or panels | Feature instances |
| 130 | 03-data-modeling/01-elements.md | 239 | **Analysis Template** \| Reusable analysis rules | **RT Analysis Template** \| Reusable RT analysis rules | Tab name and feature rules |
| 131 | 03-data-modeling/01-elements.md | 239 | See [Analysis Templates](../07-real-time-analysis/07-analysis-templates.md) | See [RT Analysis Templates](../07-real-time-analysis/07-analysis-templates.md) | Cross-reference link text |
| 132 | 03-data-modeling/01-elements.md | 248 | **Analysis Template** | **RT Analysis Template** | Tab name |

### 03-data-modeling/07-finding-elements.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 133 | 03-data-modeling/07-finding-elements.md | 32 | Real-time analysis rules defined for this element | Real-time analysis rules defined for this element | KEEP — already qualified by "Real-time" |

---

## Chapter 6: Events

### 06-events/index.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 134 | 06-events/index.md | 20 | analysis rules | RT analysis rules | Feature rules |
| 135 | 06-events/index.md | 25 | Analysis (configured on an element, references the template) | RT Analysis (configured on an element, references the template) | Feature instance in lifecycle diagram |
| 136 | 06-events/index.md | 27 | the analysis condition is met | the RT analysis condition is met | Feature condition |
| 137 | 06-events/index.md | 45 | written by the analysis | written by the RT analysis | Feature instance |
| 138 | 06-events/index.md | 51 | The analysis rule that triggered this event | The RT analysis rule that triggered this event | Feature rule |

### 06-events/01-event-templates.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 139 | 06-events/01-event-templates.md | 8 | generated by an analysis | generated by an RT analysis | Feature instance |
| 140 | 06-events/01-event-templates.md | 8 | across any analysis | across any RT analysis | Feature instance |
| 141 | 06-events/01-event-templates.md | 12 | referenced by any analysis | referenced by any RT analysis | Feature instance |
| 142 | 06-events/01-event-templates.md | 37 | events from the same analysis | events from the same RT analysis | Feature instance |
| 143 | 06-events/01-event-templates.md | 37 | when an analysis fires events | when an RT analysis fires events | Feature instance |
| 144 | 06-events/01-event-templates.md | 47 | Name of the analysis that triggered the event | Name of the RT analysis that triggered the event | Feature instance |
| 145 | 06-events/01-event-templates.md | 60 | configuring an analysis | configuring an RT analysis | Feature instance |
| 146 | 06-events/01-event-templates.md | 73 | if the analysis does not write | if the RT analysis does not write | Feature instance |
| 147 | 06-events/01-event-templates.md | 77 | When configuring an analysis | When configuring an RT analysis | Feature instance |
| 148 | 06-events/01-event-templates.md | 87 | no analyses reference it | no RT analyses reference it | Feature instances |

### 06-events/02-child-events.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 149 | 06-events/02-child-events.md | 31 | the analysis configuration page | the RT analysis configuration page | Feature configuration |

### 06-events/04-event-detail.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 150 | 06-events/04-event-detail.md | 39 | the analysis condition that fired | the RT analysis condition that fired | Feature condition |
| 151 | 06-events/04-event-detail.md | 43 | the element involved in the analysis | the element involved in the RT analysis | Feature instance |
| 152 | 06-events/04-event-detail.md | 44 | The analysis rule that generated this event | The RT analysis rule that generated this event | Feature rule |
| 153 | 06-events/04-event-detail.md | 55 | the analysis captured | the RT analysis captured | Feature instance |
| 154 | 06-events/04-event-detail.md | 55 | populated by the analysis that triggered the event | populated by the RT analysis that triggered the event | Feature instance |
| 155 | 06-events/04-event-detail.md | 67 | the analysis window | the RT analysis window | Feature window |
| 156 | 06-events/04-event-detail.md | 67 | the analysis writes back | the RT analysis writes back | Feature instance |

### 06-events/08-root-cause-analysis.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 157 | 06-events/08-root-cause-analysis.md | 37 | analysis rules | RT analysis rules | Feature rules |

---

## Chapter 8: AI-Powered Insights

### 08-ai-powered-insights/index.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 158 | 08-ai-powered-insights/index.md | 14 | suggested relevant analyses | suggested relevant RT analyses | Feature instances |
| 159 | 08-ai-powered-insights/index.md | 16 | an analysis in plain language | an RT analysis in plain language | Feature instance |
| 160 | 08-ai-powered-insights/index.md | 18 | configure analyses | configure RT analyses | Feature instances |
| 161 | 08-ai-powered-insights/index.md | 33 | on the element Analyses tab | on the element RT analysis tab | Tab name |

### 08-ai-powered-insights/04-ai-generated-analyses.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 162 | 08-ai-powered-insights/04-ai-generated-analyses.md | 8 | the barrier to analysis creation | the barrier to RT analysis creation | Feature creation action |
| 163 | 08-ai-powered-insights/04-ai-generated-analyses.md | 12 | the **Analyses** tab | the **RT analysis** tab | Tab name |
| 164 | 08-ai-powered-insights/04-ai-generated-analyses.md | 30 | create the analysis | create the RT analysis | Feature instance |
| 165 | 08-ai-powered-insights/04-ai-generated-analyses.md | 30 | the analysis starts running | the RT analysis starts running | Feature instance |

### 08-ai-powered-insights/07-anomaly-detection.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 166 | 08-ai-powered-insights/07-anomaly-detection.md | 16 | When an analysis is configured | When an RT analysis is configured | Feature instance |
| 167 | 08-ai-powered-insights/07-anomaly-detection.md | 16 | The analysis fires | The RT analysis fires | Feature instance |
| 168 | 08-ai-powered-insights/07-anomaly-detection.md | 24 | element's **Analyses** tab | element's **RT analysis** tab | Tab name |
| 169 | 08-ai-powered-insights/07-anomaly-detection.md | 24 | create a new analysis | create a new RT analysis | Feature creation |
| 170 | 08-ai-powered-insights/07-anomaly-detection.md | 53 | the analysis fires | the RT analysis fires | Feature instance |

---

## Chapter 1: Introduction

### 01-introduction.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 171 | 01-introduction.md | 74 | analysis configurations | RT analysis configurations | Feature configurations |
| 172 | 01-introduction.md | 101 | analysis logic | RT analysis logic | Feature logic |
| 173 | 01-introduction.md | 115 | attributes, analyses, panels, and dashboards | attributes, RT analyses, panels, and dashboards | Feature instances |
| 174 | 01-introduction.md | 129 | analyses, AI queries | RT analyses, AI queries | Feature instances |
| 175 | 01-introduction.md | 135 | relevant analyses and insights | relevant RT analyses and insights | Feature instances |
| 176 | 01-introduction.md | 141 | When an analysis detects a condition | When an RT analysis detects a condition | Feature instance |
| 177 | 01-introduction.md | 171 | each element, attribute, analysis, panel, or dashboard | each element, attribute, RT analysis, panel, or dashboard | Feature as standalone concept |
| 178 | 01-introduction.md | 173 | analysis templates capture standard detection logic | RT analysis templates capture standard detection logic | Feature templates |

---

## Chapter 2: Get Started

### 02-get-started/04-experiencing-idmp.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 179 | 02-get-started/04-experiencing-idmp.md | 84 | select **Analyses** | select **RT Analysis** | Tab name |
| 180 | 02-get-started/04-experiencing-idmp.md | 86 | describe an analysis in natural language | describe an RT analysis in natural language | Feature instance |
| 181 | 02-get-started/04-experiencing-idmp.md | 90 | generate the analysis | generate the RT analysis | Feature instance |
| 182 | 02-get-started/04-experiencing-idmp.md | 96 | AI-generated panels and analyses | AI-generated panels and RT analyses | Feature instances |

---

## Chapter 0: Index/Reading Guide

### 00-index.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 183 | 00-index.md | 15 | creating and configuring panels and analyses | creating and configuring panels and RT analyses | Feature instances |
| 184 | 00-index.md | 17 | configure analysis rules | configure RT analysis rules | Feature rules |
| 185 | 00-index.md | 17 | your visualizations, analyses, and AI insights | your visualizations, RT analyses, and AI insights | Feature instances |

---

## Chapter 13: Libraries

### 13-libraries/02-categories.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 186 | 13-libraries/02-categories.md | 8 | dashboard, panel, or analysis can be tagged | dashboard, panel, or RT analysis can be tagged | Feature as object type |
| 187 | 13-libraries/02-categories.md | 37 | panel, dashboard, or analysis | panel, dashboard, or RT analysis | Feature as object type |

### 13-libraries/04-action-templates.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 188 | 13-libraries/04-action-templates.md | 49 | sent by the same analysis | sent by the same RT analysis | Feature instance |
| 189 | 13-libraries/04-action-templates.md | 51 | the analysis's element | the RT analysis's element | Feature instance |
| 190 | 13-libraries/04-action-templates.md | 57 | the analysis's element ... the current analysis run | the RT analysis's element ... the current RT analysis run | Feature instance |
| 191 | 13-libraries/04-action-templates.md | 63 | The name of the triggering analysis | The name of the triggering RT analysis | Feature instance |
| 192 | 13-libraries/04-action-templates.md | 83 | An analysis's **trigger condition** ... the analysis-side configuration | An RT analysis's **trigger condition** ... the RT analysis-side configuration | Feature instance |
| 193 | 13-libraries/04-action-templates.md | 90 | any analysis currently references it | any RT analysis currently references it | Feature instance |
| 194 | 13-libraries/04-action-templates.md | 90 | names of the referencing analyses ... the relevant analyses | names of the referencing RT analyses ... the relevant RT analyses | Feature instances |
| 195 | 13-libraries/04-action-templates.md | 94 | the current analysis | the current RT analysis | Feature instance |

---

## Chapter 15: Integrating with Other Systems

### 15-integrating-with-other-systems/02-mcp-interface.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 196 | 15-integrating-with-other-systems/02-mcp-interface.md | 190 | Analyses \| Read, create, pause, resume, and delete analyses | RT Analyses \| Read, create, pause, resume, and delete RT analyses | Feature category in MCP table |
| 197 | 15-integrating-with-other-systems/02-mcp-interface.md | 205 | creating an analysis | creating an RT analysis | Feature creation |
| 198 | 15-integrating-with-other-systems/02-mcp-interface.md | 213 | analysis results | RT analysis results | Feature results |
| 199 | 15-integrating-with-other-systems/02-mcp-interface.md | 245 | element, analysis, panel, or notification rule | element, RT analysis, panel, or notification rule | Feature as permission target |

### 15-integrating-with-other-systems/04-idmp-cli.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 200 | 15-integrating-with-other-systems/04-idmp-cli.md | 237 | element, analysis, panel, data import/export | element, RT analysis, panel, data import/export | Feature category |

### 15-integrating-with-other-systems/01-client-sdk/04-core-concepts.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 201 | 15-integrating-with-other-systems/01-client-sdk/04-core-concepts.md | 18 | triggered by analysis rules | triggered by RT analysis rules | Feature rules |

---

## Chapter 19: Glossary

### 19-glossary/index.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 202 | 19-glossary/index.md | 20 | relevant analyses and insights | relevant RT analyses and insights | Feature instances |
| 203 | 19-glossary/index.md | 52 | attributes, analyses, panels, and dashboards | attributes, RT analyses, panels, and dashboards | Feature instances |
| 204 | 19-glossary/index.md | 64 | analysis configurations | RT analysis configurations | Feature configurations |
| 205 | 19-glossary/index.md | 68 | relevant panels and analyses | relevant panels and RT analyses | Feature instances |
| 206 | 19-glossary/index.md | 72 | AI-generated dashboards and analyses | AI-generated dashboards and RT analyses | Feature instances |
| 207 | 19-glossary/index.md | 144 | analysis, panel, dashboard, event, and notification templates | RT analysis, panel, dashboard, event, and notification templates | Feature as template-level concept |

---

## Chapter 21: Release History

### 21-release-history/1.0.16.0.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 208 | 21-release-history/1.0.16.0.md | 38 | converting an analysis to an analysis template, the original analysis is deleted | converting an RT analysis to an RT analysis template, the original RT analysis is deleted | Feature instance + template |
| 209 | 21-release-history/1.0.16.0.md | 45 | search functionality to analysis | search functionality to RT analysis | Feature instance |

### 21-release-history/1.0.19.0.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 210 | 21-release-history/1.0.19.0.md | 56 | add analysis from analysis template to element's analysis panel | add RT analysis from RT analysis template to element's analysis panel | Feature instance + template |

### 21-release-history/1.0.14.0.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 211 | 21-release-history/1.0.14.0.md | 82 | converting intermediate node analyses to analysis templates | converting intermediate node RT analyses to RT analysis templates | Feature instances + templates |
| 212 | 21-release-history/1.0.14.0.md | 86 | copying analysis templates | copying RT analysis templates | Feature templates |

### 21-release-history/1.0.17.0.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 213 | 21-release-history/1.0.17.0.md | 12 | generate analysis results | generate RT analysis results | Feature results |
| 214 | 21-release-history/1.0.17.0.md | 70 | creating analysis for intermediate nodes | creating RT analysis for intermediate nodes | Feature creation |
| 215 | 21-release-history/1.0.17.0.md | 80 | after analysis | after RT analysis | Feature instance |

### 21-release-history/1.0.15.0.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 216 | 21-release-history/1.0.15.0.md | 70 | After creating an analysis | After creating an RT analysis | Feature creation |

### 21-release-history/1.0.18.0.md
| ID | File (relative) | Line | Original | Replacement | Reasoning |
|----|----------------|------|----------|-------------|-----------|
| 217 | 21-release-history/1.0.18.0.md | 108 | saving analysis as template | saving RT analysis as template | Feature instance |
| 218 | 21-release-history/1.0.18.0.md | 125 | ai chat analysis | AI chat analysis | KEEP — AI qualifies it |

---

## Summary Statistics
- **Total changes**: ~218 entries
- **Files modified**: ~30 files across 10 chapters
- **Chapter 7 (Real-Time Analysis)** accounts for approximately 55% of changes
- **Key patterns changed**: Analysis tab, analysis template, analysis rule, analysis list, creating an analysis, analysis configuration
- **Patterns kept**: Analysis form, Analysis name, Analysis expression, Analysis chart, Analysis panel, AI-assisted analysis, anomaly detection analysis, named analytical techniques
