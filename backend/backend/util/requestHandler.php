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
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
            $payloadData = verifyToken(); //Verify user with token
            $uploadDir = getEndpointPath($payloadData["userID"], "uploads"); //Get endpoint to save image to

        //Create upload directory if missing
            if (!is_dir($uploadDir)) {
                if (!mkdir($uploadDir, 0770, true)) {
                    http_response_code(500); //Server side error
                    header('Content-Type: application/json');
                    echo json_encode(["error" => "Failed to post image - missing directory."]);
                    exit;
                }
            }

            
            $extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION); //gets extension of image
            $randomName = hash('sha256', $_FILES["image"]["name"] . microtime(true) . random_bytes(8)); //Create hash of image name
            $filename = $randomName . '.' . $extension; //Rename file
            $targetPath = $uploadDir . $filename; //Target to save image
        
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {
                $data["image"] = $filename;
            } else {
                error_log("Failed to move uploaded file from {$_FILES['image']['tmp_name']} to $targetPath");
            }
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
        echo json_encode(["error" => "Critical error with fetch!"]);
        exit;
    };

    //Return array of resources
    return $resource;
}
?>
