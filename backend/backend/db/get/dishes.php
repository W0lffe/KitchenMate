<?php 

/**
 * This file handles SELECT querys for dishes, fetches dishes belonging to userID and subquerys components belonging to dishID
 */
require __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("SELECT * FROM dishes WHERE userID = :id");
$stmt->execute(['id' => $resource["id"]]);
$dishes = $stmt->fetchAll(PDO::FETCH_ASSOC);
$dishesArray = [];

foreach ($dishes as $dish) {

    $stmtCmp = $pdo->prepare("SELECT componentID FROM components WHERE dishID = :id");
    $stmtCmp->execute(['id' => $dish["id"]]);
    $components = $stmtCmp->fetchAll(PDO::FETCH_ASSOC);
  
    $compValues = [];
    foreach($components as $comp){
        array_push($compValues, $comp["componentID"]);
    }
    $dish['components'] = $compValues;
    $dishesArray[] = $dish;
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["data" => $dishesArray]);
exit;

?> 