<?php 

/**
 * File handles UPDATE for basket
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        UPDATE basket
        SET 
            product = :product,
            quantity = :quantity,
            unit = :unit,
            obtained = :obtained
        WHERE id = :id
        AND (
            product <> :product
            OR quantity <> :quantity
            OR unit <> :unit
            OR obtained <> :obtained
        )
    ");

    foreach($data as $item){
        $stmt->execute([
            'id' => $item["id"],
            'product' => $item["product"],
            'quantity' => $item["quantity"],
            'unit' => $item["unit"],
            'obtained' => $item['obtained']
        ]);
    }

    $pdo->commit();
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "Basket updated successfully!"]);
} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to update basket", "debug" => $th->getMessage()]);
} finally {
    unset($pdo);
}
?>