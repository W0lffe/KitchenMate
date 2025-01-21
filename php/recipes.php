<?php

$recipeDirName = "Recipes";
$shopDirName = "Shopping";

$recipePath = "$recipeDirName/recipes.json";
$shopPath = "$shopDirName/shoppinglist.json";


$directoryInit = initRecipeDir($recipeDirName);

if($directoryInit["Error"]){
    echo json_encode($directoryInit, true);
}


if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $method = $_GET['method'];
    
    if($method == "recipes"){
        postRecipes($recipePath);
    }
    else if($method == "shoplist"){
        postShoplist($shopPath);
    }
}
else if($_SERVER['REQUEST_METHOD'] === 'GET'){
    $method = $_GET['method'];

    if($method == "recipes"){
        getData($recipePath, "Fetch recipes");
    }
    else if($method == "shoplist"){
        getData($shopPath, "Fetch shoppinglist");
    }
}
else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    deleteData($recipePath);
}


function postRecipes($recipePath){
  
    $recipeFromClient = file_get_contents("php://input");

    $existingRecipeArray = [];

    if(file_exists($recipePath)){
        $existingRecipes = file_get_contents($recipePath);

        $existingRecipeArray = json_decode($existingRecipes, true);
    }
    
    $newRecipe = json_decode($recipeFromClient, true);
    $recipeExists = false;

    for ($i = 0; $i < count($existingRecipeArray); $i++) {
        if ($existingRecipeArray[$i]['id'] == $newRecipe['id']) {
            $existingRecipeArray[$i] = $newRecipe;
            $recipeExists = true;
            break;
        }
    }

    if(!$recipeExists){

        $nextIdForRecipe = 1;
        
        if(count($existingRecipeArray) > 0){

            $idsInArray = count($existingRecipeArray) ;
            $nextIdForRecipe = $idsInArray + 1;
        }

        $newRecipe = json_decode($recipeFromClient, true);
        $newRecipe['id'] = $nextIdForRecipe;

        $existingRecipeArray[] = $newRecipe;
    }

    $encodedRecipes = json_encode($existingRecipeArray, JSON_PRETTY_PRINT);


    if(file_put_contents($recipePath, $encodedRecipes)){
        echo json_encode(["Operation" => "Save data","Status " => "Data saved"]);
    } else {
        echo json_encode(["Operation" => "Save data","Status" => "Failed to save data"]);
    }    
}

function postShoplist($shopPath){

    $listFromClient = file_get_contents("php://input");

    $encodedData = json_encode($listFromClient, JSON_PRETTY_PRINT);

    file_put_contents($shopPath, $encodedData);
}
 

function initRecipeDir($recipeDirName){

    if(mkdir($recipeDirName, 0765, true)){
        return ["Success: " => "Directory created!"];
    }
    else{
        return ["Error: " => "Failed to create directory!"];
    }
}

function getData($file_path, $operation){

    if(file_exists($file_path)){

        $data = file_get_contents($file_path);

        if(!empty($data)){
            echo json_encode(["Operation" => $operation, "Status" => "Success: Data fetched!", "Data" => json_decode($data,true)]);
        }
        else{
            echo json_encode(["Operation" => $operation, "Status" => "Failed: File is empty!"]);  
        }
    }
    else{
        echo json_encode(["Operation" => $operation, "Status" => "Failed: File does not exist!"]);
    }
}

function deleteData($recipePath){
    $idToDelete = $_GET['id'];

    if(file_exists($recipePath)){

        $decodedData = json_decode(file_get_contents($recipePath), true);

        for($i = 0; $i < count($decodedData); $i++){
            if($decodedData[$i]['id'] == $idToDelete){
                array_splice($decodedData, $i, 1);
                break;
            }
        }

        $newId = 1;
        
        for($i = 0; $i < count($decodedData); $i++){
            $decodedData[$i]['id'] = $newId;
            $newId++;
        }

        $encodedData = json_encode($decodedData, JSON_PRETTY_PRINT);
        file_put_contents($recipePath, $encodedData);
    }
}


?>