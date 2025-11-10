<?php 

function handleRequest($resource){

    require_once __DIR__ . "/../db/select.php";
    require_once __DIR__ . "/../db/insert.php";
    require_once __DIR__ . "/../db/delete.php";
    require_once __DIR__ . "/../db/update.php";

//Verify user from token
$tokenPayload = verifyToken();

//echo json_encode(["Resources " => $resource]);

if(isset($resource["endpoint"])){

    $resource = [
        "endpoint" => $resource["endpoint"], 
        "data" => $resource["input"] ?? null,
        "id" =>  $tokenPayload["userID"]
    ];
    $method = $_SERVER["REQUEST_METHOD"];

    //echo json_encode(["Resources at recipes.php:" => $resource]);

    switch($method){

    case "GET":
        getData($resource);
        break;
    case "POST":
        postData($resource);
        break;
    case "PUT":
        updateData($resource);
        break;
    case "DELETE":
        deleteData($resource);
        break;
    }
}
else{
    http_response_code(404); //Not found
    header("Content-Type: application/json");
    echo json_encode(["error" => "Invalid resources."]);
    exit;
}
}
?>