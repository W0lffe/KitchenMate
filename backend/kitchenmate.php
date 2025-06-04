<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT");
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

}

function updateData($user, $endpoint){

    if(is_dir("./$user") && file_exists("./$user/$endpoint.json")){

        $input = file_get_contents("php://input");
        $decodedInput = json_decode($input, true);
        //echo json_encode(["Input" => $decodedInput]);

        $id = $decodedInput["id"];
        //echo json_encode(["ID" => $id]);

        $existingData = json_decode(file_get_contents("./$user/$endpoint.json"), true);
        //echo json_encode(["existing data" => $existingData]);


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
            $existingData[$index] = $decodedInput;
            //echo json_encode(["after updating" => $existingData]);
            
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

        if($endpoint === "basket"){
            $data = array_merge($data, $decodedInput);
        }
        else{
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