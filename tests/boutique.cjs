const fs=require('fs'),vm=require('vm'),assert=require('assert');
const s=fs.readFileSync('index.html','utf8');function extract(start,end){return s.slice(s.indexOf(start),s.indexOf(end,s.indexOf(start)))}
const resolve=vm.runInNewContext(extract('function __pvAgentKey(', 'try{window.__pvServerDay')+extract('function __pvBoutique(', 'function t_(')+';__pvBoutique');
assert.strictEqual(resolve('  MÉRYAM ',{Meryam:'Slim-Bio-MR'}),'Slim-Bio-MR');
assert.strictEqual(resolve('  HAFIDA ',{}),'agent-10');
assert.strictEqual(resolve('hafida',{Hafida:'Old name'}),'agent-10');
assert.strictEqual(resolve('Unknown',{Meryam:'Slim-Bio-MR'}),'');
assert.strictEqual(resolve('Meryam',{Meryam:'A',meryam:'B'}),'');
const api=fs.readFileSync('api.php','utf8');assert(!api.includes('crm_dl_send_guarded(); crm_delivery_auto_guarded();'));assert(api.includes("return array('ok'=>true,'skipped'=>'digylog-disconnected','updated'=>0);"));
console.log('Boutique mapping tests passed');
