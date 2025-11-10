<?php 

$tables = [
    "CREATE TABLE IF NOT EXISTS users (
            userID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            email VARCHAR(80) NOT NULL,
            passwd VARCHAR(350) NOT NULL
    )",
    "CREATE TABLE IF NOT EXISTS recipes (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(50) NOT NULL,
            portions INT NOT NULL,
            output VARCHAR(20) NOT NULL,
            outputType VARCHAR(20),
            time INT NOT NULL,
            timeFormat VARCHAR(30) NOT NULL,
            favorite BOOLEAN NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            category VARCHAR(100) NOT NULL,
            userID INT NOT NULL,
            FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
    )",
    "CREATE TABLE IF NOT EXISTS ingredients (
            ingredientID INT AUTO_INCREMENT PRIMARY KEY,
            recipeID INT NOT NULL,
            product VARCHAR(50) NOT NULL,
            quantity DECIMAL(10,2) NOT NULL,
            unit VARCHAR(50) NOT NULL,
            FOREIGN KEY (recipeID) REFERENCES recipes(id) ON DELETE CASCADE
    )",
    "CREATE TABLE IF NOT EXISTS instructions (
            instructionID INT AUTO_INCREMENT PRIMARY KEY,
            recipeID INT NOT NULL,
            instruction TINYTEXT NOT NULL,
            step INT NOT NULL,
            FOREIGN KEY (recipeID) REFERENCES recipes(id) ON DELETE CASCADE
    )",
     "CREATE TABLE IF NOT EXISTS dishes (
            dishID INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(150) NOT NULL,
            course VARCHAR(100),
            date DATETIME DEFAULT CURRENT_TIMESTAMP,
            userID INT NOT NULL,
            favorite BOOLEAN NOT NULL,
            image VARCHAR(350) NOT NULL,
            FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
    )",
    "CREATE TABLE IF NOT EXISTS components (
            id INT AUTO_INCREMENT PRIMARY KEY,
            componentID INT NOT NULL,
            dishID INT NOT NULL,
            FOREIGN KEY (componentID) REFERENCES recipes(id) ON DELETE CASCADE,
            FOREIGN KEY (dishID) REFERENCES dishes(dishID) ON DELETE CASCADE
    )",
    "CREATE TABLE IF NOT EXISTS basket (
            itemID INT AUTO_INCREMENT PRIMARY KEY,
            product VARCHAR(50) NOT NULL,
            quantity DECIMAL(10,2) NOT NULL,
            unit VARCHAR(50) NOT NULL,
            userID INT NOT NULL,
            FOREIGN KEY (userID) REFERENCES users(userID) ON DELETE CASCADE
    )"
];

?>