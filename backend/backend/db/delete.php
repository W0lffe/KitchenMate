<?php 

function deleteData($resource){

    if(!isset($resource["data"] && !isset($resource["endpoint"]))){
        http_response_code(400); //Bad Request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Data can't be deleted - missing information."]);
        exit;
    }

    try {
        $ep = $resource["endpoint"];
        $data = $resource["data"];
        require __DIR__ . "/delete/$ep.php";
       
   } catch (PDOException $e) {
        http_response_code(500); //server error
        header("Content-Type: application/json");
        echo json_encode(["error" => "Database error"]);
        exit;
   }
}
?>