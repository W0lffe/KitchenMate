<?php 

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


$operation = $_SERVER["REQUEST_METHOD"];

switch($operation){

    case "GET":
        getData($user, $endpoint);
        break;
    case "POST":
        postData($user, $endpoint);
        break;
    case "PUT":
        updateData($user, $endpoint);
        break;
    case "DELETE":
        deleteData($user, $endpoint);
        break;
}

function deleteData($user, $endpoint){

    if(is_dir("./$user") && file_exists("./$user/$endpoint.json")){
        $input = file_get_contents("php://input");
        $decodedInput = json_decode($input, true);
        //echo json_encode(["Input" => $decodedInput]);

        $existingData = json_decode(file_get_contents("./$user/$endpoint.json"), true);
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

            if(file_put_contents("./$user/$endpoint.json", json_encode($existingData, JSON_PRETTY_PRINT))){
                echo json_encode(["success" => "Data saved successfully!"]);
            }
            else{
                echo json_encode(["error" => "Data could not be saved."]);
            }
        }
        else{
            echo json_encode(["error" => "Data could not be saved."]);
        }
    }
    else{
        echo json_encode(["error" => "Data could not be saved."]);
    }
}

function updateData($user, $endpoint){

    if(is_dir("./$user") && file_exists("./$user/$endpoint.json")){

        $input = file_get_contents("php://input");
        $decodedInput = json_decode($input, true);
        //echo json_encode(["Input" => $decodedInput]);

        $id = $decodedInput["updatedItem"]["id"] ?? $decodedInput["id"];
        //echo json_encode(["ID" => $id]);

        $isBasketUpdate = isset($decodedInput["update"]) && $decodedInput["update"];

        $existingData = json_decode(file_get_contents("./$user/$endpoint.json"), true);
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
                echo json_encode(["error" => "Data could not be saved."]);
                exit;
            }
        }
        
        if(file_put_contents("./$user/$endpoint.json", json_encode($existingData, JSON_PRETTY_PRINT))){
            echo json_encode(["success" => "Data saved successfully!"]);
            exit;
        }
        else{
            echo json_encode(["error" => "Data could not be saved."]);
            exit;
        }
    }
    else{
        echo json_encode(["error" => "Data could not be saved."]);
        exit;
    }
}

function getData($user, $endpoint){

    if(is_dir("./$user") && file_exists("./$user/$endpoint.json")){
        $data = json_decode(file_get_contents("./$user/$endpoint.json"), true);
        if($data === null){
            $data = [];
        }
        echo json_encode(["data" => $data]);
        exit;
    }
    else{
        echo json_encode(["error" => "Directory or file does not exist."]);
        exit;
    }
}

function postData($user, $endpoint){

    if(is_dir("./$user") && file_exists("./$user/$endpoint.json")){

        $input = file_get_contents("php://input");
        $decodedInput = json_decode($input, true);

        $data = json_decode(file_get_contents("./$user/$endpoint.json"), true);
        if($data === null){
            $data = [];
        }

        $startingID = count($data) + 1;

        if($endpoint === "basket"){

            for($i = 0; $i < count($decodedInput); $i++){
                $decodedInput[$i]["id"] = $startingID;
                $startingID++;
            }
         
            $data = array_merge($data, $decodedInput);
        }
        else{
            $decodedInput["id"] = $startingID;
            array_push($data, $decodedInput);
        }


        if(file_put_contents("./$user/$endpoint.json" ,json_encode($data, JSON_PRETTY_PRINT))){
            echo json_encode(["success" => "Data saved successfully!"]);
            exit;
        }
        else{
            echo json_encode(["error" => "Data could not be saved."]);
            exit;
        }
    }
    else{
        echo json_encode(["error" => "Data could not be saved."]);
        exit;
    }
}

?>