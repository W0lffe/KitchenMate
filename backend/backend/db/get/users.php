<?php 

/**
 * This file handles SELECT querys for users, fetches users data
 */

function getUserData(){
    require __DIR__ . "/../connection.php";

    try {
        $stmt = $pdo->prepare("SELECT * FROM users");
        $stmt->execute();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        return $users;

    } catch (PDOException $e) {
        error_log("Error fetching users: " . $e->getMessage()); 
        return [];  
    }
}

?>