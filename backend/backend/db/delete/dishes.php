<?php 

/**
 * This file handles DELETE for dishes
 */

require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
    DELETE FROM dishes 
    WHERE dishID = :dishID
");

$stmt->execute([
    "dishID" => $dishID
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Dish deleted"]);
exit;

?>