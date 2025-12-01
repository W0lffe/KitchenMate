<?php

/**
 * Function to get upload directory or uploaded file as a string
 * @param string $user ID of user
 * @param string $image image file name
 * @param boolean $initializing, if initializing directories
 * 
 * 
 * 
 * @return string absolute path to upload dir/uploaded file
 */
function getUpload($user, $image, $initializing) {

    //echo getcwd();
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $baseDir = $config["uploads"]["dir"];

    if($initializing){
        return $baseDir . "/" . (string)$user;
    }

    $filePath = $baseDir . "/" . (string)$user . "/" . $image;
    return $filePath;    
}

/**
 * Function handles saving and renaming of image file incoming from client
 * @param string $uploadDir path to upload directory
 */
function handleIncomingImage($uploadDir){

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
    $targetPath = $uploadDir . "/" . $filename; //Target to save image
        
    if (move_uploaded_file($_FILES["image"]["tmp_name"], $targetPath)) {
        return $filename;
    } 
    else {
        error_log("Failed to move uploaded file from {$_FILES['image']['tmp_name']} to $targetPath");
    }
}

function generateRecoveryCode(){
    $len = 11;
    $characters = implode("", array_merge(
        range('A', 'Z'),
        range('a', 'z'),
        range('0', '9')
    ));

    $code = "";

    //echo json_encode($characters);

    for($i = 0; $i < $len; $i++){
        if($i === 5){
            $code .= "-";
        }
        else{
            $index = random_int(1, strlen($characters) - 1);
            $code .= $characters[$index];
        }
    }

    //echo json_encode($code);

    return $code;
}

function validatePasswd($pass){

    if(strlen($pass) === 0){
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["error" => "Please enter a password."]);
        exit;
    }

    if(strlen($pass) < 10){
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["error" => "Password is too short."]);
        exit;
    }
}

?>