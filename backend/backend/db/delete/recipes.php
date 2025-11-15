<?php 

/**
 * This file handles DELETE for recipes
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$message = "Recipe";
if(isset($resource["data"]["dependencies"])){
    $dependencies = $resource["data"]["dependencies"];
    $stmtDep = $pdo->prepare("
        DELETE FROM dishes
        WHERE id = :id
    ");
    foreach ($dependencies as $dep) {
        $stmtDep->execute(["id" => (int)$dep]);
    }

    $message = "Selected items";
}

$stmtDelRec = $pdo->prepare("
    DELETE FROM recipes 
    WHERE id = :id
");

$stmtDelRec->execute([
    "id" => (int)$data["id"]
]);

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["success" => "$message deleted successfully!"]);
exit;

?>