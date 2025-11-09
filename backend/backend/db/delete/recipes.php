<?php 

/**
 * This file handles DELETE for recipes
 */

require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
    DELETE FROM recipes 
    WHERE recipeID = :recipeID
");

$stmt->execute([
    "recipeID" => $recipeID
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Recipe deleted"]);
exit;

?>