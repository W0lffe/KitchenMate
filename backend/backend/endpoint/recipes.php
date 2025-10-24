<?php 

function handleRequest($resource){

$api = $resource["endpoint"];
$paths = getEndpointPath($resource["user"], $api);

//echo json_encode(["Recipes paths" => $paths]);

if(is_dir($paths["userDir"]) && file_exists($paths["endpointFile"])){
    //echo json_encode(["success" => "Dir and file exist!"]);

    $resource = [
        "endpoint" => $paths["endpointFile"], 
        "user" => $resource["user"],
        "api" => $api, 
        "data" => $resource["input"]
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
    echo json_encode(["error" => "Directory or file does not exist!", "Requested:" => [$resource["user"], $api]]);
    exit;
}
}
?>