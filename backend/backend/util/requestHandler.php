<?php 
/**
 * Function to parse incoming request and return array of resources needed for handling the request
 * @return Array of resources, contains endpoint, inputted data, possible image, and a possible flag of update
 */
function parseRequest(){

    $resource = []; //init empty array
    $method = $_SERVER["REQUEST_METHOD"]; //request method
    $contentType = $_SERVER["CONTENT_TYPE"] ?? ""; //get content-type

    
    if($method === "GET"){
        $endpoint = $_GET["endpoint"] ?? null; //parse endpoint from url
        $resource = [ "endpoint" => $endpoint ]; //set to resources

        //if image string exists in url, add to resources
        if($_GET["image"] !== null){
            $resource["image"] = $_GET["image"];
        }
    }
    else if(stripos($contentType, "application/json") !== false){
        $input = json_decode(file_get_contents("php://input"), true); //Get json data
        $endpoint = $input["endpoint"] ?? null; //Parse endpoint from input data
        
        //Add resources
        $resource = [
                "endpoint" => $endpoint,
                "input" => $input["data"]
        ];

    }
    else if(stripos($contentType, "multipart/form-data") !== false){
        $endpoint = $_POST["endpoint"] ?? null; //Parse endpoint from formData
        $isUpdate = isset($_POST["update"]) && $_POST["update"] === "true"; //Check for update flag, needed to update dishes, because dishes are posted with formData if there is image -> php does not parse PUT requests?
        $data = json_decode($_POST["data"], true) ?? null; //Get inputted data
       
        //If formData has files
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK && $endpoint !== "users") {
            $payloadData = verifyToken(); //Verify user with token
            $uploadDir = getUpload($payloadData["userID"], null, true);
            $data["image"] = handleIncomingImage($uploadDir);
        }
        
        //Add resources
        $resource = [
            "endpoint" => $endpoint,
            "input" => $data,
            "isUpdate" => $isUpdate
        ];
    };
        
    //echo json_encode(["resources in requesthandler" => $resource]);

    //If resources doesnt have endpoint, send error message and exit
    if(!isset($resource["endpoint"])){
        http_response_code(400); //Bad request
        header('Content-Type: application/json');
        echo json_encode(["error" => "Invalid resources - invalid payload!"]);
        exit;
    };

    //Return array of resources
    return $resource;
}
?>