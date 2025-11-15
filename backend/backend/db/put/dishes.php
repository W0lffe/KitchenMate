<?php 

/**
 * This file handles UPDATE querys of dishes,
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];

$pdo->beginTransaction();

$stmt = $pdo->prepare("
    UPDATE dishes
    SET 
        name = :name,
        course = :course,
        favorite = :favorite,
        image = :image
    WHERE id = :id
");

$stmt->execute([
    'name' => (string)$data["name"],
    'course' => (string)$data["course"],
    'favorite' => (int)$data["favorite"],
    'image' => $data["image"] ?? null,
    'id' => $data["id"]
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