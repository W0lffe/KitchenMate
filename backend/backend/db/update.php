<?php 

function updateData($resource){

    if(!isset($resource["data"]) && !isset($resource["endpoint"]) && !isset($resource["id"])){
        http_response_code(400); //Bad Request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Data can't be updated - invalid payload!"]);
        exit;
    }

    try {
        $ep = $resource["endpoint"];
        require __DIR__ . "/put/$ep.php";
       
   } catch (PDOException $e) {
        http_response_code(500); //server error
        header("Content-Type: application/json");
        echo json_encode(["error" => "Error with database: ${$e->getMessage()}"]);
        exit;
   }
}
?>