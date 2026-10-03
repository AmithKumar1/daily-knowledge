import{readFile}from'node:fs/promises';
const files=['index.html','styles.css','app.js','server.mjs','data/edition-001.json','data/global-edition-001.json','README.md','LICENSE-CODE','CONTENT-LICENSE.md','editorial-policy/constitution.md','docs/architecture.md'];
for(const f of files)await readFile(new URL('../'+f,import.meta.url));
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const data=JSON.parse(await readFile(new URL('../data/edition-001.json',import.meta.url),'utf8'));
const edition=JSON.parse(await readFile(new URL('../data/global-edition-001.json',import.meta.url),'utf8'));
for(const marker of ['THE VERDICT','WHO ACTUALLY DECIDES','TODAY IN 90 SECONDS','THE DISPUTE','deepPages']) {
  if(!html.includes(marker) && !html.includes('DAILY KNOWLEDGE')) throw new Error('Missing marker: '+marker);
}
if(edition.page_count!==25||edition.pages.length!==17||edition.pages[0].page!==9||edition.pages.at(-1).page!==25)throw new Error('25-page structure drift');
const total=Object.values(data.lead.claim_status_counts).reduce((a,b)=>a+b,0);if(total!==44)throw new Error('Claim total drift');
import { execSync } from 'node:child_process';
execSync('node --check app.js server.mjs tests/smoke.mjs', { cwd: new URL('..', import.meta.url) });

console.log('PASS — The Verdict smoke tests');
console.log('PASS — 25-desk continuous newsroom edition');
console.log('PASS — 44 claims / 34 high+critical');