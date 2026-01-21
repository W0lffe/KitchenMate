<?php 

/**
 * This file handles DELETE for basket
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$userID = $resource["id"] ?? null;

try {
    $clearBasket = (is_array($data) && count($data) === 0);
    $message = "Product";

    $pdo->beginTransaction();

    if($clearBasket){
        $stmt = $pdo->prepare("
            DELETE FROM basket
            WHERE userID = :id
        ");

        $stmt->execute([
            "id" => $userID
        ]);
        $message = "Products";
    }
    else{
        $stmt = $pdo->prepare("
            DELETE FROM basket 
            WHERE id = :id
                AND
                    userID = :userID
        ");
        $stmt->execute([
            "id" => (int)$data["id"],
            "userID" => (int)$userID
        ]);
    }

    $pdo->commit();
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "$message deleted from basket successfully!"]);
} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to delete from basket!", "debug" => $th->getMessage()]);
} finally {
    unset($pdo);
}


?>