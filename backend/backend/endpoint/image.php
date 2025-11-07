<?php 

function handleRequest($resource){

    $tokenPayload = verifyToken();
    $image = $resource["image"];
    $uploadDir = getEndpointPath($tokenPayload["userID"], "uploads");

    $imagePath = $uploadDir . $image;

     if (file_exists($imagePath)) {
        // Set headers for the correct image type (you may need to adjust this based on your image type)

        //echo json_decode(["found image" => "yes"]);
        header('Content-Type: ' . mime_content_type($imagePath));
        header('Content-Length: ' . filesize($imagePath));
        
        // Read the file and send it to the output buffer
        readfile($imagePath);
        
        // Stop the script to prevent additional output
        exit;
    } else {
        // If file doesn't exist, send a 404 error
        echo json_encode(["error" => "Image not found."]);
        exit;
    }
}

?>