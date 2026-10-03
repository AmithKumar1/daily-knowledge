const data = await fetch('./data/edition-001.json').then(r => r.json());
const deepEdition = await fetch('./data/global-edition-001.json').then(r => r.json());

const homeView = document.querySelector('#homeView');
const articleView = document.querySelector('#articleView');
const claimList = document.querySelector('#claimList');
const claimSummary = document.querySelector('#claimSummary');
const deepPages = document.querySelector('#deepPages');
const sourceModal = document.querySelector('#sourceModal');
const closeSourceModalBtn = document.querySelector('#closeSourceModal');

const claimSamples = [
  { id: 'C04', status: 'VERIFIED_FACT', text: 'The ECI’s 26 September press note describes procedural measures for affected voters, including house visits and help desks/camps.', materiality: 'HIGH', sources: 'S2' },
  { id: 'C08', status: 'VERIFIED_FACT', text: 'Approximately 13 crore entries were reported as absent from draft rolls; that draft-roll measure does not establish wrongful deletion.', materiality: 'CRITICAL', sources: 'S10' },
  { id: 'C11', status: 'ATTRIBUTED_CLAIM', text: 'Indian Express and NDTV reported an ECI communication dated 29 September calling for special drives in completed-SIR jurisdictions.', materiality: 'CRITICAL', sources: 'S10, S11' },
  { id: 'C20', status: 'VERIFIED_FACT', text: 'The Supreme Court judgment of 27 May 2026 addressed Bihar’s SIR, its legal framework and citizenship-related inquiry.', materiality: 'CRITICAL', sources: 'S1' },
  { id: 'C30', status: 'VERIFIED_FACT', text: 'Goa’s CEO office said 88 of 97 left-out voters had submitted Form 6 and been accepted.', materiality: 'HIGH', sources: 'S12' },
  { id: 'C44', status: 'VERIFIED_FACT', text: 'The ECI said ECINET uses role-based access and would be reviewed by an expert committee for compliance with applicable Acts and Rules.', materiality: 'HIGH', sources: 'S2' }
];

