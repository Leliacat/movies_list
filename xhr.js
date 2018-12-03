const btnRecherche = document.getElementById("btn_search"); // button to lauch a search
const zoneRecherche = document.getElementById("search_field"); // search input
const results_list = document.getElementById("movie_search_results");
const loader = document.getElementById("loader");

let url = "process.php?param="; // String representing the URL to send the request to.
let xhr; // name of XML HTTP request
let paramSQL; // value of search input (entered by the user)


// create a new request
try {
    xhr = new XMLHttpRequest();
} catch(Exception) {
    alert('ça c\'est pas super bien passé');
}


// lauch the request and collect data from the response
const fetchData = (param) => {

    try {
        xhr.open("GET", url + param , true);
        xhr.send(null);
        xhr.onreadystatechange = () => {
            // check if the server did get back the response without error
            if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){

                // if the expected response is received, the loader is not displayed
                loader.style.display = "none";
                // get the response content and parse it into JSON format
                console.log( 'telle est la réponse: ' + xhr.responseText.toString());
                let mesFilms = JSON.parse(xhr.responseText);
                displayItemsinList(mesFilms);

                // check if the response actually contains some movie and display movies on screen
                if (mesFilms.length > 0 ){
                    console.log( 'une fois parsé, ça donne: ' + mesFilms);
                } else { 
                    // if the response is empty, a message is displayed to inform the user
                    console.log( "euh... on n'a rien trouvé, bizarre comme recherche: " + xhr.responseText);
                    let message = document.createElement('li');
                    message.textContent = 'Sorry but we have not found anything like that... not judging but maybe try something more... conventional... XD';
                    results_list.insertBefore(message, results_list.childNodes[0]);  // Insert <li> before the first child of <ul>
                }
                
            } else if (xhr.readyState < 4) {
                // if the server response has not arrived yet, the loader is displayed on screen
                // to warn the user the request is being processed
                loader.style.display = "inline-block";
            }
        };
    } catch(Exception) {
            alert('pas top');
            // TODO display error message to user. beautiful popup stuff would be nice...
    }
};



// displays collected data into desired elements of the DOM
const displayItemsinList = (data) => {
    data.forEach(element => {
            console.log(element.movie_title + " --- " + element.movie_genre);
            let list_item = document.createElement('li');
            list_item.classList.add('list-group-item');
            list_item.innerHTML = "<h5> " + element.movie_title + " </h5><span> " + element.movie_genre + " </span>";
            results_list.appendChild(list_item);

            // TODO AJOUTER LIMIT à 25 résultats et système de pagination

            // diviser la longueur de data par 25 pour avoir le nombre de pages
            // et créer bouton correspondant au nombre de page
            // et eventListener sur chaque bouton (numéro de page)

            // associer à chaque page le contenu qui lui correspond
            // récupérer un arraylist des list_items 
            // et boucler sur cet arraylist et appendChild item_list (via callback des eventlisteners des boutons) :
            // - de indice 0 à 24 pour page 1
            // - de indice 25 à 49 pour page 2
            // - de indice 50 à 74 pour page 3 ... etc.
            
    });
};
	


// sets an event listener on the button
btnRecherche.addEventListener("click", () => {

     // gets input value into a string and removes any special characters
    paramSQL = zoneRecherche.value.replace(/[^a-zA-Z ]/g, "");
    console.log(paramSQL);

    //check if there's something in the input field
    if (paramSQL === undefined || paramSQL == null || paramSQL.length <= 0 ){ 
        // ask the user to enter a keyword before lauching specific research
        console.log("c'est viiiiiiide, VIIIIDDEEEE, ô vacuité des apparences!");
        results_list.innerHTML = '<h4>Please insert... something into the searchfield, use your imagination ;)</h4>';  
    }else {
        // clear research results before launching new request
        while (results_list.firstChild) {
            results_list.removeChild(results_list.firstChild);
        }
        //launch a new request
        fetchData(paramSQL); 
    }
      
});


