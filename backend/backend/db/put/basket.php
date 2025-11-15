<?php 

/**
 * File handles UPDATE for basket
 */

require __DIR__ . "/../connection.php";


$pdo->beginTransaction();

$data = $resource["data"];

$stmtSelect = $pdo->prepare("
    SELECT * FROM basket
    WHERE id = :id
");

$stmtUpdate = $pdo->prepare("
    UPDATE basket
    SET 
        product = :product,
        quantity = :quantity,
        unit = :unit,
        obtained = :obtained
    WHERE id = :id
");


foreach ($data as $item) {

    $stmtSelect->execute(["id" => $item["id"]]);
    $currentRow = $stmtSelect->fetch(PDO::FETCH_ASSOC);

    if($currentRow && 
        (
        $currentRow['product'] !== $item["product"] ||
        $currentRow['quantity'] !== $item["quantity"] ||
        $currentRow['unit'] !== $item["unit"] ||
        $currentRow['obtained'] !== $item["obtained"]
        )
    ){
        $stmtUpdate -> execute([
            'id' => $item["id"],
            'product' => $item["product"],
            'quantity' => $item["quantity"],
            'unit' => $item["unit"],
            'obtained' => $item['obtained']
        ]);
    }
}

$pdo->commit();

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Basket updated successfully!"]);
exit;

?>