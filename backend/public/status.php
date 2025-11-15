<?php 
header("Access-Control-Allow-Origin: https://kitchenmate-efe45.web.app");

http_response_code(200);
header("Content-Type: application/json");
echo json_encode(["status" => true]);
exit;
?>