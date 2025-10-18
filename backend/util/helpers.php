<?php

function getEndpointPath($user, $endpoint) {

    //echo getcwd();
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $dataPath = $config["paths"]["data_point"];
    $userDir = "$dataPath/$user";
    $paths = [
        "userDir" => $userDir, 
        "endpointFile" => "$dataPath/$user/$endpoint.json"
    ];
    return $paths;
}

function checkDuplicates($data, $existingData){

    $nextID = count($existingData) + 1;

    foreach ($data as $newItem) {
        $itemFound = false;

        foreach ($existingData as &$existingItem) {
            if(strtolower($newItem["product"]) === strtolower($existingItem["product"])){
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