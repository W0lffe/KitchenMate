<?php 

/**
 * This file handles INSERT for dishes
*/

require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
        INSERT INTO dishes 
        (name, course, userID, favorite, image)
        VALUES 
        (:name, :course, :userID, :favorite, :image)
    ");

$stmt->execute([
   'name' => $data["name"],
   'course' => $data["course"],
   'userID' => $data["userID"],
   'favorite' => $data["favorite"],
   "image" => $data["image"]
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
        "componentID"=>$component,
        "dishID" => $dishID
    ]);
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Dish saved successfully!"]);
exit;

?> 