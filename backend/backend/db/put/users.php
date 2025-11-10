<?php 

/**
 * File handles UPDATE for users
 */

require_once __DIR__ . "/../connection.php";

$pdo->beginTransaction();

$stmt = $pdo->prepare("
    UPDATE users
    SET
        name = :name,
        email = :email,
        passwd = :passwd
    WHERE userID = :userID
");

$pdo->execute([
    'name' => $data["name"],
    'email' => $data["email"],
    'passwd' => $data["passwd"],
    'userID' => $userID
]);

$pdo->commit();

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "User data updated successfully!"]);
exit;
?>