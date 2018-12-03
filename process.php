<?php

// mysql_real_escape_string 
require('./sql_database.php');

$param = strip_tags(trim( $_GET["param"])); // The strip_tags() function strips all HTML and PHP tags from a variable. 
                                            // The trim() function just strips any white space from beginning and end of the string 
$table = "movies";
$selectedColumn = "movie_title, movie_genre";
$columnValue = "movie_title";
$request;
$response;

// check if the param is defined ( = check if user has entered something into input field)
if(isset($param) && !empty($param)){ 
    $request = "SELECT "  . $selectedColumn .  " FROM " . $table . " WHERE "  . $columnValue .  " like ?";
    // $request = "SELECT $selectedColumn FROM $table WHERE $columnValue like ?";
} else {
    $request = 'SELECT * FROM movies'; 
}


// tries to establish a connection to the database
try {
    $resultat = Database::connect() -> prepare($request);
    $resultat -> execute(array("%".$param."%"));
    $response = $resultat -> fetchAll();
} catch(Exception $e) {
    var_dump($e->getMessage());
    $response = "no correlation established, you are the only and last lifeform in the universe... scary I know";
}

echo json_encode($response);

?>


