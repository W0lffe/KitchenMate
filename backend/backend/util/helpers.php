<?php

/**
 * Function to initiate data directories on server
 * @return bool True or false, depends if procedure was success or failure
 */
function initDataDir(){

    //echo getcwd();

    //Parse config file and required files and paths
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


/**
 * Function to get endpoint paths and files from config file
 * @param mixed $user ID of user
 * @param mixed $endpoint desired endpoint
 * 
 * @return Array of paths and files
 */
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


/**
 * Function to initiate endpoints for new user
 * @param string directory name
 * @param string path where to create directory
 * 
 * @return bool true or false, depends if procedure was success or failure
 */
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

/**
 * Function to loop through two arrays to check if existing data already has items that is currently being posted to server
 * @param Array $data new data array
 * @param Array $existingData existing data on server
 * 
 * @return Array new array with updated products
 */
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


/**
 * Simple function to return api string
 * @param string $api endpoint
 * 
 * @return string String to represent the action for return message
 */
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


/**
 * Function to renumber array ID column
 * @param Array $data array of data to renumber
 * 
 * @return Array renumbered data array
 */
function renumberIds($data){


    $nextID = 1;

    for ($i=0; $i < count($data); $i++) { 
        //echo json_encode(["renumbering " => $data[$i]]);
        $data[$i]["id"] = $nextID;
        $nextID++;
    }

    return $data;
}


/**
 * Function to find index in array with ID number
 * @param Object $data an item object
 * @param Array $existingData an array of objects
 * 
 * @return Number found index number or null if not found
 */
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