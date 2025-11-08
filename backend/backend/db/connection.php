<?php 
    $config = parse_ini_file(__DIR__ . "/../config/config.ini", true);
    $host = $config["database"]["host"];
    $user = $config["database"]["user"];
    $db = $config["database"]["db"];
    $pass = $config["database"]["passwd"];
    $charset = "utf8mb4";

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$db;charset=$charset", $user, $pass);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        die("Database connection failed: " . $e->getMessage());
    }
?>