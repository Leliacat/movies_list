<?php
require('./sql_database.php');
function completeMovieList(){
    $resultat = Database::connect()->query('SELECT * FROM movies ORDER BY movie_title ASC');
    while($row = $resultat->fetch(PDO::FETCH_ASSOC)){
        echo "<li class='list-group-item'>
                <h5>" . $row["movie_title"] . "</h5>
                <span>" . $row["movie_genre"] . "</span>
              </li>";
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Find a movie</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" 
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
        <link rel="stylesheet" href="./style.css">
    </head>

    <body>
        <div class="input-group input-group-lg searchfield">
            <img src="./img/kawaii_loupe.png" alt="" class="kawaii_loupe">
            <input type="text" class="form-control"  placeholder="Please enter some keywords..." 
            aria-label="Please enter some keywords for your research" aria-describedby="basic-addon2"
            id="search_field">
            <div class="input-group-append">
                <button class="btn btn-outline-secondary btn_search" id="btn_search" type="button">Search</button>
            </div>
            <img src="./img/movie-1.png" alt="" class="movie_icon">
        </div>

        <div class="darkPoney" id="darkPoney">
        <nav aria-label="Page navigation">
            <ul class="pagination justify-content-center" id='navigation'>
                <!-- <li class="page-item disabled">
                    <button class="page-link" tabindex="-1">Previous</button>
                </li>
                <li class="page-item"><button class="page-link" >1</button></li>
                <li class="page-item"><button class="page-link" >2</button></li>
                <li class="page-item"><button class="page-link" >3</button></li>
                <li class="page-item">
                    <button class="page-link" >Next</button>
                </li> -->
            </ul>
        </nav>
            <ul id="movie_search_results" class="list-group list_results"> 
                <?php completeMovieList()?>
            </ul>
            <div class="lds-roller" id="loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>

        <script src="./xhr.js"></script>
    </body>
</html>
