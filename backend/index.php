<?php 

//https://kitchenmate-efe45.web.app
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$resource = [];
$endpoint = "";

if($_SERVER["REQUEST_METHOD"] === "GET"){
    $user = $_GET["user"] ?? null;
    $endpoint = $_GET["endpoint"] ?? null;
    $resource = [
        "user" => $user,
        "endpoint" => $endpoint
    ];
}
else{
    $input = json_decode(file_get_contents("php://input"), true);
    $user = $input["user"] ?? null;
    $endpoint = $input["endpoint"] ?? null;
    $resource = [
            "user" => $user,
            "endpoint" => $endpoint,
            "input" => $input
    ];
};

if(!isset($resource["user"]) || !isset($endpoint)){
    echo json_encode(["error" => "Critical error with fetch!"]);
    exit;
};

//echo json_encode(["Resources at index.php:" => $resource]);

require_once __DIR__ . "/util/helpers.php";
require_once __DIR__ . "/util/methods.php";
$endpointFile = __DIR__ . "/endpoint/$endpoint.php";

if(file_exists($endpointFile)){
    require_once $endpointFile;
    handleRequest($resource);
}
else{
    echo json_encode(["error" => "Error with endpoint: ${endpoint}"]);
}

?>