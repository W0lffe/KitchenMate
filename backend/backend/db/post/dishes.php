<?php 

/**
 * This file handles INSERT for dishes
*/

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$components = $data["components"];
$userID = $resource["id"];

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO dishes 
            (name, course, userID, favorite, image)
        VALUES 
            (:name, :course, :userID, :favorite, :image)
    ");

    $stmt->execute([
        'name' => (string)$data["name"],
        'course' => (string)$data["course"],
        'favorite' => 0,
        "image" => $data["image"] ?? null,
        'userID' => (int)$userID
    ]);

    unset($stmt);

    $dishID = $pdo->lastInsertId();

    if(!empty($components)){
        
        $values = [];
        $parameters = ["dishID" => $dishID];

        foreach ($components as $i => $c) {
            $values[] = "(:componentID$i, :dishID)";
            $parameters["componentID$i"] = $c;
        }

        $sql = "INSERT INTO components (componentID, dishID)
                VALUES " . implode(", ", $values);

        $stmt = $pdo->prepare($sql);
        $stmt->execute($parameters);
        unset($stmt);

    }

    $pdo->commit();
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "Dish saved successfully!"]);
} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to post dish", "debug" => $th->getMessage()]);
} finally {
    unset($pdo);
}
?> 