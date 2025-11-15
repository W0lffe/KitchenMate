<?php 

/**
 * This file handles UPDATE querys of recipes,
 */

require __DIR__ . "/../connection.php";

$pdo->beginTransaction();

$data = $resource["data"];
$recipeID = $data["id"];

    $stmt = $pdo->prepare("
        UPDATE recipes
        SET 
            name = :name,
            portions = :portions,
            output = :output,
            outputType = :outputType,
            time = :time,
            timeFormat = :timeFormat,
            favorite = :favorite,
            category = :category
        WHERE id = :id
    ");
    $stmt->execute([
        "name" => (string)$data["name"],
        "portions" => (int)$data["portions"],
        "output" => (string)$data["output"],
        "outputType" => $data["outputType"] ?? null,
        "time" => (int)$data["time"],
        "timeFormat" => (string)$data["timeFormat"],
        "favorite" => (int)$data["favorite"],
        "category" => (string)$data["category"],
        "id" => (int)$recipeID
    ]);

    $pdo->prepare("DELETE FROM ingredients WHERE recipeID = :id")
        ->execute(["id" => (int)$recipeID]);

    $stmtIng = $pdo->prepare("
        INSERT INTO ingredients (recipeID, product, quantity, unit)
        VALUES (:recipeID, :product, :quantity, :unit)
    ");
    foreach ($data['ingredients'] as $ing) {
        $stmtIng->execute([
            "recipeID" => (int)$recipeID,
            "product" => (string)$ing['product'],
            "quantity" => (float)$ing['quantity'],
            "unit" => (string)$ing['unit']
        ]);
    }

    $pdo->prepare("DELETE FROM instructions WHERE recipeID = :id")
        ->execute(["id" => $recipeID]);

    $stmtInst = $pdo->prepare("
        INSERT INTO instructions (recipeID, instruction, step)
        VALUES (:recipeID, :instruction, :step)
    ");
    foreach ($data['instructions'] as $index => $inst) {
        $stmtInst->execute([
            "recipeID" => (int)$recipeID,
            "instruction" => (string)$inst,
            "step" => $index + 1
        ]);
    }

    $pdo->commit();

    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "Recipe updated successfully!"]);
    exit;

?>