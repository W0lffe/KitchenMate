
<?php 

function createTables(){

    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $host = $config["database"]["host"];
    $user = $config["database"]["user"];
    $db = $config["database"]["db"];
    $pass = $config["database"]["passwd"];
    $charset = "utf8mb4";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass);
        $pdo -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sqlUsers = "CREATE TABLE IF NOT EXISTS users (
            userId INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(80) NOT NULL,
            passwd VARCHAR(350) NOT NULL
        )";

        $sqlRecipes = "CREATE TABLE IF NOT EXISTS recipes (
            recipeId INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            portions INT NOT NULL,
            output VARCHAR(20) NOT NULL,
            outputType VARCHAR(20) NOT NULL,
            time INT NOT NULL,
            timeFormat VARCHAR(30) NOT NULL,
            favorite BOOLEAN NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            category VARCHAR(100) NOT NULL,
            userID INT NOT NULL,
            FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
        )";

        $sqlIngredients = "CREATE TABLE IF NOT EXISTS recipeIngredients (
            ingredientID INT AUTO_INCREMENT PRIMARY KEY,
            recipeId INT NOT NULL,
            name VARCHAR(50) NOT NULL,
            quantity DECIMAL NOT NULL,
            unit VARCHAR(50) NOT NULL,
            FOREIGN KEY (recipeId) REFERENCES recipes(recipeId) ON DELETE CASCADE
        )";

        $sqlInstructions = "CREATE TABLE IF NOT EXISTS recipeInstructions (
            instructionID INT AUTO_INCREMENT PRIMARY KEY,
            recipeId INT NOT NULL,
            instruction TINYTEXT NOT NULL,
            step INT NOT NULL,
            FOREIGN KEY (recipeId) REFERENCES recipes(recipeId) ON DELETE CASCADE
        )";

        $pdo->exec($sqlUsers);
        $pdo->exec($sqlRecipes);
        $pdo->exec($sqlIngredients);
        $pdo->exec($sqlInstructions);

        return true;
    }
    catch(PDOException $e){
        return false;
    }
}

?>