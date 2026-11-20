const fs=require('fs'),vm=require('vm'),assert=require('assert');const s=fs.readFileSync('index.html','utf8');
const part=(a,b)=>s.slice(s.indexOf(a),s.indexOf(b,s.indexOf(a)));
const exportTsv=vm.runInNewContext(part('function __pvAgentKey(', 'try{window.__pvServerDay')+part('function __pvBoutique(', 'function t_(')+part('function __pvWaitingCells(', 'function __PvWaitingCmd(')+';__pvWaitingTsv');
let rows=[{produit:'P',qte:2,nom:'C',telephone:'0612345678',adresse:'rue\n2',ville:'Casablanca',prix:100,agent:'Hafida',remarques:'attention\tclient'},{produit:'B',qte:1,agent:'Unknown'}];
assert.strictEqual(exportTsv(rows,{}),'P\t2\tC\t0612345678\true 2\tCasablanca\t100\tagent-10\tattention client\r\nB\t1\t\t\t\t\t\t\t');
console.log('Waiting Excel export tests passed');
