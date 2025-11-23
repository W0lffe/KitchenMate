<?php 

/**
 * This file handles INSERT for users
 */
require __DIR__ . "/../connection.php";

$data = $resource["data"];

try {

    $stmt = $pdo->prepare("
        INSERT INTO users 
        (name, passwd,cookType, unitType)
        VALUES
        (:name, :passwd, :cookType, :unitType)
    ");

    $stmt->execute([
        "name"=> $data["user"],
        "passwd"=> $data["passwd"],
        "cookType" => $data["cookType"],
        "unitType" => $data["unitType"]
    ]);

    if(isset($_FILES["image"])){
        $userID = $pdo -> lastInsertId();
        $uploadDir = getUpload($userID, null, true);
        $image = handleIncomingImage($uploadDir);

        $pdo->beginTransaction();

        $pdo->prepare("
            UPDATE users
            SET image = :image
            WHERE userID = :id 
        ")->execute([
            "image" => $image,
            "id" => $userID
        ]);

        $pdo->commit();
    }

    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "User created succesfully!"]);
    exit;
    
} catch (PDOException $e) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Error with database: ${$e->getMessage()}"]);
    exit;
}

?>