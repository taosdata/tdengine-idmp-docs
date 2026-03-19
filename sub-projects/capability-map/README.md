# Capability Map

A structured inventory of all TDengine IDMP capabilities, extracted from the English documentation via AI-assisted extraction with human-curated taxonomy.

## Data Flow

```
Docs (source of truth, in-scope files only)
    ↓  parse.py (no AI — splits into sections, deletes stale extraction.yaml)
.sections/ (one directory per section: section.md + meta.yaml, git-ignored)
    ↓  prepare.py (no AI — reports extraction status, writes prompt)
    ↓  AI agent (manual — e.g., Claude Code)
.sections/*/extraction.yaml (one per section, written by AI agent)
    ↓  merge.py (no AI — collects & merges into section map)
capabilities.section-map.yaml  +  capabilities.taxonomy.yaml
    =  complete source of truth, consumed directly by reports and web apps
```

## Setup

```bash
cd sub-projects/capability-map
python3 -m venv .venv
source .venv/bin/activate
pip install -r scripts/requirements.txt
```

## Docs

**Guides**
- [Running the Pipeline](guides/running-the-pipeline.md) — operator workflows and script reference
- [Taxonomy Curation](guides/taxonomy-curation.md) — decision tree, unmatched capabilities, versioning

**Architecture**
- [Scope Policy](architecture/scope.md) — which chapters are parsed and what counts as a capability
- [Data Contracts](architecture/data-contracts.md) — YAML schemas, enums, consumer join algorithm
- [Design Decisions](architecture/design-decisions.md) — why the pipeline is built the way it is
