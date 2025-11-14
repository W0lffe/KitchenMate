<?php 

//https://kitchenmate-efe45.web.app
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

/**
 * Define required backend files
 */
require_once __DIR__ . "/../backend/util/helpers.php";
require_once __DIR__ . "/../backend/util/requestHandler.php";
require_once __DIR__ . "/../backend/util/token.php";
require_once __DIR__ . "/../backend/db/table.php";

if($_SERVER["REQUEST_METHOD"] === "OPTIONS"){
    http_response_code(200);
    exit;
}

/**
 * Initialize data directories, if not successfull, return error message and exit
 */
if(!createTables()){
    http_response_code(500); //Server side error
    header('Content-Type: application/json');
    echo json_encode(["error" => "Critical error initiating database!"]);
    exit;
} 

/**
 * Parse incoming request
 */
$resource = parseRequest();

//echo json_encode(["Resources at index.php:" => $resource]);

/**
 * Determine which endpoint file to use, uses parsed resource
 */
$endpointFile = __DIR__ . "/../backend/endpoint/" . $resource["endpoint"] . ".php";

if(file_exists($endpointFile)){
    require_once $endpointFile;
    handleRequest($resource);
}
else{
    http_response_code(400); // Bad request
    header('Content-Type: application/json');
    echo json_encode(["error" => "Error with endpoint: {$resource["endpoint"]}"]);
    exit;
}

?>