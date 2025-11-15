<?php 
function handleRequest($resource){

    //Verify user from token
    $tokenPayload = verifyToken();

    $image = basename($resource["image"]);

    if(!isset($image)){
        ttp_response_code(400); //Bad request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Invalid resources - invalid payload."]);
        exit;
    }

    $file = getUpload($tokenPayload["userID"], $image, false);

    if (file_exists($file)) {
        
        //http_response_code(200); //OK
        header('Content-Type: ' . mime_content_type($file));
        header('Content-Length: ' . filesize($file));
        ob_end_clean();
        //"Send" image to client
        readfile($file);
        flush();
        exit;
    } else {
        http_response_code(404); //Not found
        header("Content-Type: application/json");
        echo json_encode(["error" => "Image not found."]);
        exit;
    }
}
?>