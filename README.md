# Daily Knowledge

> Don't publish news. Publish understanding of the news.

Daily Knowledge is a local-first newspaper-style publication built around evidence, systems, history and explanation.

## Current MVP

Edition 001 is now a **25-page continuous newsroom edition** dated 2 October 2026.

The browser is deliberately continuous—not a PDF viewer. Print CSS can turn the same content into newspaper-sized pages when needed.

### Editorial coverage

1. Front page + India institutional deep dive
2. World
3. Europe / geopolitics
4. United States
5. Asia
6. India
7. Global markets
8. U.S. markets
9. Asia markets
10. India markets
11. Economy
12. Central banks / rates
13. Business
14. Technology / AI / chips / cyber
15. Crypto
16. Energy & commodities
17. Science / health / consumer
18. Emerging markets / week ahead

## Run locally

Node.js 18+:

```bash
npm test
npm start
```

Open `http://localhost:4173`.

## Product doctrine

**Don't publish news. Publish understanding of the news.**

The editorial pipeline is:

`DISCOVER → INGEST → NORMALIZE → CLUSTER → RANK → RESEARCH → PRIMARY-SOURCE CHECK → STORY GRAPH → CLAIM/EVIDENCE GRAPH → WRITE → QA → HUMAN SIGN-OFF → TRANSLATE → FINAL QA → EDITION → ARCHIVE`

AI is a processor, not authority.

The story graph connects event, explanation, system, history, timeline, people/institutions, evidence, claims, verification, implications and what happens next.

## Evidence model

Claim statuses:

- VERIFIED_FACT
- ATTRIBUTED_CLAIM
- DISPUTED
- ANALYSIS
- UNKNOWN
- DEVELOPING

Source tiers:

- Tier 1 — primary records
- Tier 2 — established reporting
- Tier 3 — specialist sources
- Tier 4 — discovery leads only

Evidence stays attached to stories in the interface. There is deliberately **no standalone “Where every material claim points” page**.

## Edition 001 status

**READY FOR HUMAN REVIEW**

This is an archival 2 October 2026 snapshot, not a live published edition. Human review still includes direct logged-out source verification, Tier 2 article review, adversarial review, adjective audit and final publication sign-off.

GitHub is the public engineering/archive repository. Localhost is the current publication surface.

## Licensing

Code is MIT via `LICENSE-CODE`. Editorial content is separate; see `CONTENT-LICENSE.md`.
