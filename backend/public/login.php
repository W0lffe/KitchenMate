<?php
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
require __DIR__ . "/../backend/util/token.php";

if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit;
}


// Verify token
$payloadData = verifyToken();
//Parse user file from config file
$config = parse_ini_file(__DIR__ . "/../backend/config/config.ini", true);
$users = json_decode(file_get_contents($config["files"]["user_file"]), true);

//Init user as null
$user = null;

/*--------------------- DATABASE SELECT HERE ------------------------- */
//Loop through users to find user on token data
foreach ($users as $u) {
    if ($u['id'] == $payloadData['userID']) {
        $user = $u;
        break;
    }
}

if (!$user) {
    http_response_code(401); //Unauthorized
    header("Content-Type: application/json");
    echo json_encode(["error" => "User does not exist."]);
    exit;
}

unset($user['passwd']); //Delete password property from user object
http_response_code(200); //OK
header("Content-Type: application/json");
echo json_encode(["user" => $user]); //Return user data to client
exit;
?>