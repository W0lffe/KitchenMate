<?php 

/**
 * This file handles UPDATE querys of dishes,
 */

require_once __DIR__ . "/../connection.php";

$pdo->beginTransaction();

$stmt = $pdo->prepare("
    UPDATE dishes
    SET 
        name = :name,
        course = :course,
        date = :date,
        favorite = :favorite,
        image = :image
    WHERE dishID = :dishID
");

$stmt->execute([
    'name' => $data["name"],
    'course' => $data["course"],
    'date' => $data["date"],
    'favorite' => $data["favorite"],
    'image' => $data["image"],
    'dishID' => $data["id"]
]);

$components = $data["components"];

$pdo->prepare("DELETE FROM components WHERE dishID = :dishID")
        ->execute(["dishID" => $data["id"]]);

$stmtCmp = $pdo->prepare("
        INSERT INTO components 
        (componentID, dishID)
        VALUES 
        (:componentID, :dishID)
    ");

foreach($components as $component){
    $stmtCmp->execute([
        "componentID"=>$component,
        "dishID" => $data["id"]
    ]);
}

$pdo->commit();

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Dish updated successfully!"]);
exit;

?>