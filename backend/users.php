<?php 
//https://kitchenmate-efe45.web.app
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$config = parse_ini_file("./config.ini", true);
$usersFile = $config["files"]["user_file"];
$data_point = $config["paths"]["data_point"];

if(!initDir($usersFile)){
    echo json_encode(["error" => "Error initializing directory!"]);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);

if(!isset($data["method"]) || !isset($data["user"])){
    echo json_encode(["error" => "Critical error while creating or authenticating user!"]);
    exit;
};

$userData = $data["user"];
$method = $data["method"];

switch($method){
    case "new":
        createNewUser($userFile, $userData, $data_point);
        break;
    case "login": 
        authUser($userFile, $userData);
        break;
}

function initDir($users, $userFile){
    if(!is_dir($users)){
        if(!mkdir($users, 0764, true)){
            return false;
        };
    };

    if(!file_exists($userFile)){
        if(!file_put_contents($userFile, json_encode([]))){
            return false;
        }
        if(!chmod($userFile, 0764)){
            return false;
        }
    }

    return true;
}

function authUser($userFile, $user){

    $users = json_decode(file_get_contents($userFile), true);
    
    foreach($users as $existUser){
        if($existUser["user"] === $user["user"]){
            if(password_verify($user["passwd"], $existUser["passwd"])){
                echo json_encode(["success" => "User authenticated!", "id" => $existUser["id"]]);
                exit;
            }
            else{
                echo json_encode(["error" => "Username or password is incorrect."]);
                exit;
            }
        }
    }

    echo json_encode(["error" => "Username or password is incorrect."]);
    exit;


}

function createNewUser($userFile, $newUser, $data_point){

    if(strlen($newUser["user"]) === 0 || strlen($newUser["user"]) > 16){
        echo json_encode(["error" => "Username is invalid."]);
        exit;
    }
    
    if(strlen($newUser["passwd"]) === 0){
        echo json_encode(["error" => "Please enter a password."]);
        exit;
    }

    if(strlen($newUser["passwd"]) < 10){
        echo json_encode(["error" => "Password is too short."]);
        exit;
    }

    $users = json_decode(file_get_contents($userFile), true);
    if($users === null){
        $users = [];
    }

    foreach($users as $existUser){
        if($existUser["user"] == $newUser["user"]){
            echo json_encode(["error" => "This username is taken."]);
            exit;
        };
    }; 

    $idRange = range(1, 1000);
    $availableIds = array_diff($idRange, array_column($users, "id"));
    $newUser["id"] = $availableIds[array_rand($availableIds)];
  
    $cryptedPasswd = password_hash($newUser["passwd"], PASSWORD_BCRYPT);
    $newUser["passwd"] = $cryptedPasswd;

    array_push($users, $newUser);

    if(file_put_contents($userFile ,json_encode($users, JSON_PRETTY_PRINT))){

        if(initEndpoints($newUser["id"], $data_point)){
            echo json_encode(["success" => "User created successfully!"]);
            exit;
        }
        else{
            echo json_encode(["error" => "User creation failed!"]);
            exit;
        }
    }
    else{
        echo json_encode(["error" => "User creation failed!"]);
        exit;
    }
}

function initEndpoints($dir, $datapoint){

    $path = "$datapoint/$dir";
    $ep = ["recipes.json", "dishes.json", "basket.json"];

    if(!mkdir($path, 0764, true)){
        return false;
    }

    foreach ($ep as $endpoint) {
        if(!file_put_contents("$path/$endpoint", json_encode([]))){
            return false;
        }

        if((!chmod("$path/$endpoint", 0764))){
            return false;
        }
    };

    return true;
}


?>
