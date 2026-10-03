const data = await (await fetch('./data/edition-001.json')).json();

const sourceList = document.querySelector('#sourceList');
const claimList = document.querySelector('#claimList');
const claimSummary = document.querySelector('#claimSummary');

const claimSamples = [
  {id:'C04',status:'VERIFIED_FACT',text:'The ECI’s 26 September press note describes procedural measures for affected voters, including house visits and help desks/camps.',materiality:'HIGH',sources:'S2'},
  {id:'C08',status:'VERIFIED_FACT',text:'Approximately 13 crore entries were reported as absent from draft rolls across states and Union Territories; the figure is a draft-roll measure, not proof of wrongful deletion.',materiality:'CRITICAL',sources:'S10'},
  {id:'C11',status:'ATTRIBUTED_CLAIM',text:'The Indian Express and NDTV reported an ECI communication dated 29 September ordering special drives in jurisdictions where SIR was complete.',materiality:'CRITICAL',sources:'S10, S11'},
  {id:'C20',status:'VERIFIED_FACT',text:'The Supreme Court judgment of 27 May 2026 addressed the Bihar SIR, its legal framework and the scope of citizenship-related inquiry.',materiality:'CRITICAL',sources:'S1'},
  {id:'C30',status:'VERIFIED_FACT',text:'Goa’s CEO office said 88 of 97 left-out voters had submitted Form 6 and been accepted.',materiality:'HIGH',sources:'S12'},
  {id:'C44',status:'VERIFIED_FACT',text:'The ECI said ECINET uses role-based access and would be reviewed by an expert committee for compliance with applicable Acts and Rules.',materiality:'HIGH',sources:'S2'}
];

function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}

for(const s of data.sources){
  const item=document.createElement('div'); item.className='source-item';
  item.innerHTML=`<div class="source-id">${esc(s.id)}</div><div class="source-tier">${esc(s.tier)}</div><div><div class="source-title">${esc(s.title)}</div><span class="source-meta">${esc(s.date)} · ${esc(s.access)}</span>${s.url?`<a href="${esc(s.url)}" target="_blank" rel="noreferrer">${esc(s.url)}</a>`:'<span class="source-meta">No URL — intentionally removed during QA.</span>'}</div>`;
  sourceList.appendChild(item);
}

function renderClaims(filter='ALL'){
  const counts = data.lead.claim_status_counts;
  claimSummary.innerHTML=Object.entries(counts).map(([k,v])=>`<div class="claim-stat"><b>${v}</b><small>${k.replaceAll('_',' ')}</small></div>`).join('');
  const rows=claimSamples.filter(x=>filter==='ALL'||x.status===filter);
  claimList.innerHTML=rows.map(c=>`<div class="claim-item"><div class="claim-top"><span class="claim-id">${esc(c.id)}</span><span class="status-label ${c.status==='VERIFIED_FACT'?'fact':c.status==='ATTRIBUTED_CLAIM'?'attributed':'unknown'}">${c.status.replaceAll('_',' ')}</span></div><div class="claim-text">${esc(c.text)}</div><div class="claim-meta">Materiality: ${esc(c.materiality)} · Sources: ${esc(c.sources)}</div></div>`).join('');
}
renderClaims();

const evidencePanel=document.querySelector('#evidencePanel');
document.querySelector('#evidenceBtn').addEventListener('click',()=>evidencePanel.classList.add('open'));
document.querySelector('#closeEvidence').addEventListener('click',()=>evidencePanel.classList.remove('open'));
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderClaims(b.dataset.status)}));

const reader=document.querySelector('#readerMode');
document.querySelector('#readerBtn').addEventListener('click',()=>reader.classList.add('open'));
document.querySelector('#closeReader').addEventListener('click',()=>reader.classList.remove('open'));
document.querySelector('#paperBtn').addEventListener('click',()=>document.body.classList.toggle('paper-mode'));

const readerContent=document.querySelector('#readerContent');
readerContent.innerHTML=`<h2>What happened</h2><p>A special enrolment and correction drive is the immediate operational development in completed-SIR jurisdictions. Established reporting says the exercise is intended to identify eligible voters left out of the roll and to facilitate new and first-time enrolment.</p><h2>The system</h2><p>The constitutional chain starts with the Election Commission and ends, for individual enrolment questions, with the Electoral Registration Officer. Booth Level Officers handle field-level enumeration and document collection. Software can enable the workflow, but it does not replace the legal authority or the statutory decision.</p><h2>How we got here</h2><p>The present argument sits on top of the Bihar SIR ordered in June 2025 and considered by the Supreme Court in its 27 May 2026 judgment. The debate widened as intensive revision reached other states and became a question about documentation, omissions, software and remedies.</p><h2>What remains unknown</h2><p>The national draft-roll absence count cannot by itself establish the number of eligible voters wrongly excluded. The September 29 communication also remains an attributed item in this edition until the underlying document is retrieved and checked directly.</p>`;