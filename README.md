# Daily Knowledge

> **Don't publish news. Publish understanding of the news.**

Daily Knowledge is a local-first newspaper-style publication concept. It turns important news into structured understanding: what happened, how the underlying system works, how we got here, what is verified, what is claimed, what remains unknown, and what happens next.

## What is in this repository

- `index.html` — the newspaper-style localhost edition surface.
- `styles.css` — tabloid/broadsheet-inspired visual system with responsive and print layouts.
- `app.js` — source desk, claim filters, paper view and reader view.
- `data/edition-001.json` — structured source/QA metadata for Edition 001.
- `editorial-policy/` — publication constitution and verification policy.
- `docs/` — architecture and operating notes.
- `editions/001/` — reserved for durable edition-specific artifacts.
- `tests/` — smoke validation for the public repository.

## Run locally

Requires Node.js 18+.

```bash
npm test
npm start
```

Then open `http://localhost:4173`.

The browser edition is deliberately local-first for the MVP. GitHub is the public engineering/archive repository, not the publication surface.

## Editorial model

The pipeline is designed around a Story Graph, Claim Ledger and Evidence Graph:

`DISCOVER → INGEST → NORMALIZE → CLUSTER → RANK → RESEARCH → PRIMARY-SOURCE CHECK → STORY GRAPH → CLAIM/EVIDENCE GRAPH → WRITE → QA → HUMAN SIGN-OFF → TRANSLATE → FINAL QA → EDITION → ARCHIVE`

AI is a processor, not an authority.

### Claim statuses

- `VERIFIED_FACT`
- `ATTRIBUTED_CLAIM`
- `DISPUTED`
- `ANALYSIS`
- `UNKNOWN`
- `DEVELOPING`

### Source tiers

1. Primary records: courts, regulators, government, parliament, filings, datasets, transcripts, original research.
2. Established reporting: reputable national, regional or international newsrooms.
3. Specialist sources: academic, industry, expert and think-tank material.
4. Discovery: social, forums, newsletters, tips. Leads only; not proof.

## Edition 001 status

Edition 001 is an archival snapshot dated **2 October 2026**. It is marked **READY FOR HUMAN REVIEW**, not published.

Human-only tasks remain before a live public edition: logged-out source verification, direct review of every Tier 2 article, adversarial read, adjective audit, final correction pass, publication timestamp and a public publication URL.

## Licensing

Code is licensed under MIT in `LICENSE-CODE`. Editorial content in this repository is **not** automatically licensed under MIT; see `CONTENT-LICENSE.md`.
