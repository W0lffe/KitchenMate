<?php 

/**
 * This file handles DELETE for users
 */

require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
    DELETE FROM users 
    WHERE userID = :userID
");

$stmt->execute([
    "userID" => $userID
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "User deleted"]);
exit;

?>