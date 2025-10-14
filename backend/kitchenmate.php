<?php 

//https://kitchenmate-efe45.web.app
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$user = $_GET["user"];
$endpoint = $_GET["endpoint"];

if(!isset($user) || !isset($endpoint)){
    echo json_encode(["error" => "Critical error with fetch!"]);
    exit;
};

$config = parse_ini_file("./config.ini", true);
$dataPath = $config["paths"]["data_point"];
$userDir = "./$dataPath/$user";
$endpoint_path = "./$dataPath/$user/$endpoint.json";

$operation = $_SERVER["REQUEST_METHOD"];

switch($operation){

    case "GET":
        getData($userDir, $endpoint_path);
        break;
    case "POST":
        postData($userDir, $endpoint_path, $endpoint);
        break;
    case "PUT":
        updateData($userDir, $endpoint_path, $endpoint);
        break;
    case "DELETE":
        deleteData($userDir, $endpoint_path);
        break;
}

function deleteData($userDir, $endpoint_path){

    if(is_dir($userDir) && file_exists($endpoint_path)){
        $input = file_get_contents("php://input");
        $decodedInput = json_decode($input, true);
        //echo json_encode(["Input" => $decodedInput]);

        $existingData = json_decode(file_get_contents($endpoint_path), true);
        //echo json_encode(["existing data" => $existingData]);

        $index = null;
        foreach($existingData as $existing){
            if($existing["id"] === $decodedInput["id"]){
                $index = array_search($existing, $existingData, true);
                //echo json_encode(["found index" => $index]);
                break;
            }
        }

        if($index !== null){
            array_splice($existingData, $index, 1);

            $newID = 1;
            for($i = 0; $i < count($existingData); $i++){
                $existingData[$i]["id"] = $newID;
                $newID++;
            }

            if(file_put_contents($endpoint_path, json_encode($existingData, JSON_PRETTY_PRINT))){
                echo json_encode(["success" => "Data deleted successfully!"]);
                exit;
            }
            else{
                echo json_encode(["error" => "Data could not be deleted."]);
                exit;
            }
        }
        else{
            echo json_encode(["error" => "Data could not be deleted."]);
            exit;
        }
    }
    else{
        echo json_encode(["error" => "Data could not be deleted: Directory/file does not exist."]);
        exit;
    }
}

function updateData($userDir, $endpoint_path, $endpoint){

    if(is_dir($userDir) && file_exists($endpoint_path)){

        $input = file_get_contents("php://input");
        $decodedInput = json_decode($input, true);
        //echo json_encode(["Input" => $decodedInput]);

        $id = $decodedInput["updatedItem"]["id"] ?? $decodedInput["id"];
        //echo json_encode(["ID" => $id]);

        $isBasketUpdate = isset($decodedInput["update"]) && $decodedInput["update"];

        $existingData = json_decode(file_get_contents($endpoint_path), true);
        //echo json_encode(["existing data" => $existingData]);

        if($endpoint === "basket" && !$isBasketUpdate){
            $existingData = $decodedInput;
            //echo json_encode(["Updated basket" => $existingData]);
        }
        else{
            $index = null;

            foreach($existingData as $existing){
                if($existing["id"] === $id){
                    //echo json_encode(["looping" => $existing]);
                    $index = array_search($existing, $existingData, true);
                    //echo json_encode(["found index" => $index]);
                    break;
                }
            }
            if($index !== null){
                //echo json_encode(["found index data" => $existingData[$index]]);
                $existingData[$index] = $decodedInput["updatedItem"] ?? $decodedInput;
                //echo json_encode(["after updating" => $existingData]);
            }
            else{
                echo json_encode(["error" => "Data could not be updated."]);
                exit;
            }
        }
        
        if(file_put_contents($endpoint_path, json_encode($existingData, JSON_PRETTY_PRINT))){
            echo json_encode(["success" => "Data updated successfully!"]);
            exit;
        }
        else{
            echo json_encode(["error" => "Data could not be updated."]);
            exit;
        }
    }
    else{
        echo json_encode(["error" => "Data could not be updated: Directory/file does not exist."]);
        exit;
    }
}

function getData($userDir, $endpoint_path){

    if(is_dir($userDir) && file_exists($endpoint_path)){
        $data = json_decode(file_get_contents($endpoint_path), true);
        if($data === null){
            $data = [];
        }
        echo json_encode(["data" => $data]);
        exit;
    }
    else{
        echo json_encode(["error" => "Data could not be retrieved: Directory/file does not exist."]);
        exit;
    }
}

function postData($userDir, $endpoint_path, $endpoint){

    if(is_dir($userDir) && file_exists($endpoint_path)){

        $input = file_get_contents("php://input");
        $decodedInput = json_decode($input, true);

        $data = json_decode(file_get_contents($endpoint_path), true);
        if($data === null){
            $data = [];
        }

        $startingID = count($data) + 1;

        if($endpoint === "basket"){

            if(count($data) === 0){
                for($i = 0; $i < count($decodedInput); $i++){
                    $decodedInput[$i]["id"] = $startingID;
                    $startingID++;
                }
         
                $data = array_merge($data, $decodedInput);
            }
            else{
                $checkedData = checkDuplicates($decodedInput, $data);
                $data = $checkedData;
            }   
        }
        else{
            $decodedInput["id"] = $startingID;
            array_push($data, $decodedInput);
        }


        if(file_put_contents($endpoint_path ,json_encode($data, JSON_PRETTY_PRINT))){
            echo json_encode(["success" => "Data saved successfully!"]);
            exit;
        }
        else{
            echo json_encode(["error" => "Data could not be saved."]);
            exit;
        }
    }
    else{
        echo json_encode(["error" => "Data could not be saved: Directory/file does not exist."]);
        exit;
    }
}


function checkDuplicates($decodedInput, $data){

    $startingID = count($data) + 1;

    foreach ($decodedInput as $newItem) {
        $itemFound = false;

        foreach ($data as &$existingItem) {
            if(strtolower($newItem["product"]) === strtolower($existingItem["product"])){
                $newQuantity = intval($existingItem["quantity"]) + intval($newItem["quantity"]);
                $existingItem["quantity"] = $newQuantity;
                $itemFound = true;
                break;
            }
        }

        if($itemFound === false){
            $newItem["id"] = $startingID;
            array_push($data, $newItem);
            $startingID++;
        }

    }
  
    return $data;
}
?>