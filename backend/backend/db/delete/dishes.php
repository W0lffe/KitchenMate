<?php 

/**
 * This file handles DELETE for dishes
 */

require __DIR__ . "/../connection.php";

$dishID = $resource["data"]["id"];

try {
    
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        DELETE FROM dishes 
        WHERE id = :id
    ");

    $stmt->execute(["id" => $dishID]);
    unset($stmt);

    $pdo->commit();
    
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "Dish deleted successfully!"]);
} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to delete dish.", "debug" => $th->getMessage()]);
} finally{
    unset($pdo);
}
?>