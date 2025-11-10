<?php 

/**This file is to handle INSERT for basket */

require_once __DIR__ . "/../connection.php";

$stmt = $pdo->prepare("
        INSERT INTO basket 
        (product, quantity, unit, userID)
        VALUES 
        (:product, :quantity, :unit, :userID)
    ");

foreach($data as $product){
    $stmt->execute([
        'product' => $product["product"],
        'quantity' => $product["quantity"],
        'unit'=> $product["unit"],
        'userID' => $userID
    ]);
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Products saved successfully!"]);
exit;

?>