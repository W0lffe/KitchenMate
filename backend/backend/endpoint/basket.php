<?php 

function handleRequest($resource){

require_once __DIR__ . "/../db/select.php";
require_once __DIR__ . "/../db/insert.php";
require_once __DIR__ . "/../db/delete.php";
require_once __DIR__ . "/../db/update.php";
    
//Verify user from token
$tokenPayload = verifyToken();
if(isset($resource) && isset($tokenPayload["userID"])){
    //echo json_encode(["success" => "Dir and file exist!"]);

    $resource = [
        "endpoint" => $resource["endpoint"],
        "data" => $resource["input"],
        "id" => $tokenPayload["userID"]
    ];
    $method = $_SERVER["REQUEST_METHOD"];

    //echo json_encode(["Resources at basket.php:" => $resource]);

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