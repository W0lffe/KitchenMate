<?php 

/**
 * This file handles SELECT querys for dishes, fetches dishes belonging to userID and subquerys components belonging to dishID
 */
require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("SELECT * FROM dishes WHERE userID = :id");
$stmt->execute(['id' => $userID]);
$dishes = $stmt->fetchAll(PDO::FETCH_ASSOC);
$dishesArray = [];

foreach ($dishes as $dish) {
    $dishID = $dish["dishID"];

    $stmtCmp = $pdo->prepare("SELECT * FROM components WHERE dishID = :id");
    $stmtCmp->execute(['id' => $dishID]);
    $components = $stmtCmp->fetchAll(PDO::FETCH_ASSOC);

    $dish['components'] = $components;
    $dishesArray[] = $dish;
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["data" => $dishesArray]);


?> 