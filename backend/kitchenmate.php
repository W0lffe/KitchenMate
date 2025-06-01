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
    echo "Received", $input;

    if(is_dir("./$user") && file_exists("./$user/$endpoint.json")){

        $data = json_decode(file_get_contents("./$user/$endpoint.json"), true);

        echo json_encode(["existing" => $data]);

        array_push($data, $decodedInput);

        echo json_encode(["updated" => $data]);
    }


}

?>