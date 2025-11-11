<?php 

/**
 * This file handles DELETE for recipes
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];

$stmt = $pdo->prepare("
    DELETE FROM recipes 
    WHERE id = :id
");

$stmt->execute([
    "id" => (int)$data["id"]
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Recipe deleted successfully!"]);
exit;

?>