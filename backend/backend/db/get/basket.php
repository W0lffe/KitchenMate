<?php 

/**
 * This file handles SELECT querys for basket, fetches basket belonging to userID and subquerys items belonging to basketID
 */
require __DIR__ . "/../connection.php";



$stmt = $pdo->prepare("SELECT * FROM basket WHERE userID = :id");
$stmt->execute(['id' => $resource["id"]]);
$basket = $stmt->fetchAll(PDO::FETCH_ASSOC);

unset($stmt);
http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["data" => $basket]);
exit;

?> 