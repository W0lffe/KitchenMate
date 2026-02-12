<?php

function ai_request(){

    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true); 
    $api_key = $config["api"]["openai"];

    $inputQuery = "";

    $prompt = "";

    $ch = curl_init();
    $curlOptions = createCurlOptions();
    curl_setopt_array($ch, );

    $response = curl_exec($ch);
}