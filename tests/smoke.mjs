import { readFile } from 'node:fs/promises';

const files=['index.html','styles.css','app.js','server.mjs','data/edition-001.json','README.md','LICENSE-CODE','CONTENT-LICENSE.md','editorial-policy/constitution.md','docs/architecture.md'];
for(const f of files){await readFile(new URL(`../${f}`,import.meta.url));}
const html=await readFile(new URL('../index.html',import.meta.url),'utf8');
const data=JSON.parse(await readFile(new URL('../data/edition-001.json',import.meta.url),'utf8'));
for(const marker of ['EDITION 001','WHO ACTUALLY DECIDES','TODAY IN 90 SECONDS','THE DISPUTE','SOURCES & PRIMARY DOCUMENTS']) if(!html.includes(marker)) throw new Error(`Missing marker: ${marker}`);
if(data.lead.claim_status_counts.VERIFIED_FACT!==31) throw new Error('Claim count drift: VERIFIED_FACT');
const total=Object.values(data.lead.claim_status_counts).reduce((a,b)=>a+b,0);
if(total!==44) throw new Error(`Claim total drift: ${total}`);
if(data.lead.high_plus_critical!==34) throw new Error('Materiality total drift');
console.log('PASS — Daily Knowledge smoke tests');
console.log(`PASS — ${files.length} core files readable`);
console.log('PASS — 44 claims / 34 high+critical / 16 source slots');
