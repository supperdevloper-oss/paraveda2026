// Run: node tests/publish-agent.cjs
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const s=fs.readFileSync('index.html','utf8');
const start=s.indexOf('function __pvPublishDraft('),end=s.indexOf('function B4(',start);
assert(start>=0&&end>start);const publish=vm.runInNewContext(s.slice(start,end)+';__pvPublishDraft');
const draft={id:17,_d:1,agent:'',_f:{agent:30,_d:30},statut:'Confirmé',produit:'P'};
const out=publish(draft,'  Amina  ',100,'2026-11-20','amina-user');
assert.strictEqual(out.agent,'Amina');assert.strictEqual(out._d,0);assert.strictEqual(out._f.agent,100);assert.strictEqual(out._f._d,100);assert.strictEqual(out.waitingExitedAgent,'Amina');assert.strictEqual(draft.agent,'');
assert.strictEqual(publish(draft,' ',100,'',''),draft,'no publication with unknown agent');
assert.strictEqual(publish({_d:0,agent:'Admin choice'},'Amina',100,'','').agent,'Admin choice','published order remains unchanged');
console.log('Publish agent tests passed');
