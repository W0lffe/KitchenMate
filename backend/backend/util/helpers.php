<?php

/**
 * Function to get upload directory or uploaded file as a string
 * @param string $user ID of user
 * @param string $image image file name
 * @param boolean $initializing, if initializing directories
 * 
 * 
 * 
 * @return string absolute path to upload dir/uploaded file
 */
function getUpload($user, $image, $initializing) {

    //echo getcwd();
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $baseDir = $config["uploads"]["dir"];

    if($initializing){
        return $baseDir . "/" . (string)$user;
    }

    $filePath = $baseDir . "/" . (string)$user . "/" . $image;
    return $filePath;    
}


?>