<?php
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require_once __DIR__ . "/../backend/util/helpers.php";

$payloadData = verifyToken();
$config = parse_ini_file(__DIR__ . "/../backend/config/config.ini", true);
$users = json_decode(file_get_contents($config["files"]["user_file"]), true);
$user = null;

foreach ($users as $u) {
    if ($u['id'] == $payloadData['userID']) {
        $user = $u;
        break;
    }
}

if (!$user) {
    echo json_encode(["error" => "User does not exist."]);
    exit;
}

unset($user['passwd']);
echo json_encode(["user" => $user]);
exit;
?>