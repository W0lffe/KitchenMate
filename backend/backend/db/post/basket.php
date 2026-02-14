<?php 

/**This file is to handle INSERT for basket */

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$userID = $resource["id"];

$stmt = $pdo->prepare("
    SELECT * FROM basket
    WHERE userID = :userID"
);

$stmt->execute(["userID" => $userID]);
$basket = $stmt->fetchAll(PDO::FETCH_ASSOC);

if(count($basket) > 0 ){

    $normalizedItems = normalizeBasketItems($basket, $data);
}


try {

    $message = "Product";
    if(count($data) > 1){
        $message = "Products";
    }

    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        INSERT INTO basket (userID, product, quantity, unit, obtained)
        VALUES (:userID, :product, :quantity, :unit, 0)
        ON DUPLICATE KEY UPDATE
            quantity = quantity + VALUES(quantity)
    ");

    foreach ($data as $product) {
        $stmt->execute([
            "userID" => $userID,
            "product" => $product["product"],
            "quantity" => $product["quantity"],
            "unit" => $product["unit"]
        ]);
    }

    $pdo->commit();
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "$message added to basket successfully!"]);
} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to post products.", "debug" => $th->getMessage()]);
} finally{
    unset($pdo);
}
?>