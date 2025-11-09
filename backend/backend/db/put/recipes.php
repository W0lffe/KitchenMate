<?php 

/**
 * This file handles UPDATE querys of recipes,
 */

require_once __DIR__ . "/../connection.php";

 $pdo->beginTransaction();

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
        WHERE recipeID = :recipeID
    ");
    $stmt->execute([
        "name" => $data["name"],
        "portions" => $data["portions"],
        "output" => $data["output"],
        "outputType" => $data["outputType"],
        "time" => $data["time"],
        "timeFormat" => $data["timeFormat"],
        "favorite" => $data["favorite"],
        "category" => $data["category"],
        "recipeID" => $recipeID
    ]);

    $pdo->prepare("DELETE FROM ingredients WHERE recipeID = :recipeID")
        ->execute(["recipeID" => $recipeID]);

    $stmtIng = $pdo->prepare("
        INSERT INTO ingredients (recipeID, product, quantity, unit)
        VALUES (:recipeID, :product, :quantity, :unit)
    ");
    foreach ($data['ingredients'] as $ing) {
        $stmtIng->execute([
            "recipeID" => $recipeID,
                "product" => $ing['product'],
            "quantity" => $ing['quantity'],
            "unit" => $ing['unit']
        ]);
    }

    $pdo->prepare("DELETE FROM instructions WHERE recipeID = :recipeID");
        ->execute(["recipeID" => $recipeID]);

    $stmtInst = $pdo->prepare("
        INSERT INTO instructions (recipeID, instruction, step)
        VALUES (:recipeID, :instruction, :step)
    ");
    foreach ($data['instructions'] as $index => $inst) {
        $stmtInst->execute([
            "recipeID" => $recipeID,
            "instruction" => $inst,
            "step" => $index + 1
        ]);
    }

    $pdo->commit();

    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "Recipe updated successfully!"]);
    exit;

?>