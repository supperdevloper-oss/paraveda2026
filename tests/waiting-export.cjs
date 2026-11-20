const fs=require('fs'),vm=require('vm'),assert=require('assert');const s=fs.readFileSync('index.html','utf8');
const part=(a,b)=>s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)));
const exportTsv=vm.runInNewContext(part('function __pvAgentKey(', 'try{window.__pvServerDay')+part('function __pvBoutique(', 'function t_(')+part('function __pvWaitingCells(', 'function __PvWaitingCmd(')+';__pvWaitingTsv');
let rows=[{produit:'P',qte:2,nom:'C',telephone:'0612345678',adresse:'rue\n2',ville:'Casablanca',prix:100,agent:'Hafida',remarques:'attention\tclient'},{produit:'B',qte:1,agent:'Unknown'}];
assert.strictEqual(exportTsv(rows,{}),'P\t2\tC\t0612345678\tCasablanca\true 2\t100\tagent-10\r\nB\t1\t\t\t\t\t\t');
console.log('Waiting Excel export tests passed');
const adminCopy=part('Ht=async()=>{const se=La;', ',Va=async()=>');
assert(adminCopy.includes('__pvWaitingTsv(se,__pvStores)'), 'admin Digylog copy uses the same eight fields');
assert(!adminCopy.includes('Ce.agent].join'), 'admin copy does not copy agent as boutique');
