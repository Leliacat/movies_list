const btnSearch = document.getElementById("btn_search"); // button to lauch a search
const search_field = document.getElementById("search_field"); // search input
const results_list = document.getElementById("movie_search_results");
const loader = document.getElementById("loader");
const nav = document.getElementById('navigation');

let url_base = "process.php?"; // String representing the URL to send the request to.
let url_complement_search = "search=";
let url_complement_page = "&page=";

let inputSearchValue; // value of search input (entered by the user)
let currentPage = 1; // page on which we are, by default it is set to 1
let targetPage; // page we want to go to
let xhr; // name of XML HTTP request

// create a new request
try {
    xhr = new XMLHttpRequest();
} catch(Exception) {
    alert('Damned! Things went wrong, task failed successfully!');
}


// lauch the request and collect data from the response
const fetchData = (search, page) => {

    try {
        xhr.open("GET", url_base + url_complement_search + search + url_complement_page + page, true);
        xhr.send(null);
        xhr.onreadystatechange = () => {
            // check if the server did get back the response without error
            if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){

                // if the expected response is received, the loader is not displayed
                loader.style.display = "none";
                // get the response content and parse it into JSON format
                console.log( 'telle est la réponse: ' + xhr.responseText.toString());
                let response = JSON.parse(xhr.responseText);
                // display pagination
                let pageNumber = response[0];
                displayPagination(pageNumber, currentPage);
                // display movies on screen
                let mesFilms = response[1];
                displayItemsinList(mesFilms);
                console.log(mesFilms.length);
                // check if the response actually contains some movie 
                if (mesFilms.length <= 0 ){
                    // if the response is empty, a message is displayed to inform the user
                    console.log( "euh... on n'a rien trouvé, bizarre comme recherche: " + xhr.responseText);
                    results_list.innerHTML = '<h5>Sorry but we have not found anything like that... not judging but maybe try something more... conventional... XD </h5>'; 
                }
                
            } else if (xhr.readyState < 4) {
                // if the server response has not arrived yet, the loader is displayed on screen
                // to warn the user the request is being processed
                loader.style.display = "inline-block";
            }
        };
    } catch(Exception){
        console.log(Exception);
        alert('pas top');
        // TODO display error message to user. beautiful popup stuff would be nice...
    }
};


// creates pagination buttons corresponding to number of pages
const displayPagination = (pageNb) => {
    // clears pagination at each new search
    while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
    }   
    // add a nav button for each page of results
    for (i = 1; i <= pageNb; i++){
        // model of HTML we want to create for each page : 
        // <li class="page-item"><a class="page-link" href="#">1</a></li>
        let pagination_item = document.createElement('li');
        pagination_item.className ='page-item';
        nav.appendChild(pagination_item);
        let page_link = document.createElement('button');
        page_link.className = 'page-link';
        page_link.textContent = i;
        page_link.id = 'btn' + i;
        pagination_item.appendChild(page_link);
        page_link.addEventListener('click', displayAccordingContent());
    } 
    
    // if there's more than one page of results we create two more navigation elements : the previous and next buttons
    if (pageNb > 1){
        let pagination_item_previous = document.createElement('li');
        pagination_item_previous.className ='page-item previous disabled';
        let pagination_item_next = document.createElement('li');
        pagination_item_next.className ='page-item next';
        let btn_previous = document.createElement('button');
        btn_previous.className = 'page-link';
        btn_previous.textContent= 'previous';
        pagination_item_previous.appendChild(btn_previous);
        let btn_next = document.createElement('button');
        btn_next.className = 'page-link';
        btn_next.textContent = 'next';
        pagination_item_next.appendChild(btn_next);
        nav.insertBefore(pagination_item_previous, nav.firstChild);
        nav.lastChild.after(pagination_item_next);
    }
};

// displays movies results into the DOM
const displayItemsinList = (data) => {
    data.forEach(element => {
        console.log(element.movie_title + " --- " + element.movie_genre);
        let list_item = document.createElement('li');
        list_item.classList.add('list-group-item');
        list_item.innerHTML = "<h5> " + element.movie_title + " </h5><span> " + element.movie_genre + " </span>";
        results_list.appendChild(list_item); 
    }); 
};

// display content according to the id of clicked button 
const displayAccordingContent = () => {
    console.log(page_link.id);
    //afficher : 
    // - de indice 0 à 24 pour page 1
    // - de indice 25 à 49 pour page 2
    // - de indice 50 à 74 pour page 3 ... etc.
    // pour ça on a besoin d'actualiser la valeur de targat page et de lancer une nouvelle requête avec ce paramètre
    // et garder la parmètre search existant
};

// sets an event listener on the button 'search'
btnSearch.addEventListener("click", () => {

    // gets input value into a string and removes any special characters
    inputSearchValue = search_field.value.replace(/[^a-zA-Z ]/g, "");
    console.log(inputSearchValue);

    // clear research results before launching new request
    while (results_list.firstChild) {
        results_list.removeChild(results_list.firstChild);
    }   

    //check if there's something in the input field
    if (inputSearchValue === undefined || inputSearchValue == null || inputSearchValue.length <= 0 ){ 
        // ask the user to enter a keyword to launch a specific research
        let message = document.createElement('h5');
        message.textContent = 'Feel free to insert... something into the searchfield, use your imagination ;)';
        results_list.insertBefore(message, results_list.childNodes[0]);  // Insert <li> before the first child of <ul>
        console.log("c'est viiiiiiide, VIIIIDDEEEE, ô vacuité des apparences!");
    }

    //launch a new request
    fetchData(inputSearchValue, targetPage); 
});

// TODO put a listener on enter to launch a request
// search_field.addEventListener('keypress', function (e) {
//     let key = e.which || e.keyCode;
//     if (key === 13) { // 13 is enter
//       // code for enter
//     }
// });

