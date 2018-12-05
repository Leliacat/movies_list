<?php

require('./sql_database.php');

$table = "movies";
$selectedColumn = "movie_title, movie_genre";
$columnValue = "movie_title";

$search = strip_tags(trim( $_GET["search"])); // The strip_tags() function strips all HTML and PHP tags from a variable. 
                                            // The trim() function just strips any white space from beginning and end of the string 
                                            // link : https://www.dreamhost.com/blog/php-security-user-validation-sanitization/                             
$page = $_GET['page']; 
$currentPage;
$resultsPerPage = 25;
$request_count;
$request;
$request_limit = " LIMIT $resultsPerPage";
$request_offset;
$response_allResults; //response with all results
$response_slice; // slice of 25 results

 /********************************************************** 'SEARCH' PARAMETER **********************************************************/

// check if the 'search' parameter is defined ( = check if user has entered something into input field)
// and adapt the request content accordingly
if(isset($search) && !empty($search)){ 
    // $request = "SELECT "  . $selectedColumn .  " FROM " . $table . " WHERE "  . $columnValue .  " like ?";
    $request = "SELECT $selectedColumn FROM $table WHERE $columnValue like ? ORDER BY movie_id ASC";
    $request_count = "SELECT COUNT($selectedColumn) AS total FROM $table WHERE $columnValue like ?";
} else {
    $request = 'SELECT * FROM movies ORDER BY movie_id ASC'; 
    $request_count = "SELECT COUNT(*) AS total FROM $table";
};

/************************************************************* COUNT REQUEST ****************************************************************/

//count total number of results 
$request_all = Database::connect() -> prepare($request);
$request_all -> execute(array("%".$search."%"));
$response_allResults = $request_all -> fetchAll();
// $total = $response_allResults['total'];
$total = count($response_allResults); // we must make a first request to know the total count of results
// echo $total." est le total";

/********************************************************* 'PAGE' PARAMETER **************************************************************/

// according to the number of results, the number of pages is calculated
$numberOfPages = ceil($total / $resultsPerPage);

// check if the 'page' parameter is defined and if its type is number
if(isset($page) && !empty($page) && ctype_digit($page)){
        if($page > $numberOfPages){ //in the unlikely event of a 'page' parameter superior to total number of pages fot this search
            $currentPage = $numberOfPages;
        }else{
            $currentPage = $page;
        }
    }else{ //by default, the user will be directed to first page
        $currentPage = 1;
    }

// determine which results will be seen on each page
 $firstOfPage = ($currentPage * $resultsPerPage) - ($resultsPerPage-1);
 $request_offset = " OFFSET $firstOfPage";
 
/************************************************** SEARCH REQUEST (slices of 25 results max) ***********************************************/

// tries to establish a connection to the database and send a request with the complement
try {
    $request_slice = Database::connect() -> prepare($request.$request_limit.$request_offset);
    $request_slice -> execute(array("%".$search."%"));
    $response_slice = $request_slice -> fetchAll();
} catch(Exception $e) {
    var_dump($e->getMessage());
    $response_slice = "no correlation established, you are the only and last lifeform in the universe... scary I know";
};    

// $response = ('numberOfPage' => "$numberOfPages",
//             'movie_results' => "$response_slice");
    
echo json_encode(array($numberOfPages,$response_slice));

?>


