<?php 

function parseRequest(){

    $resource = [];
    $method = $_SERVER["REQUEST_METHOD"];
    $contentType = $_SERVER["CONTENT_TYPE"] ?? "";

    if($method === "GET"){
        $user = $_GET["user"] ?? null;
        $endpoint = $_GET["endpoint"] ?? null;
        $resource = [
            "user" => $user,
            "endpoint" => $endpoint
        ];
    }
    else if(stripos($contentType, "application/json") !== false){
        $input = json_decode(file_get_contents("php://input"), true);
        $user = $input["user"] ?? null;
        $endpoint = $input["endpoint"] ?? null;
        $resource = [
                "user" => $user,
                "endpoint" => $endpoint,
                "input" => $input["data"]
        ];
    }
    else if(stripos($contentType, "multipart/form-data") !== false){
        $user = $_POST["user"] ?? null;
        $endpoint = $_POST["endpoint"] ?? null;
        $data = json_decode($_POST["data"], true) ?? null;
            
        error_log("POST KEYS:" . implode(", ", array_keys($_POST)));
        error_log("POST DATA:\n" . print_r($_POST, true));
        error_log("FILE KEYS:" . implode(",", array_keys($_FILES)));
        error_log("FILE \n" . print_R($_FILES, true));
        
        if (isset($_FILES["image"]) && $_FILES["image"]["error"] === UPLOAD_ERR_OK) {
        $uploadDir = getEndpointPath($user, "uploads");

        // Create upload directory if missing
        if (!is_dir($uploadDir)) {
            if (!mkdir($uploadDir, 0770, true)) {
                error_log("Failed to create upload directory: $uploadDir");
            }
        }

        // Sanitize filename to avoid special chars
        $filename = preg_replace("/[^a-zA-Z0-9\._-]/", "_", $_FILES["image"]["name"]);
        $targetPath = $uploadDir . $filename;

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {
            $data["image"] = $targetPath;
            error_log("File uploaded successfully to $targetPath");
        } else {
            error_log("Failed to move uploaded file from {$_FILES['image']['tmp_name']} to $targetPath");
        }
        } elseif (isset($_FILES["image"])) {
            error_log("Image upload error code: " . $_FILES["image"]["error"]);
        }
        
        $resource = [
            "user" => $user,
            "endpoint" => $endpoint,
            "input" => $data
        ];
    };
        
  // echo json_encode(["error" => $resource]);
    if(!isset($resource["user"]) || !isset($resource["endpoint"])){
        echo json_encode(["error" => "Critical error with fetch!"]);
        exit;
    };

    return $resource;
}
?>
