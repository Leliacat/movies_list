<?php

class Database {

    /****************************** PROPERTIES ****************************/

    private static $dbHost = "localhost";
    private static $dbName = "moviesbar";
    private static $dbUsername = "root";
    private static $dbUserpassword = "root";
    private static $charset = "utf8";
    
    private static $connection = null;


    /******************************** METHODS ******************************/
    public static function connect(){
        if(self::$connection == null){
            try {
              self::$connection = new PDO("mysql:host=" . self::$dbHost . ";dbname=" . self::$dbName . ';charset=' . self::$charset, self::$dbUsername, self::$dbUserpassword);
            } catch(PDOException $e) { 
                // var_dump($e->getMessage());
                die($e->getMessage());
                echo 'Connexion à la base impossible, veuillez contacter votre administrateur';
            }
        }
        return self::$connection;
    }
    
    public static function disconnect(){
        self::$connection = null;
    }

}

?>

