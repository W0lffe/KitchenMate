<?php 

function handleRequest($resource){

    //echo json_encode(["success" => "got resources", "resources" => $resource]);

    $data = $resource["input"];
    $endpoint = $resource["endpoint"];

    if(isset($data) && isset($endpoint)){

        $path = getEndpointPath(null, $resource["endpoint"]);

        //echo json_encode(["got path" => $path]);

        $resource = [
            "userFile" => $path["userFile"],
            "dataPath" => $path["dataPath"],
            "user" => $data["user"]
        ];

        //echo json_encode(["new resource" => $resource]);
        
        switch($data["operation"]){
            case "new":
                createNewUser($resource);
                break;
            case "login": 
                authUser($resource);
                break;
        }
    
    }
    else{
        http_response_code(400); //Bad request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Invalid resources"]);
        exit;
    }

}


/**
 * Function to create new user
 * @param Array $resource array containing paths to userfile and where to save data, and new user as object
 */
function createNewUser($resource){

    $userFile = $resource["userFile"];
    $newUser = $resource["user"];
    $dataPath = $resource["dataPath"];

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

    $users = json_decode(file_get_contents($userFile), true);
    if($users === null){
        $users = [];
    }

    foreach($users as $existUser){
        if($existUser["user"] === $newUser["user"]){
            http_response_code(400);
            header("Content-Type: application/json");
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

        if(initEndpoints($newUser["id"], $dataPath)){
            http_response_code(200);
            header("Content-Type: application/json");
            echo json_encode(["success" => "User created successfully!"]);
            exit;
        }
        else{
            http_response_code(500);
            header("Content-Type: application/json");
            echo json_encode(["error" => "User creation failed!"]);
            exit;
        }
    }
    else{
        http_response_code(500);
        header("Content-Type: application/json");
        echo json_encode(["error" => "User creation failed!"]);
        exit;
    }
}


/**
 * Function to authenticate user and return token to client
 * @param Array $resource array of resources, userfile and user as object
 */
function authUser($resource){

    $userFile = $resource["userFile"];
    $user = $resource["user"];
    /*--------------------- DATABASE SELECT HERE ------------------------- */
    $users = json_decode(file_get_contents($userFile), true);
    $userID = null;

    foreach($users as $existUser){
        if($existUser["user"] === $user["user"]){
            if(password_verify($user["passwd"], $existUser["passwd"])){
                $userID = $existUser["id"];
                $token = createToken($userID);
                http_response_code(200);
                header("Content-Type: application/json");
                echo json_encode(["success" => "User authenticated!", "token" => $token]);
                exit;
            }
            else{
                http_response_code(401);
                header("Content-Type: application/json");
                echo json_encode(["error" => "Username or password is incorrect."]);
                exit;
            }
        }
    }
    http_response_code(401);
    header("Content-Type: application/json");
    echo json_encode(["error" => "Username or password is incorrect."]);
    exit;

}

?>
