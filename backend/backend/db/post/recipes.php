<?php

/**
 * This file handles INSERT querys of recipes, and subquerys for ingredients and instructions
 */

require __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
        INSERT INTO recipes 
        (name, portions, output, outputType, time, timeFormat, favorite, category, userID)
        VALUES 
        (:name, :portions, :output, :outputType, :time, :timeFormat, :favorite, :category, :userID)
    ");

$data = $resource["data"];

$stmt->execute([
    "name" => (string)$data["name"],
    "portions" => (int)$data["portions"],
    "output" => (string)$data["output"],
    "outputType" => $data["outputType"] ?? null,
    "time" => (int)$data["time"],
    "timeFormat" => (string)$data["timeFormat"],
    "favorite" => 0,
    "category" => (string)$data["category"],
    'userID' => (int)$resource["id"]
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
        "recipeID" => (int)$recipeID,
        "product" => (string)$ingredient['product'],
        "quantity" => (float)$ingredient['quantity'],
        "unit" => (string)$ingredient['unit']
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
        "recipeID" => (int)$recipeID,
        "instruction" => (string)$instruction,
        "step" => $index + 1
    ]);
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Recipe created successfully!"]);
exit;

?>