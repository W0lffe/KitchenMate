<?php 

function handleRequest($resource){
    require_once __DIR__ . "/../db/get/users.php";

    //echo json_encode(["success" => "got resources", "resources" => $resource]);

    $data = $resource["input"];
    $endpoint = $resource["endpoint"];

    if(isset($data) && isset($endpoint)){

        $resource = [
            "user" => $data["user"],
            "endpoint" => $endpoint
        ];

        //echo json_encode(["new resource" => $resource]);
        
        switch($data["operation"]){
            case "new":
                createNewUser($resource);
                break;
            case "login": 
                authUser($data["user"]);
                break;
        }
    
    }
    else{
        http_response_code(400); //Bad request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Invalid resources - invalid payload!"]);
        exit;
    }

}


/**
 * Function to create new user
 * @param Array $resource array containing paths to userfile and where to save data, and new user as object
 */
function createNewUser($resource){

    require_once __DIR__ . "/../db/insert.php";

    $newUser = $resource["user"];

    if(strlen($newUser["user"]) === 0 || strlen($newUser["user"]) > 16){
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["error" => "Username is invalid."]);
        exit;
    }
    
    if(strlen($newUser["passwd"]) === 0){
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["error" => "Please enter a password."]);
        exit;
    }

    if(strlen($newUser["passwd"]) < 10){
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["error" => "Password is too short."]);
        exit;
    }

    $users = getUserData();
    if($users === null){
        $users = [];
    }

    foreach($users as $existUser){
        if($existUser["name"] === $newUser["user"]){
            http_response_code(400);
            header("Content-Type: application/json");
            echo json_encode(["error" => "This username is taken."]);
            exit;
        };
    }; 

    $cryptedPasswd = password_hash($newUser["passwd"], PASSWORD_BCRYPT);
    $newUser["passwd"] = $cryptedPasswd;

    unset($resource["user"]);
    $resource["data"] = $newUser;

    postData($resource);
}


/**
 * Function to authenticate user and return token to client
 * @param Array $resource array of resources, userfile and user as object
 */
function authUser($resource){

    $users = getUserData();
    if($users === null){
        $users = [];
    }

    foreach($users as $existUser){
        if($existUser["name"] === $resource["user"]){
            if(password_verify($resource["passwd"], $existUser["passwd"])){
                $userID = $existUser["userID"];
                $token = createToken($userID);
                http_response_code(200); //OK
                header("Content-Type: application/json");
                echo json_encode(["success" => "Authenticated!", "token" => $token]);
                exit;
            }
            else{
                http_response_code(401); //Unauthorized
                header("Content-Type: application/json");
                echo json_encode(["error" => "Username or password is incorrect."]);
                exit;
            }
        }
    }
    http_response_code(401); //Unauthorized
    header("Content-Type: application/json");
    echo json_encode(["error" => "Username or password is incorrect."]);
    exit;

}

?>