<?php 

/**
 * This file handles INSERT for users
 */
require __DIR__ . "/../connection.php";

$data = $resource["data"];

try {

    $stmt = $pdo->prepare("
        INSERT INTO users 
        (name, email, passwd)
        VALUES
        (:name, :email, :passwd)
    ");

    $stmt->execute([
        "name"=> $data["user"],
        "email"=> $data["email"] ?? "",
        "passwd"=> $data["passwd"]
    ]);

    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "User created succesfully"]);
    exit;
    
} catch (PDOException $e) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Database error"]);
    exit;
}

?>