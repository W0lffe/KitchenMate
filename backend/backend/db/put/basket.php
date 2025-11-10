<?php 

/**
 * File handles UPDATE for basket
 */

require_once __DIR__ . "/../connection.php";

$pdo->beginTransaction();

$stmt = $pdo->prepare("
    UPDATE basket
    SET 
        product = :product,
        quantity = :quantity,
        unit = :unit,
    WHERE itemID = :itemID
");


foreach ($data as $item) {
    $stmt -> execute([
        'itemID' => $item["id"],
        'product' => $item["product"],
        'quantity' => $item["quantity"],
        'unit' => $item["unit"],
]   );
}

$pdo->commit();

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Basket updated successfully!"]);
exit;

?>