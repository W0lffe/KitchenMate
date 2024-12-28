<?php

$recipeDirName = "Recipes";
$recipePath = "$recipeDirName/recipes.json";

$directoryInit = initRecipeDir($recipeDirName);

if($directoryInit["Error"]){
    echo json_encode($directoryInit, true);
}


if($_SERVER['REQUEST_METHOD'] === 'POST'){
    postRecipes($recipePath);
}



function postRecipes($recipePath){
  
    $recipeFromClient = file_get_contents("php://input");

    $recipeArray = [];

    if(file_exists($recipePath)){
        $existingRecipes = file_get_contents($recipePath);

        $recipeArray = json_decode($existingRecipes, true);
    }

    $nextIdForRecipe = 1;
    if(!($recipeArray)){

        $idsInArray = array_column(recipeArray);
        $nextIdForRecipe = max($idsInArray) + 1;
    }

    $newRecipe = json_decode($recipeFromClient, true);
    $newRecipe['id'] = $nextIdForRecipe;

    $recipeArray[] = $newRecipe;

    $encodedRecipes = json_encode($recipeArray, JSON_PRETTY_PRINT);

    if(file_put_contents($recipePath, $encodedRecipes)){
        echo json_encode(["Operation" => "Save data","Status " => "Data saved"]);
    } else {
        echo json_encode(["Operation" => "Save data","Status" => "Failed to save data"]);
    }    
}



function initRecipeDir($recipeDirName){

    if(mkdir($recipeDirName, 0765, true)){
        return ["Success: " => "Directory created!"];
    }
    else{
        return ["Error: " => "Failed to create directory!"];
    }

    
}
?>