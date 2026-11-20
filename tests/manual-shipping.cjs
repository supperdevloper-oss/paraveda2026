// Run: node tests/manual-shipping.cjs
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('index.html','utf8');
const start=html.indexOf('function B2(e,n)');const end=html.indexOf('function I2(',start);
assert(start>=0&&end>start,'agent row style not found');
const style=vm.runInNewContext(html.slice(start,end)+'; B2');
assert.notStrictEqual(style({statut:'Confirmé',livraison:''},0).bg,'#f6b26b','confirmed should not be orange');
assert.strictEqual(style({statut:'Confirmé',livraison:'Expédier vers'},0).bg,'#f6b26b','manual shipped should be orange');
assert(!html.includes("action:'digylog_send_auto'"),'automatic sending heartbeat is disabled');
assert(!html.includes("action:'digylog_tracking_auto'"),'automatic tracking heartbeat is disabled');
console.log('Manual shipping tests passed');
