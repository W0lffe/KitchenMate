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

    $userID = $pdo -> lastInsertId();
    $plainRecCode = generateRecoveryCode();
    $hashedCode = password_hash($plainRecCode, PASSWORD_BCRYPT);

    $pdo->beginTransaction();

    $pdo->prepare("
        UPDATE users
        SET rec = :rec
        WHERE userID = :id 
    ")->execute([
        "rec" => $hashedCode,
        "id" => $userID
    ]);

    if(isset($_FILES["image"])){
        $uploadDir = getUpload($userID, null, true);
        $image = handleIncomingImage($uploadDir);

        $pdo->prepare("
            UPDATE users
            SET image = :image
            WHERE userID = :id 
        ")->execute([
            "image" => $image,
            "id" => $userID
        ]);
    }

    $pdo->commit();
   
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => ["msg" => "User created successfully!", "code" => $plainRecCode]]);
    exit;
    
} catch (PDOException $e) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Error with database: ${$e->getMessage()}"]);
    exit;
}

?>