<?php

function createToken($userID){

    $header = base64_encode(json_encode(["alg" => "HS256", "typ" => "JWT"]));
    $payload = base64_encode(json_encode([
        "userID" => $userID,
        "exp" => time() + 3600
    ]));

    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true); 
    $secret = $config["secret"]["secret"];
    $signature = hash_hmac('sha256', "$header.$payload", $secret, true);
    $signatureEncoded = base64_encode($signature);

    $token = "$header.$payload.$signatureEncoded";
    return $token;
}

function verifyToken(){
   
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $headers = getallheaders();

    if (!isset($headers['Authorization'])) {
        echo json_encode(["tkn_err" => "Invalid token!"]);
        exit;
    }

    list($type, $token) = explode(" ", $headers['Authorization'], 2);
    if ($type !== "Bearer" || !$token) {
        echo json_encode(["tkn_er" => "Invalid token!"]);
        exit;
    }

    list($header, $payload, $signature) = explode(".", $token);
    $secret = $config["secret"]["secret"];
    $validSignature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true));
    if ($signature !== $validSignature) {
        echo json_encode(["tkn_er" => "Invalid token!"]);
        exit;
    }

    $payloadData = json_decode(base64_decode($payload), true);
    if ($payloadData["exp"] < time()) {
        echo json_encode(["tkn_er" => "Token expired. Please log in again."]);
        exit;
    }

    return $payloadData;
}

function initDataDir(){

    //echo getcwd();

    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true); 
    $data = $config["paths"]["data"]; 
    $dataPoint = $config["paths"]["data_point"];
    $userFile = $config["files"]["user_file"];
/*
    echo json_encode(["data dir" => $data]);
    echo json_encode(["datapoint dir" => $dataPoint]);
    echo json_encode(["userfile " => $userFile]);
*/

    if(is_dir($data) && is_dir($dataPoint) && file_exists($userFile)){
        return true;
    }
    else{
        if(!mkdir($data, 0770, true)){
            return false;
        }
        if(!mkdir($dataPoint, 0770, true)){
            return false;
        }
        if(!file_put_contents($userFile, json_encode([]))){
            return false;
        }
        if((!chmod($userFile, 0770))){
            return false;
        }
    }
}

function getEndpointPath($user, $endpoint) {

    //echo getcwd();
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $dataPath = $config["paths"]["data_point"];
    $userFile = $config["files"]["user_file"];
    $userDir = "$dataPath/$user";
    
    if($endpoint === "users"){
        return [
            "userFile" => $userFile,
            "dataPath" => $dataPath
        ];
    }
    else if($endpoint === "uploads"){
        return "$dataPath/$user/uploads/";
    }
    else{
        return [
            "userDir" => $userDir, 
            "endpointFile" => "$dataPath/$user/$endpoint.json"
        ];
    }
}

function initEndpoints($dir, $dataPath){

    $path = "$dataPath/$dir";
    $ep = ["recipes.json", "dishes.json", "basket.json"];

    if(!mkdir($path, 0770, true)){
        return false;
    }

    foreach ($ep as $endpoint) {
        if(!file_put_contents("$path/$endpoint", json_encode([]))){
            return false;
        }

        if((!chmod("$path/$endpoint", 0770))){
            return false;
        }
    };

    return true;
} 

function checkDuplicates($data, $existingData){

    $nextID = count($existingData) + 1;

    foreach ($data as $newItem) {
        $itemFound = false;

        foreach ($existingData as &$existingItem) {
            $sameProduct = strtolower($newItem["product"]) === strtolower($existingItem["product"]);
            $sameUnit = strtolower($newItem["unit"]) === strtolower($existingItem["unit"]);
            
            if($sameProduct && $sameUnit){
                $newQuantity = intval($existingItem["quantity"]) + intval($newItem["quantity"]);
                $existingItem["quantity"] = $newQuantity;
                $itemFound = true;
                break;
            }
        }

        if($itemFound === false){
            $newItem["id"] = $nextID;
            array_push($existingData, $newItem);
            $nextID++;
        }

    }
  
    return $existingData;
}

function getResponse($api){

    if($api === "recipes"){
        return "Recipe";
    }
    if($api === "dishes"){
        return "Dish";
    }
    if($api === "basket"){
        return "Products";
    }
}

function renumberIds($data){


    $nextID = 1;

    for ($i=0; $i < count($data); $i++) { 
        //echo json_encode(["renumbering " => $data[$i]]);
        $data[$i]["id"] = $nextID;
        $nextID++;
    }

    return $data;
}

function findIndex($data, $existingData){
    $index = null;
    
    foreach ($existingData as $i => $existingItem) {
        if($existingItem["id"] === $data["id"]){
            $index = $i;
            break;
        }
    }

    return $index;
}


?>