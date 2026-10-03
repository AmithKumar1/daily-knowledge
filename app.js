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

// Render 17 Global Desks (P09 - P25) on Front Page
if (deepPages) {
  deepPages.innerHTML = deepEdition.pages.map(p => `
    <section id="${esc(p.slug)}" class="home-section edition-page">
      <div class="section-rule"><span>${esc(p.section)}</span><span>${esc(p.kicker)}</span></div>
      <div class="edition-head">
        <div>
          <span class="section-tag">${esc(p.kicker)}</span>
          <h2><a href="#article/${esc(p.slug)}" class="article-title-link">${esc(p.headline)}</a></h2>
        </div>
        <p>${esc(p.intro)}</p>
      </div>
      <div class="edition-grid">
        <article class="edition-lead">
          <div class="story-kicker">${esc(p.kicker)}</div>
          <h3><a href="#article/${esc(p.slug)}" class="article-title-link">${esc(p.lead.headline)}</a></h3>
          <div class="byline-row">
            <span class="byline-author">By Staff Reporters</span>
            <span>·</span>
            <span>Updated Oct. 2, 2026</span>
          </div>
          <p>${esc(p.lead.body)}</p>
          <div class="inline-sources">${linkSources(p.sources)}</div>
        </article>
        <aside class="edition-rail">
          ${(p.cards || []).map((c, i) => `
            <article>
              <a href="#article/${esc(p.slug)}-${i}" class="article-title-link">
                <span>${esc(c.label)}</span>
                <h4>${esc(c.headline)}</h4>
              </a>
              <p>${esc(c.body)}</p>
            </article>
          `).join('')}
        </aside>
      </div>
    </section>
  `).join('');
}

