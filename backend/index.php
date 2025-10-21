<?php 

//error_log("UPLOAD MAX FILESIZE: " . ini_get('upload_max_filesize'));
//error_log("POST MAX SIZE: " . ini_get('post_max_size'));

//https://kitchenmate-efe45.web.app
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . "/util/helpers.php";
require_once __DIR__ . "/util/requestHandler.php";
require_once __DIR__ . "/util/methods.php";

if(!initDataDir()){
    echo json_encode(["error" => "Critical error initiating data directories!"]);
    exit;
}

$resource = parseRequest();

//echo json_encode(["Resources at index.php:" => $resource]);

$endpointFile = __DIR__ . "/endpoint/" . $resource["endpoint"] . ".php";

if(file_exists($endpointFile)){
    require_once $endpointFile;
    handleRequest($resource);
}
else{
    echo json_encode(["error" => "Error with endpoint: {$resource["endpoint"]}"]);
}

?>
