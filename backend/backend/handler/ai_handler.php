<?php

require_once __DIR__ . "/../util/helpers.php";


if($_SERVER["REQUEST_METHOD"] === "POST"){
    $input = json_decode(file_get_contents("php://input"), true);
    //echo $input;
    //echo json_encode($input["item"]);

    ai_request($input);
}



function ai_request($convertableData){

    $hasInputs = isset($convertableData["item"]);

    if($hasInputs){

        $data = $convertableData["item"];

        $config = parse_ini_file(__DIR__ . "/../config/config.ini", true); 
        $apiKey = $config["api"]["openai"];

        $prompt = "Do a conversion: " . $data["quantity"] . $data["first_unit"] . " of " . $data["product"] . 
                    " to " . $data["second_unit"] . ". Return only RESULT OF CONVERSION in JSON format!";

        //echo json_encode(["prompt:" => $prompt]);

        $ch = curl_init();
        $curlOptions = createCurlOptions($prompt, $apiKey);

        //echo json_encode($curlOptions);

        curl_setopt_array($ch, $curlOptions);

        $response = curl_exec($ch);

        curl_close($ch);

        $data = json_decode($response, true);
        $result = $data["choices"][0]["message"]["content"];
        echo $result; 

    }

    

}