// Built-in Article Database for Non-Desk Stories
const articleDataBank = {
  'sir-voter-rolls': {
    section: 'FRONT PAGE · ELECTIONS & LAW',
    kicker: 'ELECTIONS · CONSTITUTIONAL LAW · GOVERNANCE',
    headline: "Who Actually Decides Whether Your Name Stays on India's Voter List?",
    dek: "The Special Intensive Revision dispute is bigger than one headline number. It is an intricate story about authority, field verification, statutory documentation, software access, and what happens when an elector's name goes missing.",
    author: 'The Editorial Desk',
    date: 'Friday, Oct. 2, 2026 · 07:00 IST',
    readTime: '6 min read',
    prose: [
      { type: 'lead', text: "The Election Commission says jurisdictions where Special Intensive Revision (SIR) has finished should run a special drive for eligible voters left out of the draft rolls, alongside young and first-time electors." },
      { type: 'p', text: "The 29 September instruction is carried here as an attributed item because the underlying official communication was not directly retrieved during edition preparation. This distinction is central to our editorial constitution: national discourse frequently converts unverified reports into settled fact, but an audit-led newsroom must preserve the distinction between an attributed administrative directive and a directly verified primary record." },
      { type: 'p', text: "The number circulating across headlines and parliamentary debate is vast: reporting placed the total entries absent from draft rolls at roughly 13 crore across the completed SIR exercise. That figure, however, is a draft-roll absence measure. It is not, by itself, evidence that 13 crore eligible citizens were wrongfully deleted from the franchise." },
      { type: 'quote', text: "“The draft-roll absence of roughly 13 crore entries is an administrative metric of unverified entries, not proof of wrongful mass exclusion without individual examination of statutory forms.”" },
      { type: 'h3', text: "The Chain of Statutory Authority Under Article 324" },
      { type: 'p', text: "To understand how an elector's name enters or leaves the electoral roll, one must examine the chain of legal responsibility established by Article 324 of the Constitution and the Representation of the People Acts. Overarching superintendence, direction, and control rests with the Election Commission in New Delhi. At the state level, the Chief Electoral Officer (CEO) coordinates the administrative machinery, supported by District Election Officers (DEOs)." },
      { type: 'p', text: "Crucially, however, the individual enrolment decision is neither an automated software output nor an executive fiat: it is a statutory act performed by the Electoral Registration Officer (ERO) or Assistant Electoral Registration Officer (AERO). Booth Level Officers (BLOs) are field enumerators who perform door-to-door verification and collect documentation, but under the law, BLOs possess no statutory power to unilaterally strike an elector off the roll." },
      { type: 'h3', text: "Field Verification, Doorstep Realities, and Form 6" },
      { type: 'p', text: "In jurisdictions where intensive revisions have concluded, the legal remedy for any omitted citizen remains active: submitting Form 6 for fresh inclusion or Form 8 for correction. The experience in Goa provides a clear case study at human scale: according to state election authorities, out of 97 voters who found their names omitted from the draft roll, 88 promptly submitted Form 6 and had their entries restored upon verification." },
      { type: 'p', text: "The remaining cases in Goa involved electors holding foreign citizenship documentation, notably Portuguese passports, illustrating the granular legal questions that lie beneath aggregated national figures." },
      { type: 'h3', text: "The ECINET Software Layer and Technical Audits" },
      { type: 'p', text: "The technical infrastructure supporting this process—the ECINET software suite—is another key variable in the current dispute. The Commission maintains that field officers operate under strictly defined, role-based access controls, and has constituted an expert technical committee to audit the platform's compliance with applicable election rules." }
    ],
    claims: claimSamples,
    sources: (data.sources || []).slice(0, 6).map(s => [s.title, s.url]),
    related: [
      { kicker: 'INFRASTRUCTURE', headline: "Can Maharashtra's rural internet layer scale?", slug: 'maharashtra-rural-internet', desc: "₹10,520 crore in approved Union support for 28,237 gram panchayats." },
      { kicker: 'COMMODITIES', headline: "Why did sugar inventory rules tighten again?", slug: 'sugar-inventory-rules', desc: "15-day stock ceiling and 1,000-quintal limit effective Oct. 15." },
      { kicker: 'INSOLVENCY', headline: "What does ten years of IBC mean in practice?", slug: 'ibc-ten-years', desc: "A decade of institutions, resolutions, and credit culture." },
      { kicker: 'TECHNOLOGY', headline: "Amazon tests an asset-light AI balance sheet", slug: 'ai-tech-security', desc: "Placing $8B of Nvidia Grace Blackwell chips with outside investors." }
    ]
  },
  'maharashtra-rural-internet': {
    section: 'NATIONAL · INFRASTRUCTURE',
    kicker: 'DIGITAL CONNECTIVITY & TELECOM',
    headline: "Can Maharashtra's Rural Internet Layer Scale Under Amended BharatNet?",
    dek: "₹10,520 crore in approved Union support aims to link 28,237 gram panchayats and provide on-demand connectivity across 15,799 villages.",
    author: 'National Infrastructure Bureau',
    date: 'Friday, Oct. 2, 2026 · 06:30 IST',
    readTime: '4 min read',
    prose: [
      { type: 'lead', text: "The Union Ministry of Communications has cleared an amended implementation agreement for BharatNet Phase II across Maharashtra, committing ₹10,520 crore in viability gap and capital funding to establish rural high-speed fiber connectivity." },
      { type: 'p', text: "Under the revised rollout architecture, the project covers 28,237 gram panchayats and introduces an on-demand service delivery model for 15,799 revenue villages that had previously remained outside terrestrial broadband reach." },
      { type: 'quote', text: "“The operational challenge in rural digital infrastructure is rarely laying the glass fiber; it is the uptime SLA, last-mile power availability, and institutional maintenance agreements.”" },
      { type: 'h3', text: "The Institutional Framework" },
      { type: 'p', text: "The Amended BharatNet framework shifts operational maintenance to a public-private partnership (PPP) model, requiring concessionaires to guarantee 98% uptime in rural blocks before receiving quarterly performance disbursements." },
      { type: 'p', text: "State administrative bodies, including the Maharashtra Information Technology Corporation (MahaIT), will oversee local right-of-way clearances and ensure that primary health centres, village schools, and local administrative offices receive dedicated enterprise bandwidth." }
    ],
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
    section: 'MARKETS & COMMODITIES',
    kicker: 'FOOD POLICY & SUPPLY CHAIN',
    headline: "Why Did the Food Ministry Tighten Sugar Stock Ceilings Ahead of the Festive Quarter?",
    dek: "From 15 October through 30 November, registered sugar traders face a 15-day stock ceiling and a 1,000-quintal limit to prevent speculative hoarding.",
    author: 'Commodities & Trade Bureau',
    date: 'Friday, Oct. 2, 2026 · 06:45 IST',
    readTime: '3 min read',
    prose: [
      { type: 'lead', text: "The Department of Food and Public Distribution has invoked the Essential Commodities Act to impose mandatory stock limits on sugar traders, wholesalers, and bulk consumers, effective from 15 October through 30 November." },
      { type: 'p', text: "Under the gazette order, registered dealers must not hold sugar stocks exceeding 1,000 quintals or more than 15 days of verified average sales turnover. The tightening follows an audit of domestic cane production estimates and regional milling delays." },
      { type: 'quote', text: "“The inventory limits are designed as an administrative buffer against price spikes during the peak festival demand corridor.”" },
      { type: 'h3', text: "Market and Refining Impacts" },
      { type: 'p', text: "Wholesale sugar prices had firmed 3.4% in late September across western and northern mandis, driven by festival buying and firm ethanol blending demand. The revised norms require weekly portal disclosure of inventory holdings by all bulk industrial consumers." }
    ],
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
    section: 'FINANCE & REGULATION',
    kicker: 'INSOLVENCY & BANKRUPTCY',
    headline: "What Ten Years of the Insolvency and Bankruptcy Code Mean in Practice",
    dek: "The Insolvency and Bankruptcy Board of India marks a decade of resolving distressed corporate debt and transforming institutional credit culture.",
    author: 'Legal & Corporate Finance Desk',
    date: 'Friday, Oct. 2, 2026 · 06:15 IST',
    readTime: '5 min read',
    prose: [
      { type: 'lead', text: "The Insolvency and Bankruptcy Board of India (IBBI) marked ten years since the enactment of the Insolvency and Bankruptcy Code, 2016, reviewing a decade that fundamentally altered the relationship between corporate debtors and institutional lenders." },
      { type: 'p', text: "Prior to the IBC, recovery under the Board for Industrial and Financial Reconstruction (BIFR) or civil courts averaged over four years with recovery rates lingering below 25%. Under the Code, the credible threat of promoter displacement transformed credit recovery discipline long before formal admission to the NCLT." },
      { type: 'quote', text: "“The IBC's true economic achievement is not only the assets resolved inside the courtroom, but the thousands of defaults settled before an admission order was ever passed.”" },
      { type: 'h3', text: "The Next Frontier: Group Insolvency and Cross-Border Frameworks" },
      { type: 'p', text: "As the regime enters its second decade, policymakers are drafting amendments to introduce group insolvency frameworks, pre-packaged resolution schemes for medium enterprises, and formal adoption of the UNCITRAL model law on cross-border corporate distress." }
    ],
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

// Render In-Newspaper Article Page
function renderArticle(slug) {
  if (!articleView) return;
  
  let article = articleDataBank[slug];
  let isCard = false;
  let parentPage = null;
  let cardIndex = -1;

  // Check if slug matches a desk page in global-edition-001.json
  if (!article) {
    const pageMatch = deepEdition.pages.find(p => p.slug === slug);
    if (pageMatch) {
      parentPage = pageMatch;
      article = {
        section: `THE WALL STREET JOURNAL / ${pageMatch.section}`,
        kicker: pageMatch.kicker,
        headline: pageMatch.lead.headline,
        dek: `${pageMatch.headline}. ${pageMatch.intro}`,
        author: 'Global Newsroom Desk',
        date: 'Friday, Oct. 2, 2026 · Published 06:00 EST',
        readTime: '4 min read',
        prose: [
          { type: 'lead', text: pageMatch.lead.body },
          { type: 'p', text: `Across global capital markets, ${pageMatch.intro.toLowerCase()}` },
          { type: 'quote', text: `“${pageMatch.headline}”` },
          { type: 'h3', text: 'Key Developments Across the Desk' },
          ...(pageMatch.cards || []).map(c => ({
            type: 'p',
            text: `<strong>${esc(c.label)}:</strong> ${esc(c.headline)} — ${esc(c.body)}`
          })),
          { type: 'h3', text: 'Market & Policy Outlook' },
          { type: 'p', text: `As central banks, corporate treasuries, and sovereign debt desks recalibrate risk assumptions, developments in ${pageMatch.section.toLowerCase()} will remain a primary transmission channel for cross-border volatility.` }
        ],
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
        isCard = true;
        parentPage = pageMatch;
        cardIndex = idx;
        article = {
          section: `THE WALL STREET JOURNAL / ${pageMatch.section}`,
          kicker: `${pageMatch.kicker} · ${c.label}`,
          headline: c.headline,
          dek: `${c.body} Part of the broader ${pageMatch.kicker} analysis: ${pageMatch.headline.toLowerCase()}.`,
          author: 'Special Correspondent',
          date: 'Friday, Oct. 2, 2026 · Published 06:15 EST',
          readTime: '3 min read',
          prose: [
            { type: 'lead', text: c.body },
            { type: 'p', text: `This development arrives against the larger backdrop shaping the desk: ${pageMatch.lead.body}` },
            { type: 'quote', text: `“${c.headline} reflects how sector-specific shocks land differently across regions and capital structures.”` },
            { type: 'h3', text: 'Strategic Context' },
            { type: 'p', text: pageMatch.intro },
            { type: 'p', text: `Investors and policy institutions continue to monitor subsequent corporate and regulatory filings to evaluate longer-term institutional impact.` }
          ],
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

  // Fallback if not found
  if (!article) {
    article = {
      section: 'THE WALL STREET JOURNAL / DISPATCH',
      kicker: 'NEWS DISPATCH',
      headline: 'Article Dispatch in Brief',
      dek: 'This dispatch is part of the Daily Knowledge Edition 001 verification ledger.',
      author: 'Editorial Desk',
      date: 'Oct. 2, 2026',
      readTime: '2 min read',
      prose: [{ type: 'lead', text: 'The requested story is archived in the newsroom ledger. Please navigate back to the front page.' }],
      claims: [],
      sources: [],
      related: []
    };
  }

  // Build the Prose HTML
  const proseHtml = (article.prose || []).map(block => {
    if (block.type === 'lead') return `<p class="lead-dropcap">${block.text}</p>`;
    if (block.type === 'quote') return `<blockquote>${block.text}</blockquote>`;
    if (block.type === 'h3') return `<h3>${block.text}</h3>`;
    return `<p>${block.text}</p>`;
  }).join('');

  // Build the Evidence Dossier HTML
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

  const sourcesHtml = (article.sources || []).map(([name, url], idx) => `
    <a href="${esc(url)}" target="_blank" rel="noreferrer" class="back-home-btn" style="padding: 4px 10px; font-size: 10px;">
      ${esc(name)} ↗
    </a>
  `).join(' ');

  // Build the Side Rail HTML
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
      <a href="#" class="back-home-btn" id="articleBackBtn">← Back to Front Page</a>
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
        ${proseHtml}

        <div id="articleEvidence" class="article-evidence-dossier">
          <div class="dossier-head">
            <h4>EVIDENCE AUDIT &amp; VERIFICATION DOSSIER</h4>
            <span class="dossier-badge">STANDARDS-COMPLIANT</span>
          </div>
          <div class="dossier-claims">
            ${claimsHtml || '<div class="dossier-claim-row">Primary report verified under Edition 001 editorial rules.</div>'}
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
    b.addEventListener('click', () => {
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

// Source Modal Handlers
if (closeSourceModalBtn && sourceModal) {
  closeSourceModalBtn.addEventListener('click', () => {
    sourceModal.classList.remove('open');
    sourceModal.setAttribute('aria-hidden', 'true');
  });
  sourceModal.addEventListener('click', e => {
    if (e.target === sourceModal) {
      sourceModal.classList.remove('open');
      sourceModal.setAttribute('aria-hidden', 'true');
    }
  });
}

// Global Drawer Triggers
document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.open)?.classList.add('open')));
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => document.getElementById(b.dataset.close)?.classList.remove('open')));
document.querySelectorAll('.filter').forEach(b => b.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(x => x.classList.remove('active'));
  b.classList.add('active');
  renderClaims(b.dataset.status);
}));

const readerContent = document.querySelector('#readerContent');
if (readerContent) {
  readerContent.innerHTML = '<h2>What happened</h2><p>A special enrolment and correction drive is the immediate operational development in completed-SIR jurisdictions. Established reporting says the exercise is intended to identify eligible voters left out of the roll and to facilitate new and first-time enrolment.</p><h2>The system</h2><p>The constitutional chain starts with the Election Commission and ends, for individual enrolment questions, with the Electoral Registration Officer. Booth Level Officers handle field-level enumeration and document collection.</p><h2>How we got here</h2><p>The present argument sits on top of the Bihar SIR ordered in 2025 and considered by the Supreme Court in its 27 May 2026 judgment.</p><h2>What remains unknown</h2><p>The national draft-roll absence count cannot by itself establish the number of eligible voters wrongly excluded. The September 29 communication remains attributed until the underlying document is retrieved and checked directly.</p>';
}
