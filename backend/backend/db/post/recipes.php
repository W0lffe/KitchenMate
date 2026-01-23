<?php

/**
 * This file handles INSERT querys of recipes, and subquerys for ingredients and instructions
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$instructions = $data["instructions"];
$ingredients = $data["ingredients"];

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO recipes 
            (name, portions, output, outputType, time, timeFormat, favorite, category, userID)
        VALUES 
            (:name, :portions, :output, :outputType, :time, :timeFormat, :favorite, :category, :userID)
    ");

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

    $recipeID = $pdo -> lastInsertId();

    if(!empty($ingredients)){

        $values = [];
        $parameters = ["recipeID" => $recipeID];

        foreach($ingredients as $i => $ing){
            $values[] = "(:recipeID, :product$i, :quantity$i, :unit$i)";
            $parameters["product$i"] = $ing["product"];
            $parameters["quantity$i"] = $ing["quantity"];
            $parameters["unit$i"] = $ing["unit"];
        }

        $sql = "
            INSERT INTO ingredients (recipeID, product, quantity, unit)
            VALUES " . implode(", ", $values);

        $stmt = $pdo->prepare($sql);
        $stmt->execute($parameters);
        unset($stmt);
    }
    
    if(!empty($instructions)){

        $values = [];
        $parameters = ["recipeID" => $recipeID];

        foreach($instructions as $i => $ins){
            $values[] = "(:recipeID, :instruction$i, :step$i)";
            $parameters["instruction$i"] = $ins;
            $parameters["step$i"] = $i + 1;
        }

        $sql = "
            INSERT INTO instructions (recipeID, instruction, step)
            VALUES " . implode(", ", $values);

        $stmt = $pdo->prepare($sql);
        $stmt->execute($parameters);
        unset($stmt);
    }

    $pdo->commit();
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "Recipe created successfully!"]);
} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to post recipe", "debug" => $th->getMessage()]);
} finally {
    unset($pdo);
}
?>