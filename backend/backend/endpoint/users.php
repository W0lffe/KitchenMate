<?php 

function handleRequest($resource){
    require_once __DIR__ . "/../db/get/users.php";

    //echo json_encode(["success" => "got resources", "resources" => $resource]);

    $data = $resource["input"];
    $endpoint = $resource["endpoint"];

    if(isset($data) && isset($endpoint)){

        $resource = [
            "user" => $data["userPayload"],
            "endpoint" => $endpoint
        ];

        
        //echo json_encode(["new resource" => $resource]);
        
        switch($data["operation"]){
            case "new":
                createNewUser($resource);
                break;
            case "login": 
                authUser($data["userPayload"]);
                break;
            case "validate":
                validateUser($data["userPayload"]);
                break;
            case "reset":
                resetPasswd($data["userPayload"]);
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
    
    validatePasswd($newUser["passwd"]);

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

function validateUser($resource){

    $users = getUserData();
    if($users === null){
        $users = [];
    }

    foreach($users as $existUser){
        if($existUser["name"] === $resource["user"]){
            if(password_verify($resource["recCode"], $existUser["rec"])){
                http_response_code(200);
                header("Content-Type: application/json");
                echo json_encode(["success" => "Verification successful.", "id" => $existUser["userID"]]);
                exit;
            }
            else{
                http_response_code(400); //bad request
                header("Content-Type: application/json");
                echo json_encode(["error" => "Invalid username or recovery code."]);
                exit;
            }
        }
    }

    http_response_code(400); //bad request
    header("Content-Type: application/json");
    echo json_encode(["error" => "Invalid username or recovery code."]);
    exit;

}

function resetPasswd($resource){

    validatePasswd($resource["newPass"]);

    try {
        require __DIR__ . "/../db/connection.php";
        $plainRecCode = generateRecoveryCode();
        $hashedCode = password_hash($plainRecCode, PASSWORD_BCRYPT);

        $pdo->beginTransaction();

        $pdo->prepare("
            UPDATE users
            SET 
                rec = :rec,
                passwd = :passwd
            WHERE 
                userID = :id
        ")->execute([
            "rec" => $hashedCode,
            "passwd" => password_hash($resource["newPass"], PASSWORD_BCRYPT),
            "id" => $resource["id"]
        ]);
        $pdo->commit();

        http_response_code(200);
        header("Content-Type: application/json");
        echo json_encode(["code" => $plainRecCode]);
        exit;
       
   } catch (PDOException $e) {
        http_response_code(500); //server error
        header("Content-Type: application/json");
        echo json_encode(["error" => "Error with database: ${$e->getMessage()}"]);
        exit;
   }

}

?>