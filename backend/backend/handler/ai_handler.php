<?php

require_once __DIR__ . "/../util/helpers.php";


if($_SERVER["REQUEST_METHOD"] === "POST"){
    $input = json_decode(file_get_contents("php://input"), true);
    //echo $input;
    //echo json_encode($input["item"]);

    ai_request($input);
}



function ai_request($convertableData){

    $data = $convertableData;

    echo json_encode($data);
    
    if(!isset($data["product"], $data["from"], $data["to"], $data["quantity"])){
        return null;
    }

    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true); 
    $apiKey = $config["api"]["openai"];

    $prompt = sprintf(
        "Convert %s %s of %s to %s. Pay attention to the units, and consider the density of the product!
        Return ONLY valid JSON like this:
        {\"result\": number}",
        $data["quantity"],
        strtoupper($data["from"]),
        strtoupper($data["product"]),
        strtoupper($data["to"])
    );

    echo $prompt;

    //echo json_encode(["prompt:" => $prompt]);

    $ch = curl_init();
    $curlOptions = createCurlOptions($prompt, $apiKey);

    //echo json_encode($curlOptions);

    curl_setopt_array($ch, $curlOptions);

    $response = curl_exec($ch);
    if($response === false){
        curl_close($ch);
        return null;
    }
        
    curl_close($ch);
    $decodedData = json_decode($response, true);
    echo $response;

    if(!isset($decodedData["choices"][0]["message"]["content"])){
        return null;
    }

    $content = $decodedData["choices"][0]["message"]["content"];
    $result = json_decode($content, true);
    echo json_encode($result);
    //return $result; 
}