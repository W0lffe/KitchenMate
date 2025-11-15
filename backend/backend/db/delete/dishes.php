<?php 

/**
 * This file handles DELETE for dishes
 */

require __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
    DELETE FROM dishes 
    WHERE id = :id
");

$stmt->execute([
    "id" => $resource["data"]["id"]
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Dish deleted"]);
exit;

?>