<?php 

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$method = $_SERVER["REQUEST_METHOD"];

if($method === "POST"){

    $input = file_get_contents("php://input");
    $user = json_decode($input, true);

    $existingUsers = json_decode(file_get_contents("./users/users.json"), true);

    $userExist = false;
    foreach($existingUsers as $existUser){
        if($existUser["user"] == $user["user"]){
            $userExist = true;
            echo json_encode(["user exists" => $userExist]);
            exit;
        };
    }; 

    echo json_encode(["existing users" => $existingUsers]);

    echo json_encode(["received data is" => $user]);
}
?>