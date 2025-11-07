<?php 

function parseRequest(){

    $resource = [];
    $method = $_SERVER["REQUEST_METHOD"];
    $contentType = $_SERVER["CONTENT_TYPE"] ?? "";

    if($method === "GET"){
        $endpoint = $_GET["endpoint"] ?? null;
        $resource = [ "endpoint" => $endpoint ];
        if($_GET["image"] !== null){
            $resource["image"] = $_GET["image"];
        }
    }
    else if(stripos($contentType, "application/json") !== false){
        $input = json_decode(file_get_contents("php://input"), true);
        $endpoint = $input["endpoint"] ?? null;
        $resource = [
                "endpoint" => $endpoint,
                "input" => $input["data"]
        ];

    }
    else if(stripos($contentType, "multipart/form-data") !== false){
        $endpoint = $_POST["endpoint"] ?? null;
        $isUpdate = isset($_POST["update"]) && $_POST["update"] === "true";
        $data = json_decode($_POST["data"], true) ?? null;
        /*    
        error_log("POST KEYS:" . implode(", ", array_keys($_POST)));
        error_log("POST DATA:\n" . print_r($_POST, true));
        error_log("FILE KEYS:" . implode(",", array_keys($_FILES)));
        error_log("FILE \n" . print_R($_FILES, true));
        */
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
            $payloadData = verifyToken();
            $uploadDir = getEndpointPath($payloadData["userID"], "uploads");

        // Create upload directory if missing
            if (!is_dir($uploadDir)) {
                if (!mkdir($uploadDir, 0770, true)) {
                    error_log("Failed to create upload directory: $uploadDir");
                }
            }

            $extension = pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION);
            $randomName = hash('sha256', $_FILES["image"]["name"] . microtime(true) . random_bytes(8));
            $filename = $randomName . '.' . $extension;
            $targetPath = $uploadDir . $filename;
        
            if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {
                $data["image"] = $filename;
            } else {
                error_log("Failed to move uploaded file from {$_FILES['image']['tmp_name']} to $targetPath");
            }
        }
        
        $resource = [
            "endpoint" => $endpoint,
            "input" => $data,
            "isUpdate" => $isUpdate
        ];
    };
        
    //echo json_encode(["resources in requesthandler" => $resource]);
    if(!isset($resource["endpoint"])){
        echo json_encode(["error" => "Critical error with fetch!"]);
        exit;
    };

    return $resource;
}
?>
