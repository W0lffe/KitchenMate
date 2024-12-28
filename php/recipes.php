<?php

$recipeDirName = "Recipes";
$recipePath = "$recipeDirName/recipes.json";

if($_SERVER['REQUEST_METHOD'] === 'POST'){
    postRecipes();
}



function postRecipes(){
    if(!is_dir($recipeDirName)){
        $response = initRecipeDir();
        echo json_encode($response);
    }
    else{
        echo json_encode(["Success: " => "Directory created!"]);
    }

    $recipeToSave = file_get_contents("php://input");

    $recipeArray = [];

    if(file_exists($recipePath)){
        $existingRecipes = file_get_contents($recipePath);

        $recipeArray = json_decode($existingRecipes, true);
    }

    $recipeArray[] = $recipeToSave;

    $newData = json_encode($recipeArray, JSON_PRETTY_PRINT);

    file_put_contents($recipePath, $newData);
}


function initRecipeDir(){

    if(mkdir($recipeDirName, 0765, true)){
        return ["Success: " => "Directory created!"];
    }
    else{
        return ["Error: " => "Failed to create directory!"];
    }

    
}
?>