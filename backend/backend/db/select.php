<?php 

function getData($resource){
 
    if(!isset($resource["endpoint"]) && !isset($resource["id"])){
        http_response_code(400); //Bad Request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Data can't be retrieved — invalid payload!"]);
        exit;
    }

   try {
        $ep = $resource["endpoint"];
        require __DIR__ . "/get/$ep.php";
       
   } catch (PDOException $e) {
        http_response_code(500); //server error
        header("Content-Type: application/json");
        echo json_encode(["error" => "Error with database: ${$e->getMessage()}"]);
        exit;
   }
}

?>