<?php 

/**
 * This file handles SELECT querys for basket, fetches basket belonging to userID and subquerys items belonging to basketID
 */
require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("SELECT basketID FROM basket WHERE userID = :id");
$stmt->execute(['id' => $userID]);
$basket = $stmt->fetch(PDO::FETCH_ASSOC);

$basketID = $basket['basketID'];

$stmtItems = $pdo->prepare("SELECT * FROM items WHERE basketID = :id");
$stmtItems->execute(['id' => $basketID]);
$items = $stmtItems->fetchAll(PDO::FETCH_ASSOC);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["data" => $items]);


?> 