<?php
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if(!isset($_COOKIE["PHPSESSID"])){
    echo json_encode(["error" => "Session expired. Please login again."]);
    exit;
}

session_id($_COOKIE["PHPSESSID"]);

session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'secure' => true,
    'httponly' => true,
    'samesite' => 'None'
]);
session_start();

if (!isset($_SESSION["auth_user"])) {
    echo json_encode(["error" => "Session expired. Please login again."]);
    exit;
}

$config = parse_ini_file(__DIR__ . "/../backend/config/config.ini", true);
$users = json_decode(file_get_contents($config["files"]["user_file"]), true);
$user = null;

foreach ($users as $u) {
    if ($u['id'] == $_SESSION['auth_user']) {
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