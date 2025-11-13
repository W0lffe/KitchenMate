<?php 
function handleRequest($resource){

    //Verify user from token
    $tokenPayload = verifyToken();

    $image = basename($resource["image"]);
    $uploadDir = getEndpointPath($tokenPayload["userID"], "uploads");
    $imagePath = $uploadDir . $image;


/*
    echo json_encode(["image" => $image, "uploadDir" => $uploadDir, "imagePath" => $imagePath, "token" => $tokenPayload]);
    echo json_encode(file_exists($imagePath));

    exit;
*/
    if (file_exists($imagePath)) {
        
        //http_response_code(200); //OK
        header('Content-Type: ' . mime_content_type($imagePath));
        header('Content-Length: ' . filesize($imagePath));
        
        //"Send" image to client
        readfile($imagePath);
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