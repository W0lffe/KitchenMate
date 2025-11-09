<?php

/**
 * This file handles INSERT querys of recipes, and subquerys for ingredients and instructions
 */

require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
        INSERT INTO recipes 
        (name, portions, output, outputType, time, timeFormat, favorite, category, userID)
        VALUES 
        (:name, :portions, :output, :outputType, :time, :timeFormat, :favorite, :category, :userID)
    ");

$instructions = $data["instructions"];
$ingredients = $data["ingredients"];

$stmt->execute([
    'name' => $data['name'],
    'portions' => $data['portions'],
    'output' => $data['output'],
    'outputType' => $data['outputType'],
    'time' => $data['time'],
    'timeFormat' => $data['timeFormat'],
    'favorite' => $data['favorite'],
    'category' => $data['category'],
    'userID' => $data['userID']
]);

$instructions = $data["instructions"];
$ingredients = $data["ingredients"];
$recipeID = $pdo -> lastInsertId();

$stmt = $pdo->prepare("
        INSERT INTO ingredients 
        (recipeID, product, quantity, unit)
        VALUES 
        (:recipeID, :product, :quantity, :unit)
    ");

foreach ($ingredients as $ingredient) {
    $stmt->execute([
        'recipeID' => $recipeID,
        'product' => $ingredient["product"],
        'quantity' => $ingredient["quantity"],
        'unit' => $ingredient["unit"]
    ]);
}

$stmt = $pdo->prepare("
        INSERT INTO instructions 
        (recipeID, instruction, step)
        VALUES 
        (:recipeID, :instruction, :step)
    ");

foreach ($instructions as $index => $instruction) {
    $stmt->execute([
        'recipeID' => $recipeID,
        'instruction' => $instruction,
        'step' => $index + 1
    ]);
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Recipe saved successfully!"]);
exit;

?>