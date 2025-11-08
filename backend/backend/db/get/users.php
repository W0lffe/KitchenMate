<?php 

/**
 * This file handles SELECT querys for users, fetches users data
 */

function getUserData(){
    require_once __DIR__ . "/../connection.php";
   
    try {
        $stmt = $pdo->query("SELECT * FROM users");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        return [];
    }
}

?>