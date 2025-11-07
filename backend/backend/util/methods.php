<?php


/**
 * Function to match request GET
 * @param Array $resource array of required resources (endpoint)
 */
function getData($resource){

    if(isset($resource["endpoint"])){
        $data = json_decode(file_get_contents($resource["endpoint"]), true);
        if($data === null){
            $data = [];
        }

        http_response_code(200); //OK
        header("Content-Type: application/json");
        echo json_encode(["data" => $data]);
        exit;
    }
    else{
        http_response_code(404); //Not found
        header("Content-Type: application/json");
        echo json_encode(["error" => "Data can't be retrieved — invalid or missing file path."]);
        exit;
    }
}

/**
 * Function to match request POST
 * @param Array $resource array of required resources (endpoint, api, data)
 */
function postData($resource){

    $api = $resource["api"] ?? null;
    $endpoint = $resource["endpoint"] ?? null;
    $data = $resource["data"] ?? null;

    if(isset($api) && isset($endpoint) && isset($data)){
        //echo json_encode(["success" => "Resources are set", "resources" => $resource]);

        $existingData = $existingData = json_decode(file_get_contents($endpoint), true);
        if($existingData === null){
            $existingData = [];
        }

        //echo json_encode(["existing data" => $existingData]);

        $maxID = !empty($existingData) ? max(array_column($existingData, 'id')) : 0;
        $nextID = $maxID + 1;

        //echo json_encode(["next id " => $nextID]);

        if($api === "basket"){

            if(count($existingData) === 0){
                for($i = 0; $i < count($data); $i++){
                    $data[$i]["id"] = $nextID;
                    $nextID++;
                }

                $existingData = array_merge($existingData, $data);
            }
            else{
                $existingData = checkDuplicates($data, $existingData);
            }
        }
        else{
            $data["id"] =  $nextID;
            array_push($existingData, $data);
        }

        //echo json_encode(["data after adding" => $existingData]);
        $response = getResponse($api);
        
        if(file_put_contents($endpoint ,json_encode($existingData, JSON_PRETTY_PRINT))){
            http_response_code(200); //OK
            header("Content-Type: application/json");
            echo json_encode(["success" => "$response saved successfully!"]);
            exit;
        }
        else{
            http_response_code(500); //Server side error
            header("Content-Type: application/json");
            echo json_encode(["error" => "$response could not be saved."]);
            exit;
        }

    }
    else{
        http_response_code(400);
        header("Content-Type: application/json");
        echo json_encode(["error" => "Data can't be saved - invalid resources.", "Requested" => $resource]);
        exit;
    }
    
}


/**
 * Function to match request DELETE
 * @param Array $resource array of required resources (endpoint, api, data)
 */
function deleteData($resource){

    $api = $resource["api"] ?? null;
    $endpoint = $resource["endpoint"] ?? null;
    $data = $resource["data"] ?? null;

    if(isset($api) && isset($endpoint) && isset($data)){
        //echo json_encode(["success" => "Resources are set", "resources" => $resource]);
        
        $existingData = json_decode(file_get_contents($endpoint), true);
        //echo json_encode(["existing data" => $existingData]);

        $index = findIndex($data, $existingData);

        //echo json_encode(["found index" => $index]);

        if(isset($data["dependencies"]) && !empty($data["dependencies"])){
            $payloadData = verifyToken();
            $dishEndpoint = getEndpointPath($payloadData["userID"], "dishes");
            //echo json_encode(["dishes path" => $dishEndpoint["endpointFile"]]);

            if (file_exists($dishEndpoint["endpointFile"])) {
                $dishesData = json_decode(file_get_contents($dishEndpoint["endpointFile"]), true);
                //echo json_encode(["all dishes before filtering" => $dishesData]);

                foreach ($data['dependencies'] as $i => $dependency) {
                    foreach ($dishesData as $j => $dish) {
                        if($dependency === $dish["id"]){
                            array_splice($dishesData, $j, 1);
                        }
                    }
                }

                //echo json_encode(["dishes after filtering " => $dishesData]);

                $updatedDishes = renumberIds($dishesData);

                //echo json_encode(["after renumbering " => $updatedDishes]);
                file_put_contents($dishEndpoint["endpointFile"], json_encode($updatedDishes, JSON_PRETTY_PRINT));
            }
        }

        $response = getResponse($api);
        if($index !== null){
            array_splice($existingData, $index, 1);

            if($api !== "recipes"){
                $existingData = renumberIds($existingData);
                //echo json_encode(["updated " => $existingData]);
            }

            //echo json_encode(["after splice " => $existingData]);

            if(file_put_contents($endpoint, json_encode($existingData, JSON_PRETTY_PRINT))){
                http_response_code(200); //OK
                header("Content-Type: application/json");
                echo json_encode(["success" => "$response deleted successfully!"]);
                exit;
            }
            else{
                http_response_code(500); //Server side error
                header("Content-Type: application/json");
                echo json_encode(["error" => "$response could not be deleted."]);
                exit;
            }
        }
        else{
            http_response_code(404); //Not found
            header("Content-Type: application/json");
            echo json_encode(["error" => "$response could not be deleted - $response not found."]);
            exit;
        }
    }
    else{
        http_response_code(400); //Bad request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Data can't be deleted - invalid resources.", "Requested" => $resource]);
        exit;
    }
}

/**
 * Function to match request PUT
 * @param Array $resource array of required resources (endpoint, api, data, update)
 */
function updateData($resource){

    $api = $resource["api"] ?? null;
    $endpoint = $resource["endpoint"] ?? null;
    $data = $resource["data"] ?? null;

    if(isset($api) && isset($endpoint) && isset($data)){

        $idToUpdate = $data["id"] ?? null;
        $existingData = json_decode(file_get_contents($endpoint), true);

        $isBasketUpdate = isset($data["update"]) ?? null;
        if($isBasketUpdate){
            $data = $data["item"];
            $idToUpdate = $data["id"] ?? null;
        };

        //echo json_encode(["id to update" => $idToUpdate, "existing data" => $existingData]);

        $response = getResponse($api);
        if($api === "basket" && !$isBasketUpdate){
            $existingData = $data;
        }
        else{
            if(isset($idToUpdate)){
                $index = findIndex($data, $existingData);

                //echo json_encode(["found index" => $index]);

                if($index !== null){
                    $existingData[$index] = $data;
                    //echo json_encode(["updated item" => $existingData[$index]]);
                }
                else{
                    http_response_code(404); //Not found
                    header("Content-Type: application/json");
                    echo json_encode(["error" => "$response can't be updated - $response not found."]);
                    exit;
                }
            }
            else{
                http_response_code(400); //Bad request
                header("Content-Type: application/json");
                echo json_encode(["error" => "$response can't be updated - data missing."]);
                exit;
            }
        }

        if(file_put_contents($endpoint, json_encode($existingData, JSON_PRETTY_PRINT))){
            http_response_code(200); //OK
            header("Content-Type: application/json");
            echo json_encode(["success" => "$response updated successfully!"]);
            exit;
        }
        else{
            http_response_code(500); //Server side error
            header("Content-Type: application/json");
            echo json_encode(["error" => "$response could not be updated."]);
            exit;
        }
    }
    else{
        http_response_code(400); //Bad request
        header("Content-Type: application/json");
        echo json_encode(["error" => "Data can't be updated - invalid resources.", "Requested" => $resource]);
        exit;
    }
}

?>