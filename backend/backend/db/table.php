
<?php 


/**
 * This function initiates tables IF THEY DONT EXIST to database
 * @return bool true or false based on success or failure
 */
function createTables(){

    try {
        
        require __DIR__ . "/connection.php";
        require __DIR__ . "/tables/tables.php";

        foreach ($tables as $table) {
            $pdo->exec($table);
        }
    
        return true;
    }
    catch(PDOException $e){
        echo json_encode(["error" => "Database initialization failed: ${$e->getMessage()}"]);
        return false;
    }
}

?>