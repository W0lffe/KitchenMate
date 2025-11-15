<?php 

/**
 * This file handles DELETE for basket
 */

require __DIR__ . "/../connection.php";

$clearBasket = (is_array($resource["data"]) && count($resource["data"]) === 0);
$message = "Product";

if($clearBasket){
    $stmt = $pdo->prepare("
        DELETE FROM basket
        WHERE userID = :id
    ");

    $stmt->execute([
        "id" => $resource["id"]
    ]);
    $message = "Products";
}
else{
    $stmt = $pdo->prepare("
        DELETE FROM basket 
        WHERE id = :id
    ");
    $stmt->execute([
        "id" => (int)$resource["data"]["id"]
    ]);
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "$message deleted from basket succesfully!"]);
exit;

?>