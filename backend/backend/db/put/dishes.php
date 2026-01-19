<?php 

/**
 * This file handles UPDATE querys of dishes,
 */

require __DIR__ . "/../connection.php";

$data = $resource["data"];
$dishID = $data["id"];
$components = $data["components"];

try {

    $stmt = $pdo->prepare("SELECT 1 FROM dishes WHERE id = :id");
    $stmt->execute(["id" => $dishID]);
    
    if(!$stmt->fetchColumn()){
        throw new RuntimeException('Dish not found');
    }
    unset($stmt);
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("
        UPDATE dishes
        SET 
            name = :name,
            course = :course,
            favorite = :favorite,
            image = :image
        WHERE id = :id
    ");

    $stmt->execute([
        'name' => (string)$data["name"],
        'course' => (string)$data["course"],
        'favorite' => (int)$data["favorite"],
        'image' => $data["image"] ?? null,
        'id' => $data["id"]
    ]);

    $stmt = $pdo->prepare("DELETE FROM components WHERE dishID = :id");
    $stmt->execute(["id" => $dishID]);
    unset($stmt);

    if(!empty($components)){
        
        $values = [];
        $parameters = ["dishID" => $dishID];

        foreach ($components as $i => $c) {
            $values[] = "(:componentID$i, :dishID)";
            $parameters["componentID$i"] = $c;
        }

        $sql = "INSERT INTO components (componentID, dishID)
                VALUES " . implode(", ", $values);

        $stmt = $pdo->prepare($sql);
        $stmt->execute($parameters);
        unset($stmt);
    }
    $pdo->commit();   
    http_response_code(200);
    header("Content-Type: application/json");
    echo json_encode(["success" => "Dish updated successfully!"]);
} catch (\Throwable $th) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }

    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Failed to update dish", "debug" => $th->getMessage()]);
} finally {
    unset($pdo);
}
?>