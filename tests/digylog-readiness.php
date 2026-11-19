<?php
// Run with: php tests/digylog-readiness.php
$src = file_get_contents(__DIR__ . '/../api.php');
$start = strpos($src, 'function crm_dl_phone(');
$end = strpos($src, '/* agent -> Digylog store', $start);
if ($start === false || $end === false) throw new Exception('Validation functions not found');
eval(substr($src, $start, $end - $start));
function check_reason($order, $want, $label) {
  $got = crm_dl_order_missing($order);
  if ($got !== $want) { fwrite(STDERR, "FAIL $label: $got instead of $want\n"); exit(1); }
}
$good = array('nom'=>'Test','telephone'=>'0612345678','ville'=>'Casa','adresse'=>'Rue test','qte'=>1,'prix'=>120,'produit'=>'Test');
check_reason($good, '', 'complete');
foreach (array('nom','telephone','ville','adresse','produit','qte','prix') as $key) {
  $incomplete = $good; unset($incomplete[$key]);
  check_reason($incomplete, 'missing-'.$key, 'missing '.$key);
  $incomplete = $good; $incomplete[$key] = ' ';
  check_reason($incomplete, 'missing-'.$key, 'blank '.$key);
}
foreach (array('qte','prix') as $key) foreach (array(0, -1, 'abc') as $value) {
  $bad = $good; $bad[$key] = $value;
  check_reason($bad, 'invalid-'.$key, 'invalid '.$key);
}
$bad=$good; $bad['qte']=1.5; check_reason($bad,'invalid-qte','fractional quantity');
$bad=$good; $bad['telephone']='123'; check_reason($bad,'bad-phone','invalid phone');
$good['telephone']='+212 612345678'; check_reason($good,'','normalized phone');
echo "Digylog readiness tests passed\n";
