<?php 

/**
 * This file handles DELETE for recipes
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$message = "Recipe";

try {
    $pdo->beginTransaction();


    //DELETE RECIPE DEPENDENCIES
    if(isset($resource["data"]["dependencies"]) && !empty($resource["data"]["dependencies"])){
        $dependencies = $resource["data"]["dependencies"];

        $values = [];
        $params = [];

        foreach($dependencies as $i => $dep){
            $values[] = ":id$i";
            $params["id$i"] = (int)$dep;
        }

        $sql = "
            DELETE FROM dishes
            WHERE id IN  (" . implode(", ", $values) . ")
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);
        unset($stmt);

        $message = "Selected items";
    }

    //DELETE RECIPE
    $stmt = $pdo->prepare("
        DELETE FROM recipes 
        WHERE id = :id
    ");
    $stmt->execute([
        "id" => (int)$data["id"]
    ]);

    $pdo->commit();

    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "$message deleted successfully!"]);

} catch (Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to delete recipe.", "debug" => $th->getMessage()]);

} finally{
    unset($pdo);
}



?>