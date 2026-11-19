<?php
// Run with: php tests/sync-regression.php
// Load the pure merge functions without running api.php's HTTP entry point.
$source = file_get_contents(__DIR__ . '/../api.php');
function load_section($source, $start, $end) {
    $from = strpos($source, $start);
    $to = strpos($source, $end, $from);
    if ($from === false || $to === false) throw new Exception('Cannot find merge functions');
    eval(substr($source, $from, $to - $from));
}
load_section($source, 'function crm_users_union(', '/* v3.67: journal');
load_section($source, 'function crm_agent_key(', 'function crm_write(');
function expect_same($actual, $expected, $message) {
    if ($actual !== $expected) { fwrite(STDERR, "FAIL: $message\n"); exit(1); }
}
expect_same(crm_merge_agent_names(array('A', 'B'), array('A', 'C'), array()), array('A', 'B', 'C'), 'stale page list must not delete pages');
expect_same(crm_merge_agent_names(array('A', 'B'), array('B', 'C'), array('B')), array('A', 'C'), 'deleted page must not return from stale list');
expect_same(crm_merge_agent_names(array('A'), array('a'), array()), array('A'), 'duplicate pages');
$users = crm_users_union(array(array('id'=>1), array('id'=>2)), array(array('id'=>1), array('id'=>3)));
expect_same(array_column($users, 'id'), array(1, 2, 3), 'stale user list must not delete users');
$users = crm_users_union(array(array('id'=>1, '_u'=>100)), array(array('id'=>1, '_u'=>1, '_del'=>1)));
expect_same(!empty($users[0]['_del']), true, 'deleted user must not return from stale list');
echo "Sync regression tests passed\n";
