<?php 

/**
 * This file handles SELECT querys for dishes, fetches dishes belonging to userID and subquerys components belonging to dishID
 */
require __DIR__ . "/../connection.php";

$userID = $resource["id"];

$sql = "
    SELECT
        d.id AS dishID,
        d.name,
        d.course,
        d.date,
        d.favorite,
        d.image,
        c.id AS compID,
        c.componentID AS recipeID,
        c.dishID
    FROM dishes d
    LEFT JOIN components c ON c.dishID = d.id
    WHERE d.userID = :id
    ORDER BY d.id
";

$stmt = $pdo->prepare($sql);
$stmt->execute(['id' => $resource["id"]]);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);
$dishes = [];

$dIndex = [];
$compIds = [];

foreach ($results as $row){
    
    $dishID = $row["dishID"];

    if(!isset($dIndex[$dishID])){
        $dIndex[$dishID] = count($dishes);

        $dishes[] = [
            "id" => $dishID,
            "name" => $row["name"],
            "course" => $row["course"],
            "date" => $row["date"],
            "favorite" => $row["favorite"],
            "image" => $row["image"],
            "components" => []
        ];
    }

    $index = $dIndex[$dishID];

    if($row["recipeID"] !== null && !isset($compIds[$dishID][$row["recipeID"]])){
        $compIds[$dishID][$row["recipeID"]] = true;

        $dishes[$index]["components"][] = $row["recipeID"];
    }
}

unset($stmt);
http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["data" => $dishes]);
exit;
?> 