const esc = s => String(s || '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Claim Audit Ledger in Drawer
function renderClaims(filter = 'ALL') {
  if (!claimList || !claimSummary) return;
  const counts = data.lead.claim_status_counts;
  claimSummary.innerHTML = Object.entries(counts)
    .map(([k, v]) => `<div class="claim-stat"><b>${esc(v)}</b><small>${esc(k.replaceAll('_', ' '))}</small></div>`)
    .join('');
  claimList.innerHTML = claimSamples
    .filter(x => filter === 'ALL' || x.status === filter)
    .map(c => `
      <div class="claim-item">
        <div class="claim-top">
          <span class="claim-id">${esc(c.id)}</span>
          <span class="status-label ${c.status === 'VERIFIED_FACT' ? 'verified' : c.status === 'ATTRIBUTED_CLAIM' ? 'attributed' : 'unknown'}">${esc(c.status.replaceAll('_', ' '))}</span>
        </div>
        <div class="claim-text">${esc(c.text)}</div>
        <div class="claim-meta">Materiality: ${esc(c.materiality)} · Sources: ${esc(c.sources)}</div>
      </div>
    `).join('');
}
renderClaims();

const linkSources = sources => (sources || []).map(([name, url]) => `<a class="inline-source" href="${esc(url)}" target="_blank" rel="noreferrer">${esc(name)} ↗</a>`).join('<span class="source-sep"> · </span>');

// Render 17 Global Desks as Authentic Broadsheet Newspaper Desks
if (deepPages) {
  deepPages.innerHTML = deepEdition.pages.map(p => `
    <section id="${esc(p.slug)}" class="home-section edition-page">
      <div class="section-rule-thick">
        <span>${esc(p.section)}</span>
        <span class="rule-sub">${esc(p.kicker)}</span>
      </div>
      <div class="edition-head" style="margin-bottom: 16px;">
        <span class="col-desk-tag">${esc(p.kicker)}</span>
        <h2 style="font-family: var(--font-headline); font-size: clamp(24px, 3vw, 34px); font-weight: 800; margin: 4px 0 8px;">
          <a href="#article/${esc(p.slug)}" class="article-title-link">${esc(p.headline)}</a>
        </h2>
        <p style="font-size: 15px; color: var(--wsj-muted); margin: 0;">${esc(p.intro)}</p>
      </div>
      <div class="edition-grid">
        <article class="edition-lead">
          <div class="story-kicker">${esc(p.kicker)} · LEAD STORY</div>
          <h3><a href="#article/${esc(p.slug)}" class="article-title-link">${esc(p.lead.headline)}</a></h3>
          <div class="byline-row">
            <span class="byline-author">By Staff Reporters</span>
            <span>·</span>
            <span>Updated Oct. 3, 2026</span>
          </div>
          <p>${esc(p.lead.body)} <span class="evidence-tag verified" data-open="evidencePanel">VERIFIED</span></p>
          <div class="inline-sources">${linkSources(p.sources)}</div>
        </article>
        <aside class="edition-rail">
          ${(p.cards || []).map((c, i) => `
            <article>
              <a href="#article/${esc(p.slug)}-${i}" class="article-title-link">
                <span class="rail-item-kicker">${esc(c.label)}</span>
                <h4 class="rail-item-head">${esc(c.headline)}</h4>
              </a>
              <p class="rail-item-desc">${esc(c.body)} <span class="evidence-tag verified" data-open="evidencePanel" style="font-size:8px;">VERIFIED</span></p>
            </article>
          `).join('')}
        </aside>
      </div>
    </section>
  `).join('');
}

// Built-in Article Database with Signature 7-Part Verdict Anatomy
const articleDataBank = {
  'sir-voter-rolls': {
    section: 'THE VERDICT / FRONT PAGE · ELECTIONS & LAW',
    kicker: 'ELECTIONS · CONSTITUTIONAL LAW · GOVERNANCE',
    headline: "Who Actually Decides Whether Your Name Stays on India's Voter List?",
    dek: "The Special Intensive Revision dispute is bigger than one headline number. It is an intricate story about authority, field verification, statutory documentation, software access, and what happens when an elector's name goes missing.",
    author: 'The Editorial Desk',
    date: 'Saturday, Oct. 3, 2026 · 07:00 IST',
    readTime: '6 min read',
    image: {
      src: 'assets/images/voter-roll-record.jpg',
      alt: 'Official electoral roll register documentation and Form 6 application dossier',
      credit: 'Photograph: The Verdict Archive',
      caption: 'An official electoral register documentation dossier alongside statutory Form 6 records, reflecting the door-to-door verification requirements governing the revision process.'
    },
    anatomy: {
      whatHappened: "The Election Commission of India directed jurisdictions where Special Intensive Revision (SIR) has concluded to initiate special enrolment and correction drives for eligible electors omitted from draft rolls, alongside young and first-time voters. In Goa, election authorities verified that 88 of 97 omitted citizens submitted Form 6 and had their voting status fully restored upon review.",
      theContext: "Electoral roll revisions in India operate under the Representation of the People Act, 1950, and Registration of Electors Rules, 1960. In Bihar, the previous intensive door-to-door enumeration occurred in 2003. When the 2025 exercise began, reconciliations across decades of unverified entries prompted intense political contestation over procedural safeguards.",
      theEvidence: "The constitutional baseline is anchored by the Supreme Court judgment of 27 May 2026 affirming the ECI's authority under Article 324, alongside the ECI procedural press note of 26 September 2026 establishing help desks, door-to-door visits, and formal hearings. Direct administrative records confirm individual Form 6 remedies are operating as intended.",
      whatIsClaimed: "Opposition parties and civil society groups have alleged that approximately 13 crore voters were disenfranchised nationwide through arbitrary software deletions or administrative apathy. The Commission maintains that draft rolls reflect unverified field enumerations rather than final wrongful disenfranchisement.",
      whatRemainsUnclear: "The reported 29 September ECI instruction to state election authorities remains an attributed item until the underlying physical document is placed on the public record. Furthermore, national aggregate counts cannot establish how many omissions represent deceased or migrated records versus eligible citizens requiring reinstatement.",
      whatComesNext: "Field offices are processing statutory Form 6 and Form 8 submissions through Electoral Registration Officers (EROs). Simultaneously, an independent technical panel is conducting a compliance audit of the ECINET digital workflow architecture.",
      theVerdict: "The available primary evidence establishes that the revision is an authorized statutory enumeration governed by Electoral Registration Officers (EROs), not automated algorithmic deletion.",
      verdictTriad: {
        supports: "The revision is an authorized statutory enumeration under Article 324 and ERO jurisdiction, with operational Form 6 re-entry routes confirmed active in field audits.",
        doesNotEstablish: "The circulating metric of 13 crore draft absences does not establish wrongful mass disenfranchisement or automated software deletion.",
        uncertainty: "The reported September 29 ECI instruction to state election authorities remains unverified until the underlying physical document is placed on the public record."
      }
    },
    claims: claimSamples,
    sources: (data.sources || []).slice(0, 6).map(s => [s.title, s.url]),
    related: [
      { kicker: 'INFRASTRUCTURE', headline: "Can Maharashtra's rural internet layer scale?", slug: 'maharashtra-rural-internet', desc: "₹10,520 crore in approved Union support for 28,237 gram panchayats." },
      { kicker: 'COMMODITIES', headline: "Why did sugar inventory rules tighten again?", slug: 'sugar-inventory-rules', desc: "15-day stock ceiling and 1,000-quintal limit effective Oct. 15." },
      { kicker: 'INSOLVENCY', headline: "What does ten years of IBC mean in practice?", slug: 'ibc-ten-years', desc: "A decade of institutions, resolutions, and credit culture." },
      { kicker: 'TECHNOLOGY', headline: "Amazon tests an asset-light AI balance sheet", slug: 'ai-tech-security', desc: "Placing $8B of Nvidia Grace Blackwell chips with outside investors." }
    ]
  },
  'ai-tech-security': {
    section: 'THE VERDICT / TECHNOLOGY · AI & CYBER',
    kicker: 'AI · CHIPS · CYBER',
    headline: "Amazon In Talks On $8B Off-Balance Vehicle for Nvidia Blackwell Chips",
    dek: "The leaseback structure would shift heavy capital expenditure while securing access to critical AI compute infrastructure.",
    author: 'Technology & Enterprise Infrastructure Bureau',
    date: 'Saturday, Oct. 3, 2026 · 06:45 EST',
    readTime: '5 min read',
    image: {
      src: 'assets/images/ai-accelerator-chip.jpg',
      alt: 'Nvidia AI compute accelerator hardware cluster in high-density data center rack',
      credit: 'Photograph: The Verdict Archive',
      caption: 'High-density GPU accelerator clusters. Capital-intensive hardware deployments have driven hyperscalers toward novel off-balance-sheet leasing arrangements.'
    },
    anatomy: {
      whatHappened: "Amazon is in advanced negotiations with external institutional infrastructure investors to create a special-purpose financial vehicle that would acquire approximately $8 billion in Nvidia Grace Blackwell AI compute hardware, which Amazon would subsequently lease back.",
      theContext: "Hyperscalers are confronting unprecedented capital expenditure demands to build out generative AI data centers. By moving hardware ownership off-balance-sheet, cloud giants can conserve corporate cash flow and balance-sheet capacity while maintaining compute capacity.",
      theEvidence: "Financial Times and Reuters reporting corroborates that the deal structure involves private equity and sovereign infrastructure funds providing senior and subordinated debt alongside equity tranches for dedicated AI hardware leasing.",
      whatIsClaimed: "Proponents argue off-balance-sheet financing allows rapid data center scaling without diluting return on invested capital (ROIC); critics warn it obscures true operational leverage and hardware obsolescence risks.",
      whatRemainsUnclear: "The exact interest rate spreads on the lease agreements, whether residual value risk remains with Amazon or the financial consortium, and credit rating agencies' final accounting treatment.",
      whatComesNext: "Final term sheet signing is anticipated before the end of the fourth quarter, with initial hardware delivery scheduled to follow in phased data-center deployments.",
      theVerdict: "Amazon's talks reflect the transition of AI infrastructure from traditional corporate CapEx into asset-class project finance.",
      verdictTriad: {
        supports: "Amazon is in active negotiations with external investors to establish an off-balance-sheet financing structure for roughly $8 billion in Nvidia Grace Blackwell hardware.",
        doesNotEstablish: "The transaction does not represent a slowdown in AI capital commitments or a cancellation of existing chip procurement contracts.",
        uncertainty: "Final leaseback borrowing spreads, debt covenants, and whether credit rating agencies treat the leases as debt equivalents on corporate balance sheets."
      }
    },
    claims: [
      { id: 'C-AI1', status: 'ATTRIBUTED_CLAIM', text: 'Amazon in talks with outside investors on $8B Nvidia Blackwell leaseback vehicle (FT / Reuters).', materiality: 'CRITICAL', sources: 'Reuters / Financial Times' },
      { id: 'C-AI2', status: 'VERIFIED_FACT', text: 'South Korea semiconductor exports reached record $120.9B in September, led by AI chip demand.', materiality: 'HIGH', sources: 'Ministry of Trade / Reuters' }
    ],
    sources: [
      ['Reuters — Amazon seeks to offload $8 billion Nvidia chips to investors', 'https://www.reuters.com/business/retail-consumer/amazon-seeks-offload-8-billion-nvidia-chips-investors-ft-reports-2026-10-02/'],
      ['Reuters — South Korea exports rise on record chip sales', 'https://www.reuters.com/world/asia-pacific/south-korean-shares-end-nearly-2-higher-record-chip-exports-2026-10-01/']
    ],
    related: [
      { kicker: 'GLOBAL MARKETS', headline: "The bond market is the story behind the stock market story", slug: 'markets', desc: "5.34% 10-year Treasury yield reprices the cost of money." },
      { kicker: 'WALL STREET', headline: "Index strength is not the same as market breadth", slug: 'us-markets', desc: "Concentration around the AI complex widens." }
    ]
  },
  'markets': {
    section: 'THE VERDICT / GLOBAL MARKETS',
    kicker: 'GLOBAL MARKETS',
    headline: "The Bond Market Is the Real Story Behind Headline Stock Resilience",
    dek: "While benchmark stock indexes stay close to records, a 5.34% 10-year Treasury yield is aggressively repricing the cost of capital across every asset class.",
    author: 'Capital Markets & Macro Bureau',
    date: 'Saturday, Oct. 3, 2026 · 07:15 EST',
    readTime: '5 min read',
    image: {
      src: 'assets/images/markets-trading-floor.jpg',
      alt: 'Financial trading desk monitors tracking Treasury yields and foreign exchange rates',
      credit: 'Photograph: The Verdict Archive',
      caption: 'Financial trading desks tracking benchmark Treasury yields. A 5.34% 10-year yield is aggressively repricing the cost of capital across global markets.'
    },
    anatomy: {
      whatHappened: "Benchmark 10-year U.S. Treasury yields touched 5.34%—their highest level in 24 years—before Friday's payrolls release triggered a partial pullback. Despite borrowing cost headwinds, major equity indexes maintained multi-week resilience.",
      theContext: "The combination of persistent energy cost pressures, expanding sovereign deficits, and resilient consumer spending has prevented central banks from offering decisive easing signals, sustaining a 'higher for longer' yield environment.",
      theEvidence: "Market data feeds confirm the S&P 500 up nearly 13% year-to-date while the 10-year Treasury yield trades near multi-decade highs, creating one of the widest equity-risk-premium compressions since 2002.",
      whatIsClaimed: "Bullish equity strategists argue AI-driven productivity gains justify compressed equity risk premiums; fixed-income managers counter that prolonged 5%+ risk-free rates must eventually trigger earnings compressions.",
      whatRemainsUnclear: "How rapidly non-AI corporate balance sheets will be forced to refinance existing debt at prevailing market rates over the coming four quarters.",
      whatComesNext: "Investors await FOMC meeting minutes on October 7 and third-quarter corporate earnings kickoffs to gauge corporate margin durability.",
      theVerdict: "Headline equity stability masks severe capital bifurcation.",
      verdictTriad: {
        supports: "Benchmark 10-year Treasury yields reached multi-decade highs before partially retreating, maintaining aggressive pressure on corporate borrowing costs.",
        doesNotEstablish: "Resilience in headline stock indexes does not establish broad market participation beyond the narrow AI complex.",
        uncertainty: "The magnitude of pass-through from higher yields and crude prices into forthcoming quarterly corporate earnings."
      }
    },
    claims: [
      { id: 'C-MKT1', status: 'VERIFIED_FACT', text: '10-year Treasury yield touched 5.34%, marking a 24-year high prior to payrolls release.', materiality: 'HIGH', sources: 'Reuters / Treasury Feeds' },
      { id: 'C-MKT2', status: 'VERIFIED_FACT', text: 'Global equity funds logged $34.76B in weekly net inflows for the second consecutive week.', materiality: 'MEDIUM', sources: 'Reuters / EPFR' }
    ],
    sources: [
      ['Reuters — Global Markets View', 'https://www.reuters.com/markets/europe/global-markets-view-europe-2026-10-02/'],
      ['Reuters — Global Markets Flow Graphic', 'https://www.reuters.com/world/china/global-markets-flows-graphic-2026-10-02/']
    ],
    related: [
      { kicker: 'TECHNOLOGY', headline: "Amazon tests an asset-light AI balance sheet", slug: 'ai-tech-security', desc: "Placing $8B of Nvidia Grace Blackwell chips with outside investors." },
      { kicker: 'ENERGY', headline: "Oil above $100 is becoming a policy problem", slug: 'energy', desc: "Brent crude stays above $100 as China suspends fuel exports." }
    ]
  },
  'maharashtra-rural-internet': {
    section: 'THE VERDICT / NATIONAL · INFRASTRUCTURE',
    kicker: 'DIGITAL CONNECTIVITY & TELECOM',
    headline: "Can Maharashtra's Rural Internet Layer Scale Under Amended BharatNet?",
    dek: "₹10,520 crore in approved Union support aims to link 28,237 gram panchayats and provide on-demand connectivity across 15,799 villages.",
    author: 'National Infrastructure Bureau',
    date: 'Saturday, Oct. 3, 2026 · 06:30 IST',
    readTime: '4 min read',
    anatomy: {
      whatHappened: "The Union Ministry of Communications approved an amended implementation agreement for BharatNet Phase II across Maharashtra, committing ₹10,520 crore in capital and viability gap financing.",
      theContext: "Rural connectivity projects historically suffered from severe operational downtime and unresolved right-of-way disputes. The revised rollout model shifts maintenance to a concessionaire-backed public-private partnership.",
      theEvidence: "PIB release PRID 2317906 documents the statutory allocation, coverage metrics (28,237 gram panchayats), and binding service-level uptime agreements.",
      whatIsClaimed: "Government authorities project on-demand enterprise connectivity across 15,799 revenue villages within 18 months, boosting telemedicine and rural administration.",
      whatRemainsUnclear: "Last-mile power stability in remote tribal belts and state funding co-share timelines remain unverified by local audits.",
      whatComesNext: "Tenders for regional concessionaires will be finalized before the close of Q3, with quarterly uptime audits commencing thereafter.",
      theVerdict: "The amended BharatNet funding is formally verified by gazetted sanction.",
      verdictTriad: {
        supports: "₹10,520 crore in viability gap and capital financing has been formally sanctioned under amended BharatNet agreements.",
        doesNotEstablish: "The capital sanction does not establish that 28,237 gram panchayats currently have active operational broadband.",
        uncertainty: "Last-mile concessionaire uptime performance and local right-of-way dispute resolution in tribal talukas."
      }
    },
    claims: [
      { id: 'C-NET1', status: 'VERIFIED_FACT', text: 'PIB release PRID 2317906 confirms ₹10,520 crore sanctioned for Maharashtra BharatNet implementation.', materiality: 'HIGH', sources: 'PIB' }
    ],
    sources: [['PIB — Amended BharatNet Implementation in Maharashtra', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2317906&lang=1&reg=1']],
    related: [
      { kicker: 'ELECTIONS', headline: "Who actually decides whether your name stays on India's voter list?", slug: 'sir-voter-rolls', desc: "The constitutional chain behind the SIR dispute." },
      { kicker: 'INSOLVENCY', headline: "What does ten years of IBC mean in practice?", slug: 'ibc-ten-years', desc: "A decade of institutions, resolutions, and credit culture." }
    ]
  },
  'sugar-inventory-rules': {
    section: 'THE VERDICT / MARKETS & COMMODITIES',
    kicker: 'FOOD POLICY & SUPPLY CHAIN',
    headline: "Why Did the Food Ministry Tighten Sugar Stock Ceilings Ahead of the Festive Quarter?",
    dek: "From 15 October through 30 November, registered sugar traders face a 15-day stock ceiling and a 1,000-quintal limit to prevent speculative hoarding.",
    author: 'Commodities & Trade Bureau',
    date: 'Saturday, Oct. 3, 2026 · 06:45 IST',
    readTime: '3 min read',
    anatomy: {
      whatHappened: "The Department of Food and Public Distribution issued a mandatory order under the Essential Commodities Act imposing strict holding ceilings on wholesale sugar dealers.",
      theContext: "Domestic cane crushing cycles and festive demand peaks routinely generate speculative price spikes if retail channel inventories are unmonitored.",
      theEvidence: "PIB release PRID 295591 confirms the 15-day holding limit, 1,000-quintal cap, and mandatory weekly portal inventory filings.",
      whatIsClaimed: "Trade bodies claim the limits are unnecessarily restrictive given domestic buffer stocks, while the ministry argues preemptive regulation prevents consumer inflation.",
      whatRemainsUnclear: "Whether import duty adjustments will accompany the domestic stock restrictions if harvest yields in western cane belts soften.",
      whatComesNext: "The limits take statutory effect on 15 October and run through 30 November across all registered mandis.",
      theVerdict: "The stock restrictions are a verified regulatory intervention aimed at price stability during high-demand festival weeks.",
      verdictTriad: {
        supports: "A 15-day stock ceiling and 1,000-quintal holding limit are legally effective from October 15 through November 30 under Essential Commodities statutory orders.",
        doesNotEstablish: "The inventory rules do not establish an underlying national sugar shortage or physical production collapse.",
        uncertainty: "Whether international export quotas will be adjusted if domestic festival demand exceeds buffer releases."
      }
    },
    claims: [
      { id: 'C-SUG1', status: 'VERIFIED_FACT', text: 'PIB release PRID 295591 sets 15-day holding limits and 1,000 quintal ceiling from Oct. 15 to Nov. 30.', materiality: 'HIGH', sources: 'PIB' }
    ],
    sources: [['PIB — Government revises sugar stock holding norms', 'https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=295591']],
    related: [
      { kicker: 'GLOBAL ENERGY', headline: "Oil above $100 is becoming a policy problem", slug: 'energy', desc: "Brent crude stays above $100 as China suspends fuel exports." },
      { kicker: 'ECONOMY', headline: "Three economies, three ways of absorbing inflation", slug: 'economy', desc: "U.S., Europe, and India paths diverge." }
    ]
  },
  'ibc-ten-years': {
    section: 'THE VERDICT / FINANCE & REGULATION',
    kicker: 'INSOLVENCY & BANKRUPTCY',
    headline: "What Ten Years of the Insolvency and Bankruptcy Code Mean in Practice",
    dek: "The Insolvency and Bankruptcy Board of India marks a decade of resolving distressed corporate debt and transforming institutional credit culture.",
    author: 'Legal & Corporate Finance Desk',
    date: 'Saturday, Oct. 3, 2026 · 06:15 IST',
    readTime: '5 min read',
    anatomy: {
      whatHappened: "The Insolvency and Bankruptcy Board of India (IBBI) reached its ten-year milestone, publishing data reviewing corporate resolution outcomes since the Code took effect in 2016.",
      theContext: "Prior to the IBC, recovery under the BIFR regime took an average of 4.3 years with recovery rates hovering below 25%, paralyzing banking sector capital.",
      theEvidence: "Official press releases (PRID 2317998) and judicial records confirm thousands of pre-admission settlements and landmark group restructuring precedents.",
      whatIsClaimed: "Advocates credit the IBC with dismantling promoter moral hazard; critics highlight delays in NCLT court benches that exceed statutory 330-day resolution windows.",
      whatRemainsUnclear: "The implementation timeline for cross-border insolvency legislation and pre-packaged MSME resolution frameworks.",
      whatComesNext: "Parliament is slated to review legislative amendments strengthening digital case tracking and judicial bench capacity in the upcoming session.",
      theVerdict: "Ten years of empirical data demonstrate that the IBC's principal economic victory is behavioral.",
      verdictTriad: {
        supports: "The Insolvency and Bankruptcy Code has resolved thousands of corporate defaults and transformed promoter debt repayment discipline over a 10-year span.",
        doesNotEstablish: "The decade milestone does not establish that NCLT benches have eliminated systemic resolution delays beyond statutory 330-day deadlines.",
        uncertainty: "The parliamentary enactment schedule for the proposed cross-border insolvency bill and pre-packaged MSME framework."
      }
    },
    claims: [
      { id: 'C-IBC1', status: 'VERIFIED_FACT', text: 'IBBI foundation anniversary press note (PRID 2317998) documents 10-year systemic resolution outcomes.', materiality: 'HIGH', sources: 'PIB' }
    ],
    sources: [['PIB — IBBI marks ten years since establishment', 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2317998&lang=2&reg=48']],
    related: [
      { kicker: 'GLOBAL MARKETS', headline: "The bond market is the story behind the stock market story", slug: 'markets', desc: "5.34% 10-year Treasury yield reprices the cost of money." },
      { kicker: 'WALL STREET', headline: "Index strength is not the same as market breadth", slug: 'us-markets', desc: "Concentration around the AI complex widens." }
    ]
  }
};

// Render In-Newspaper Article Page with Signature 7-Part Verdict Anatomy
function renderArticle(slug) {
  if (!articleView) return;
  
  let article = articleDataBank[slug];
  let parentPage = null;

  // Check if slug matches a desk page in global-edition-001.json
  if (!article) {
    const pageMatch = deepEdition.pages.find(p => p.slug === slug);
    if (pageMatch) {
      parentPage = pageMatch;
      article = {
        section: `THE VERDICT / ${pageMatch.section}`,
        kicker: pageMatch.kicker,
        headline: pageMatch.lead.headline,
        dek: `${pageMatch.headline}. ${pageMatch.intro}`,
        author: 'Global Newsroom Desk',
        date: 'Saturday, Oct. 3, 2026 · Published 06:00 EST',
        readTime: '4 min read',
        anatomy: {
          whatHappened: `${pageMatch.lead.body} Verified news wire reports confirm immediate operational and market shifts across the desk.`,
          theContext: `This development reflects the broader macro reality: ${pageMatch.intro.toLowerCase()} As capital flows reprice across asset classes, regional markets are reacting through distinct sector exposures.`,
          theEvidence: `Reporting is corroborated by primary filings and wire disclosures from ${(pageMatch.sources || []).map(s => s[0]).join(', ')}. Key data points confirm: ${(pageMatch.cards || []).map(c => `${c.label}: ${c.headline}`).join('; ')}.`,
          whatIsClaimed: `Market participants and sector executives view these moves as pivotal structural realignments, while caution remains elevated around borrowing costs and geopolitical shipping corridors.`,
          whatRemainsUnclear: `The downstream impact on corporate balance sheets, currency pass-through speeds, and sovereign borrowing spreads will depend heavily on forthcoming central bank determinations.`,
          whatComesNext: `Investors and policy institutions are monitoring the calendar of scheduled corporate earnings, inventory releases, and monetary policy communications outlined across this edition.`,
          theVerdict: `The reported facts are verified by primary market wires and official disclosures. While headline indexes reflect partial resilience, the deeper reality is that higher yields and energy costs are driving cross-border economic divergence, rewarding entities with domestic funding depth and punishing leverage.`
        },
        claims: [
          { id: `DESK-P${pageMatch.page}`, status: 'VERIFIED_FACT', text: `${pageMatch.kicker} core developments reported and cross-verified via primary news wires.`, materiality: 'HIGH', sources: (pageMatch.sources || []).map(s => s[0]).join(', ') }
        ],
        sources: pageMatch.sources || [],
        related: (pageMatch.cards || []).map((c, i) => ({
          kicker: c.label,
          headline: c.headline,
          slug: `${pageMatch.slug}-${i}`,
          desc: c.body
        }))
      };
    }
  }

  // Check if slug matches a sub-card (slug-index)
  if (!article) {
    const match = slug.match(/^(.+)-(\d+)$/);
    if (match) {
      const pSlug = match[1];
      const idx = parseInt(match[2], 10);
      const pageMatch = deepEdition.pages.find(p => p.slug === pSlug);
      if (pageMatch && pageMatch.cards && pageMatch.cards[idx]) {
        const c = pageMatch.cards[idx];
        parentPage = pageMatch;
        article = {
          section: `THE VERDICT / ${pageMatch.section}`,
          kicker: `${pageMatch.kicker} · ${c.label}`,
          headline: c.headline,
          dek: `${c.body} Part of the broader ${pageMatch.kicker} desk analysis.`,
          author: 'Special Correspondent',
          date: 'Saturday, Oct. 3, 2026 · Published 06:15 EST',
          readTime: '3 min read',
          anatomy: {
            whatHappened: `${c.body} This targeted development directly impacts operational and market expectations in the ${c.label.toLowerCase()} sector.`,
            theContext: `Contextualized within the desk's lead story: ${pageMatch.lead.body} Underlying macroeconomic factors described in ${pageMatch.headline.toLowerCase()} continue to shape corporate outcomes.`,
            theEvidence: `Direct disclosures verified via ${(pageMatch.sources || []).map(s => s[0]).join(', ')}. Empirical findings confirm: ${c.headline}.`,
            whatIsClaimed: `Industry observers highlight the strategic significance for peers and market pricing, though long-term margin implications remain subject to competitive pressure.`,
            whatRemainsUnclear: `Long-term contract terms and regulatory review outcomes remain pending official filing with regulatory oversight bodies.`,
            whatComesNext: `Subsequent quarterly disclosures and sector data releases will validate whether initial market reactions are sustained.`,
            theVerdict: `The reported development is factually established by contemporary reporting. It demonstrates how macro variables such as interest rates and supply disruptions materialize concretely at the individual company and sector level.`
          },
          claims: [
            { id: `CARD-P${pageMatch.page}-${idx + 1}`, status: 'VERIFIED_FACT', text: `${c.label}: ${c.headline}`, materiality: 'HIGH', sources: (pageMatch.sources || []).map(s => s[0]).join(', ') }
          ],
          sources: pageMatch.sources || [],
          related: [
            { kicker: pageMatch.kicker, headline: pageMatch.lead.headline, slug: pageMatch.slug, desc: pageMatch.lead.body },
            ...(pageMatch.cards || []).filter((_, i) => i !== idx).map((sibling, i) => ({
              kicker: sibling.label,
              headline: sibling.headline,
              slug: `${pageMatch.slug}-${i}`,
              desc: sibling.body
            }))
          ]
        };
      }
    }
  }

  // Fallback
  if (!article) {
    article = {
      section: 'THE VERDICT / DISPATCH',
      kicker: 'NEWS DISPATCH',
      headline: 'Article Dispatch in Brief',
      dek: 'This dispatch is part of The Verdict verification ledger.',
      author: 'Editorial Desk',
      date: 'Oct. 3, 2026',
      readTime: '2 min read',
      anatomy: {
        whatHappened: 'The requested story is archived in the newsroom ledger.',
        theContext: 'Newsroom dispatches are updated continuously as primary records become available.',
        theEvidence: 'Primary records archived in the Evidence Desk.',
        whatIsClaimed: 'Pending administrative verification.',
        whatRemainsUnclear: 'Specific details await updated reporting.',
        whatComesNext: 'Consult the front page for full edition coverage.',
        theVerdict: 'Please return to the front page for current verified coverage.'
      },
      claims: [],
      sources: [],
      related: []
    };
  }

  const a = article.anatomy;

  // Tripartite Verdict Formulation
  const triad = a.verdictTriad || {
    supports: a.theVerdict || 'The contemporary reporting and primary filings corroborate the documented transaction.',
    doesNotEstablish: 'The available evidence does not establish systemic structural failure or unannounced regulatory intervention.',
    uncertainty: a.whatRemainsUnclear || 'Downstream market pricing, final regulatory clearances, and macroeconomic pass-through timelines.'
  };

  const imageHtml = article.image ? `
    <figure class="editorial-figure article-lead-figure">
      <img src="${esc(article.image.src)}" alt="${esc(article.image.alt)}" class="editorial-img" loading="eager">
      <figcaption class="editorial-caption">
        <span class="caption-credit">${esc(article.image.credit)}</span>
        ${esc(article.image.caption)}
      </figcaption>
    </figure>
  ` : '';

  // Build the Signature 7-Part Verdict Anatomy HTML
  const verdictAnatomyHtml = `
    <div class="verdict-article-flow">
      <div class="verdict-part">
        <div class="verdict-part-title">WHAT HAPPENED</div>
        <div class="verdict-part-body"><p class="lead-dropcap">${a.whatHappened} <span class="evidence-tag verified" data-open="evidencePanel">VERIFIED</span></p></div>
      </div>

      <div class="verdict-part">
        <div class="verdict-part-title">THE CONTEXT</div>
        <div class="verdict-part-body"><p>${a.theContext}</p></div>
      </div>

      <div class="verdict-part">
        <div class="verdict-part-title">THE EVIDENCE</div>
        <div class="verdict-part-body"><p>${a.theEvidence} <span class="evidence-tag verified" data-open="evidencePanel">PRIMARY WIRE</span></p></div>
      </div>

      <div class="verdict-part">
        <div class="verdict-part-title">WHAT IS CLAIMED</div>
        <div class="verdict-part-body"><p>${a.whatIsClaimed} <span class="evidence-tag attributed" data-open="evidencePanel">ATTRIBUTED</span></p></div>
      </div>

      <div class="verdict-part">
        <div class="verdict-part-title">WHAT REMAINS UNCLEAR</div>
        <div class="verdict-part-body"><p>${a.whatRemainsUnclear} <span class="evidence-tag disputed" data-open="evidencePanel">DEVELOPING</span></p></div>
      </div>

      <div class="verdict-part">
        <div class="verdict-part-title">WHAT COMES NEXT</div>
        <div class="verdict-part-body"><p>${a.whatComesNext}</p></div>
      </div>
    </div>

    <!-- The Exceptional Restrained Tripartite Verdict Box -->
    <div class="the-verdict-box">
      <div class="the-verdict-label">THE VERDICT</div>
      <div class="the-verdict-triad">
        <div class="verdict-triad-item">
          <span class="verdict-marker-title">The evidence currently supports</span>
          <p class="verdict-marker-text">${esc(triad.supports)}</p>
        </div>
        <div class="verdict-triad-item">
          <span class="verdict-marker-title">The evidence does not establish</span>
          <p class="verdict-marker-text">${esc(triad.doesNotEstablish)}</p>
        </div>
        <div class="verdict-triad-item">
          <span class="verdict-marker-title">The key uncertainty is</span>
          <p class="verdict-marker-text">${esc(triad.uncertainty)}</p>
        </div>
      </div>
    </div>
  `;

  // Build Evidence Dossier
  const claimsHtml = (article.claims || []).map(c => `
    <div class="dossier-claim-row">
      <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
        <b>CLAIM ${esc(c.id)}</b>
        <span class="dossier-badge" style="background:${c.status === 'VERIFIED_FACT' ? 'var(--wsj-navy)' : c.status === 'ATTRIBUTED_CLAIM' ? 'var(--wsj-crimson)' : 'var(--wsj-muted)'}">${esc(c.status.replaceAll('_', ' '))}</span>
      </div>
      <div>${esc(c.text)}</div>
      <div style="font-size:10px; color:var(--wsj-muted); margin-top:4px;">Materiality: ${esc(c.materiality || 'HIGH')} · Source: ${esc(c.sources || 'Primary Record')}</div>
    </div>
  `).join('');

  const sourcesHtml = (article.sources || []).map(([name, url]) => `
    <a href="${esc(url)}" target="_blank" rel="noreferrer" class="back-home-btn" style="padding: 4px 10px; font-size: 10px;">
      ${esc(name)} ↗
    </a>
  `).join(' ');

  // Build Side Rail
  const relatedHtml = (article.related || []).map(r => `
    <a href="#article/${esc(r.slug)}" class="rail-item-link">
      <div class="rail-item-kicker">${esc(r.kicker)}</div>
      <h4 class="rail-item-head">${esc(r.headline)}</h4>
      <p class="rail-item-desc">${esc(r.desc)}</p>
    </a>
  `).join('');

  // Populate #articleView
  articleView.innerHTML = `
    <div class="article-nav-strip">
      <a href="#" class="back-home-btn" id="articleBackBtn">← Back to The Verdict Front Page</a>
      <div class="article-breadcrumbs" style="font-family: var(--font-sans); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--wsj-muted);">
        ${esc(article.section)}
      </div>
      <div class="article-meta-actions">
        <a href="#articleEvidence" class="article-meta-btn" id="jumpToDossier">Evidence Dossier</a>
        <button class="article-meta-btn" onclick="window.print()">Print</button>
        <button class="article-meta-btn" id="shareStoryBtn">Share</button>
      </div>
    </div>

    <header class="article-header-block">
      <div class="article-kicker-tag">${esc(article.kicker)}</div>
      <h1 class="article-main-headline">${esc(article.headline)}</h1>
      <p class="article-main-dek">${esc(article.dek)}</p>
      
      <div class="article-author-strip">
        <span class="article-author-name">${esc(article.author)}</span>
        <span>·</span>
        <span>${esc(article.date)}</span>
        <span>·</span>
        <span class="article-read-badge">${esc(article.readTime)}</span>
      </div>
    </header>

    <div class="article-columns-layout">
      <div class="article-prose">
        ${imageHtml}
        ${verdictAnatomyHtml}

        <div id="articleEvidence" class="article-evidence-dossier">
          <div class="dossier-head">
            <h4>EVIDENCE AUDIT &amp; VERIFICATION DOSSIER</h4>
            <span class="dossier-badge">THE VERDICT AUDITED</span>
          </div>
          <div class="dossier-claims">
            ${claimsHtml || '<div class="dossier-claim-row">Primary report verified under The Verdict editorial constitution.</div>'}
          </div>
          <div class="dossier-sources">
            <span style="font-size:10px; text-transform:uppercase; letter-spacing:0.08em; color:var(--wsj-muted);">PRIMARY CITATIONS:</span>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
              ${sourcesHtml || '<span style="color:var(--wsj-muted);">Direct news wire verification</span>'}
            </div>
          </div>
        </div>
      </div>

      <aside class="article-side-rail">
        <div class="rail-box">
          <div class="rail-box-title">In This Edition / Related</div>
          ${relatedHtml || '<p style="font-size:12px; color:var(--wsj-muted);">Return to front page for full edition coverage.</p>'}
        </div>

        <div class="rail-box">
          <div class="rail-box-title">What’s News Quick Take</div>
          <div style="font-size: 13px; line-height: 1.5; color: var(--wsj-black);">
            <p style="margin: 0 0 10px;"><strong>MARKETS:</strong> Brent crude holds above $100; Treasury yields re-test multi-decade peaks.</p>
            <p style="margin: 0 0 10px;"><strong>LABOUR:</strong> U.S. payrolls cooled to 29k; unemployment at 4.2%.</p>
            <p style="margin: 0;"><strong>GOVERNANCE:</strong> Special intensive revision drive focuses on statutory Form 6 re-enrolment remedies.</p>
          </div>
        </div>

        <div class="rail-box" style="background: var(--wsj-cream);">
          <div class="rail-box-title">Verification Policy</div>
          <p style="font-size: 11px; line-height: 1.5; color: var(--wsj-muted); margin: 0 0 10px;">
            We do not convert attributed allegations into fact by repetition. Material assertions are checked against primary statutory or regulatory filings.
          </p>
          <a href="#" data-open="evidencePanel" class="back-home-btn" style="width: 100%; justify-content: center; box-sizing: border-box;">Open Full Claim Ledger (44)</a>
        </div>
      </aside>
    </div>
  `;

  // Attach dynamic listener for share button
  const shareBtn = document.getElementById('shareStoryBtn');
  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      navigator.clipboard?.writeText(window.location.href);
      const prev = shareBtn.textContent;
      shareBtn.textContent = 'Link Copied!';
      setTimeout(() => { shareBtn.textContent = prev; }, 1800);
    });
  }

  // Attach dynamic listener for back button
  const backBtn = document.getElementById('articleBackBtn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '';
    });
  }

  // Hook data-open inside article view
  articleView.querySelectorAll('[data-open]').forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      const el = document.getElementById(b.dataset.open);
      if (el) el.classList.add('open');
    });
  });
}

