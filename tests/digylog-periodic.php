<?php
// Run with: php tests/digylog-periodic.php
$dir = sys_get_temp_dir() . '/pv-periodic-test-' . getmypid();
if (!mkdir($dir)) throw new Exception('Cannot create test directory');
function crm_dl_state_path($name) { global $dir; return $dir . '/' . $name; }
function crm_dl_run($dry = false) { global $calls; $calls++; return array('ok'=>true, 'sent'=>0); }
$src = file_get_contents(__DIR__ . '/../api.php');
$start = strpos($src, 'function crm_dl_periodic_sync()');
$end = strpos($src, '/* Automatic / manual Digylog sender.', $start);
if ($start === false || $end === false) throw new Exception('Periodic guard not found');
eval(substr($src, $start, $end - $start));
function verify($condition, $message) { if (!$condition) { fwrite(STDERR, "FAIL: $message\n"); exit(1); } }
$calls=0;
$a=crm_dl_periodic_sync(); verify(!empty($a['ok']) && $calls===1 && $a['periodicIntervalSeconds']===1800, 'first run');
$b=crm_dl_periodic_sync(); verify($b['skipped']==='throttled' && $calls===1 && $b['retryAfter']>0, '30 minute throttle');
file_put_contents(crm_dl_state_path('.dl-periodic.lock'), (string)(time()-1801));
$c=crm_dl_periodic_sync(); verify(!empty($c['ok']) && $calls===2, 'run after interval');
$lock=fopen(crm_dl_state_path('.dl-periodic.lock'),'c+'); flock($lock,LOCK_EX);
$d=crm_dl_periodic_sync(); verify($d['skipped']==='busy' && $calls===2, 'concurrent run does not wait');
flock($lock,LOCK_UN);fclose($lock);
unlink(crm_dl_state_path('.dl-periodic.lock'));rmdir($dir);
echo "Digylog periodic tests passed\n";
