<?php 

/**This file is to handle INSERT for basket */

require __DIR__ . "/../connection.php";

$data = $resource["data"];

$resMsg = "Product";

if(count($data) > 1){
    $resMsg = "Products";
}

$stmtSelect = $pdo->prepare("
    SELECT * FROM basket
    WHERE userID = :id
");

$stmtInsert = $pdo->prepare("
    INSERT INTO basket 
    (product, quantity, unit, obtained, userID)
    VALUES 
    (:product, :quantity, :unit, :obtained, :userID)
"); 



$stmtSelect->execute(["id" => $resource["id"]]);
$existingProducts = $stmtSelect->fetchAll(PDO::FETCH_ASSOC);

if(count($existingProducts) === 0){

    foreach ($data as $product) {
        $stmtInsert->execute([
            'product' => $product["product"],
            'quantity' => $product["quantity"],
            'unit'=> $product["unit"],
            'obtained' => 0,
            'userID' => $resource["id"]
        ]);
    }

}
else {

    $stmtSelect = $pdo->prepare("
        SELECT * FROM basket
        WHERE userID = :id
    ");

    $stmtUpdate = $pdo->prepare("
        UPDATE basket
        SET 
            quantity = :quantity
        WHERE id = :id
    ");

    foreach ($data as $product) {
        $productFound = false;

        foreach ($existingProducts as $existingProduct) {
            if ($existingProduct["product"] === $product["product"] && $existingProduct["unit"] === $product["unit"]) {
                $newQuantity = $existingProduct["quantity"] + $product["quantity"];

                $stmtUpdate->execute([
                    'quantity' => $newQuantity,
                    'id' => $existingProduct["id"]
                ]);

                $productFound = true;
                break; 
            }
        }

        if (!$productFound) {
            $stmtInsert->execute([
                'product' => $product["product"],
                'quantity' => $product["quantity"],
                'unit' => $product["unit"],
                'obtained' => 0,  
                'userID' => $resource["id"]
            ]);
        }
    }
}
http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "$resMsg added to basket successfully!"]);
exit;

?>