<?php 

/**
 * This file handles UPDATE querys of recipes,
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$recipeID = $data["id"];

try {

    //Validate recipe existence first
    $stmt = $pdo->prepare("SELECT 1 FROM recipes WHERE id = :id");
    $stmt->execute(["id" => $recipeID]);

    if (!$stmt->fetchColumn()) {
        throw new RuntimeException('Recipe not found');
    }
    unset($stmt);

    $pdo->beginTransaction();

    // UPDATE RECIPE
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
    unset($stmt);

    //REPLACE INGREDIENTS

    $stmt = $pdo->prepare("DELETE FROM ingredients WHERE recipeID = :id");
    $stmt->execute(["id" => (int)$recipeID]);
    unset($stmt);

    if(!empty($data["ingredients"])){

        $values = [];
        $parameters = ["recipeID" => $recipeID];

        foreach($data["ingredients"] as $i => $ing){
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

    //REPLACE INSTRUCTIONS

    $stmt =  $pdo->prepare("DELETE FROM instructions WHERE recipeID = :id");
    $stmt->execute(["id" => $recipeID]);
    unset($stmt);

    if(!empty($data["instructions"])){

        $values = [];
        $parameters = ["recipeID" => $recipeID];

         foreach($data["instructions"] as $i => $ins){
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
    echo json_encode(["success" => "Recipe updated successfully!"]);

} catch (Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to update recipe", "debug" => $th->getMessage()]);
} finally {
    unset($pdo);
}

?>