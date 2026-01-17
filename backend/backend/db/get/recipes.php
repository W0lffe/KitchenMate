<?php 


/**
 * This file handles SELECT querys for recipes, fetches recipes belonging to userID and subquerys instructions and ingredients belonging to recipeID
 */
require __DIR__ . "/../connection.php";

$userID = (int)$resource["id"];

$sql = "
    SELECT
        r.id AS recipeID,
        r.name AS recipeName,
        r.portions,
        r.output,
        r.outputType,
        r.time,
        r.timeFormat,
        r.favorite,
        r.date,
        r.category,
        i.product,
        i.quantity,
        i.unit,
        ins.instruction,
        ins.step
    FROM recipes r
    LEFT JOIN ingredients i ON i.recipeID = r.id
    LEFT JOIN instructions ins ON ins.recipeID = r.id
    WHERE r.userID = :userID
    ORDER BY r.id
";

$stmt = $pdo->prepare($sql);
$stmt->execute(["userID" => $userID]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$recipes = [];

foreach ($results as $row) {
    $rid = $row['recipeID'];

    if (!isset($recipeIndex[$rid])) {
        $recipeIndex[$rid] = count($recipes);

        $recipes[] = [
            'id' => $row['recipeID'],
            'name' => $row['recipeName'],
            'portions' => $row['portions'],
            'output' => $row['output'],
            'outputType' => $row['outputType'],
            'time' => $row['time'],
            'timeFormat' => $row['timeFormat'],
            'favorite' => (bool)$row['favorite'],
            'date' => $row['date'],
            'category' => $row['category'],
            'ingredients' => [],
            'instructions' => []
        ];
    }

    $idx = $recipeIndex[$rid];

    if ($row['product'] !== null) {
        $recipes[$idx]['ingredients'][] = [
            'product' => $row['product'],
            'quantity' => (float)$row['quantity'],
            'unit' => $row['unit']
        ];
    }

    if ($row['instruction'] !== null) {
        $recipes[$idx]['instructions'][] = $row['instruction'];
    }
}

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["data" => $recipes]);
exit;
?>