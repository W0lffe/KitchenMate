<?php 

/**
 * This file handles INSERT for dishes
*/

require __DIR__ . "/../connection.php";

$data = $resource["data"];

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
    'userID' => (int)$resource["id"]
]);

$components = $data["components"];

$dishID = $pdo -> lastInsertId();

$stmt = $pdo->prepare("
        INSERT INTO components 
        (componentID, dishID)
        VALUES 
        (:componentID, :dishID)
    ");

foreach($components as $component){
    $stmt->execute([
        "componentID"=> (int)$component,
        "dishID" => (int)$dishID
    ]);
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Dish saved successfully!"]);
exit;

?> 