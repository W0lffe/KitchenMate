<?php 
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_id($_COOKIE["PHPSESSID"]);
session_start();

if(isset($_COOKIE[session_name()])){
    setcookie(session_name(), "", time() - 3600, "/");
    $_SESSION = array();
}

session_destroy();
echo json_encode(["success" => "Successfully logged out."]);
exit;

?>