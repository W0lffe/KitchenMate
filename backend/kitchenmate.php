<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
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

    $input = file_get_contents("php://input");
    $decodedInput = json_decode($input, true);

    if(is_dir("./$user") && file_exists("./$user/$endpoint.json")){

        $data = json_decode(file_get_contents("./$user/$endpoint.json"), true);
        if($data === null){
            $data = [];
        }

        array_push($data, $decodedInput);

        if(file_put_contents("./$user/$endpoint.json" ,json_encode($data, JSON_PRETTY_PRINT))){
            echo json_encode(["success" => "Data saved successfully!"]);
        }
        else{
            echo json_encode(["error" => "Data could not be saved."]);
        }

    }
    else {
        // CREATE DIRECTORY LOGIC
    }


}

?>