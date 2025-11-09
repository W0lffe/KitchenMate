<?php 

/**
 * This file handles DELETE for basket
 */

require_once __DIR__ . "/../connection.php";


//ADD CHECK IF DELETING SINGULAR ITEM OR WHOLE ARRAY
$stmt = $pdo->prepare("
    DELETE FROM basket 
    WHERE itemID = :itemID
");

$stmt->execute([
    "itemID" => $itemID
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "Product deleted"]);
exit;

?>