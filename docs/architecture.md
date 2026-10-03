# Architecture

## Product primitives

### Story Graph
`Event → Explanation → System → History → Timeline → People/Institutions → Evidence → Claims → Verification → Implications → What Next`

### Evidence Graph
`Source → Evidence → Claim → Story → Section → Edition`

### Structured story blocks

Headline, dek, summary, body sections, timeline, chart, glossary, evidence card, source card, key numbers and related stories are structured independently from the final renderer. The page budget is a presentation constraint, not the canonical source model.

## Runtime

Edition 001 uses a dependency-light static frontend plus a zero-dependency Node local server. This is intentional for the MVP: easy localhost operation, no vendor lock-in, and a codebase that can later be moved to a richer publication platform.

## Long-term pipeline

`DISCOVER → INGEST → NORMALIZE → CLUSTER → RANK → RESEARCH → PRIMARY-SOURCE CHECK → STORY GRAPH → CLAIM/EVIDENCE GRAPH → WRITE → QA → HUMAN SIGN-OFF → TRANSLATE → FINAL QA → EDITION → ARCHIVE`
