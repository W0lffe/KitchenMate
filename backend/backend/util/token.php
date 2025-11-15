<?php 
/**
 * Function to create a token for client
 * @param mixed $userID ID of user
 * @return string token hash string
 */
function createToken($userID){

    $header = base64_encode(json_encode(["alg" => "HS256", "typ" => "JWT"])); //Encode header of token, algorithm and type

    //Encode payload containing id of user and expiration of token
    $payload = base64_encode(json_encode([
        "userID" => $userID,
        "exp" => time() + 3600
    ]));

    //Parse secret key from config file
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true); 
    $secret = $config["secret"]["secret"];

    //Create a binary output of signature 
    $signature = hash_hmac('sha256', "$header.$payload", $secret, true);
    //Encode to hexadecimal string
    $signatureEncoded = base64_encode($signature);

    //Create token string and return it
    $token = "$header.$payload.$signatureEncoded";
    return $token;
}


/**
 * Function to verify token
 * @return Array containing expiration of token and user id
 */
function verifyToken(){
    
    //Parse config file
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $headers = getallheaders();

    //Check if Authorization headers are sent to server
    if (!isset($headers['Authorization'])) {
        http_response_code(400); //Bad request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Invalid payload - missing headers!"]);
        exit;
    }

    list($type, $token) = explode(" ", $headers['Authorization'], 2);
    if ($type !== "Bearer" && !$token) {
        http_response_code(400); //Bad request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Invalid payload - missing token!"]);
        exit;
    }

    //Split string to 3 parts, . as separator
    list($header, $payload, $signature) = explode(".", $token);
    $secret = $config["secret"]["secret"];
    $validSignature = base64_encode(hash_hmac('sha256', "$header.$payload", $secret, true)); //Create valid signature

    //Check if previously created signature matches with the given signature
    if ($signature !== $validSignature) {
        http_response_code(401); //Unauthorized
        header("Content-Type: application/json");
        echo json_encode(["error" => "Unauthorized access!"]);
        exit;
    }

    //Check if token has expired
    $payloadData = json_decode(base64_decode($payload), true);
    if ($payloadData["exp"] < time()) {
        http_response_code(403); //Forbidden
        echo json_encode(["error" => "Token expired. Please log in again."]);
        exit;
    }

    //Return payload of token
    return $payloadData;
}
?>