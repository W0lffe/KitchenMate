<?php 

//https://kitchenmate-efe45.web.app
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/../backend/util/helpers.php";
require_once __DIR__ . "/../backend/util/requestHandler.php";
require_once __DIR__ . "/../backend/util/methods.php";


if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit;
}

if(!initDataDir()){
    echo json_encode(["error" => "Critical error initiating data directories!"]);
    exit;
} 

$resource = parseRequest();

//echo json_encode(["Resources at index.php:" => $resource]);

$endpointFile = __DIR__ . "/../backend/endpoint/" . $resource["endpoint"] . ".php";

if(file_exists($endpointFile)){
    require_once $endpointFile;
    handleRequest($resource);
}
else{
    echo json_encode(["error" => "Error with endpoint: {$resource["endpoint"]}"]);
}

?>
