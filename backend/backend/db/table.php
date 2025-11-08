
<?php 


/**
 * This function initiates tables IF THEY DONT EXIST to database
 * @return bool true or false based on success or failure
 */
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
            userID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(80) NOT NULL,
            passwd VARCHAR(350) NOT NULL
        )";

        $sqlRecipes = "CREATE TABLE IF NOT EXISTS recipes (
            recipeID INT AUTO_INCREMENT PRIMARY KEY,
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

        $sqlIngredients = "CREATE TABLE IF NOT EXISTS ingredients (
            ingredientID INT AUTO_INCREMENT PRIMARY KEY,
            recipeID INT NOT NULL,
            name VARCHAR(50) NOT NULL,
            quantity DECIMAL(10,2) NOT NULL,
            unit VARCHAR(50) NOT NULL,
            FOREIGN KEY (recipeID) REFERENCES recipes(recipeID) ON DELETE CASCADE
        )";

        $sqlInstructions = "CREATE TABLE IF NOT EXISTS instructions (
            instructionID INT AUTO_INCREMENT PRIMARY KEY,
            recipeID INT NOT NULL,
            instruction TINYTEXT NOT NULL,
            step INT NOT NULL,
            FOREIGN KEY (recipeID) REFERENCES recipes(recipeID) ON DELETE CASCADE
        )";

        $sqlDishes = "CREATE TABLE IF NOT EXISTS dishes (
            dishID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            course VARCHAR(100),
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            userID INT NOT NULL,
            favorite BOOLEAN NOT NULL,
            image VARCHAR(350) NOT NULL,
            FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
        )";

        $sqlComponents = "CREATE TABLE IF NOT EXISTS components (
            id INT AUTO_INCREMENT PRIMARY KEY,
            componentID INT NOT NULL,
            dishID INT NOT NULL,
            FOREIGN KEY (componentID) REFERENCES recipes(recipeID) ON DELETE CASCADE,
            FOREIGN KEY (dishID) REFERENCES dishes(dishID) ON DELETE CASCADE
        )";

        $sqlBasket = "CREATE TABLE IF NOT EXISTS basket (
            basketID INT AUTO_INCREMENT PRIMARY KEY,
            userID INT NOT NULL,
            FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
        )";

        $sqlItems = "CREATE TABLE IF NOT EXISTS items (
            itemID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            quantity DECIMAL(10,2) NOT NULL,
            unit VARCHAR(50) NOT NULL,
            basketID INT NOT NULL,
            FOREIGN KEY (basketID) REFERENCES basket(basketID) ON DELETE CASCADE
        )";

        $pdo->exec($sqlUsers);
        $pdo->exec($sqlRecipes);
        $pdo->exec($sqlIngredients);
        $pdo->exec($sqlInstructions);
        $pdo->exec($sqlDishes);
        $pdo->exec($sqlComponents);
        $pdo->exec($sqlBasket);
        $pdo->exec($sqlItems);

        return true;
    }
    catch(PDOException $e){
        return false;
    }
}

?>