<?php 


/**
 * This file handles SELECT querys for recipes, fetches recipes belonging to userID and subquerys instructions and ingredients belonging to recipeID
 */
require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("SELECT * FROM recipes WHERE userID = :id");
$stmt->execute(['id' => $userID]);
$recipes = $stmt->fetchAll(PDO::FETCH_ASSOC);
$recipesArray = [];

foreach ($recipes as $recipe) {
    $recipeID = $recipe["recipeID"];

    $stmtIng = $pdo->prepare("SELECT * FROM ingredients WHERE recipeID = :id");
    $stmtIng->execute(['id' => $recipeID]);
    $ingredients = $stmtIng->fetchAll(PDO::FETCH_ASSOC);

    $stmtInst = $pdo->prepare("SELECT * FROM instructions WHERE recipeID = :id");
    $stmtInst->execute(['id' => $recipeID]);
    $instructions = $stmtInst->fetchAll(PDO::FETCH_ASSOC);

    $recipe['ingredients'] = $ingredients;
    $recipe['instructions'] = $instructions;
    $recipesArray[] = $recipe;
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["data" => $recipesArray]);

?>