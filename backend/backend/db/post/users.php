<?php 

/**
 * This file handles INSERT for users
 */

require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
    INSERT INTO users 
    (name, email, passwd)
    VALUES
    (:name, :email, :passwd)
");

$stmt->execute([
    "name"=> $data["name"],
    "email"=> $data["email"],
    "passwd"=>$data["passwd"]
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "User created"]);
exit;

?>