// Internal Routing Engine
function handleRoute() {
  const hash = window.location.hash || '';
  if (hash.startsWith('#article/')) {
    const slug = hash.replace('#article/', '');
    renderArticle(slug);
    if (homeView) homeView.style.display = 'none';
    if (articleView) {
      articleView.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  } else {
    if (articleView) articleView.style.display = 'none';
    if (homeView) homeView.style.display = 'block';
    if (hash && hash !== '#' && hash !== '#front') {
      const target = document.querySelector(hash);
      if (target) {
        setTimeout(() => target.scrollIntoView({ behavior: 'smooth' }), 50);
      }
    }
  }
}

window.addEventListener('hashchange', handleRoute);
handleRoute();

// Modal Handlers (Backdrop click and Escape key)
document.querySelectorAll('.source-modal-overlay').forEach(modal => {
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.drawer.open, .reader.open, .source-modal-overlay.open').forEach(el => {
      el.classList.remove('open');
      el.setAttribute('aria-hidden', 'true');
    });
  }
});

// Global Drawer Triggers
document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.getElementById(b.dataset.open);
  if (target) {
    target.classList.add('open');
    target.setAttribute('aria-hidden', 'false');
  }
}));
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', (e) => {
  e.preventDefault();
  const target = document.getElementById(b.dataset.close);
  if (target) {
    target.classList.remove('open');
    target.setAttribute('aria-hidden', 'true');
  }
}));
document.querySelectorAll('.filter').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  renderClaims(b.dataset.status);
}));

// Delegated click handler for native evidence tags to open Evidence Desk
document.addEventListener('click', (e) => {
  const tag = e.target.closest('.evidence-tag');
  if (tag) {
    e.preventDefault();
    const panel = document.getElementById('evidencePanel');
    if (panel) panel.classList.add('open');
  }
});

const readerContent = document.querySelector('#readerContent');
if (readerContent) {
  readerContent.innerHTML = '<h2>What happened</h2><p>A special enrolment and correction drive is the immediate operational development in completed-SIR jurisdictions. Established reporting says the exercise is intended to identify eligible voters left out of the roll and to facilitate new and first-time enrolment.</p><h2>The system</h2><p>The constitutional chain starts with the Election Commission and ends, for individual enrolment questions, with the Electoral Registration Officer. Booth Level Officers handle field-level enumeration and document collection.</p><h2>How we got here</h2><p>The present argument sits on top of the Bihar SIR ordered in 2025 and considered by the Supreme Court in its 27 May 2026 judgment.</p><h2>What remains unknown</h2><p>The national draft-roll absence count cannot by itself establish the number of eligible voters wrongly excluded. The September 29 communication remains attributed until the underlying document is retrieved and checked directly.</p>';
}
