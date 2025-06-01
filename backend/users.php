<?php 

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$userFile = "./users/users.json";

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if(!isset($data["method"]) || !isset($data["user"])){
    echo json_encode(["status" => "Critical error while creating or authenticating user!"]);
    exit;
};

$userData = $data["user"];
$method = $data["method"];

switch($method){
    case "new":
        createNewUser($userFile, $userData);
        break;
    case "login": 
        authUser($userFile, $userData);
        break;
}

function authUser($userFile, $user){

    $users = json_decode(file_get_contents($userFile), true);
    
    foreach($users as $existUser){
        if($existUser["user"] === $user["user"]){
            if(password_verify($user["passwd"], $existUser["passwd"])){
                echo json_encode(["status" => "User authenticated!", "id" => $existUser["id"]]);
                exit;
            }
            else{
                echo json_encode(["status" => "Username or password is incorrect."]);
                exit;
            }
        }
    }

    echo json_encode(["status" => "Username or password is incorrect."]);
    exit;


}

function createNewUser($userFile, $newUser){

    if(strlen($newUser["user"]) === 0 || strlen($newUser["user"]) > 12){
        echo json_encode(["status" => "Username is invalid."]);
        exit;
    }

    if(strlen($newUser["passwd"]) < 10){
        echo json_encode(["status" => "Password is too short."]);
        exit;
    }

    $users = json_decode(file_get_contents($userFile), true);

    foreach($users as $existUser){
        if($existUser["user"] == $newUser["user"]){
            echo json_encode(["status" => "This username is taken."]);
            exit;
        };
    }; 

    $newUser["id"] = count($users) + 1;
    $cryptedPasswd = password_hash($newUser["passwd"], PASSWORD_BCRYPT);
    $newUser["passwd"] = $cryptedPasswd;

    array_push($users, $newUser);

    if(file_put_contents($userFile ,json_encode($users, JSON_PRETTY_PRINT))){
        echo json_encode(["status" => "User created successfully!"]);
    }
    else{
        echo json_encode(["status" => "User creation failed!"]);
    }
}


?>