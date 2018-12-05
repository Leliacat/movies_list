const btnSearch = document.getElementById("btn_search"); // button to lauch a search
const search_field = document.getElementById("search_field"); // search input
const results_list = document.getElementById("movie_search_results");
const loader = document.getElementById("loader");
const nav = document.getElementById('navigation');

let url_base = "process.php?"; // String representing the URL to send the request to.
let url_complement_search = "search=";
let url_complement_page = "&page=";

let newSearch = false;
let inputSearchValue; // value of search input (entered by the user)
let currentPage = 1; // page on which we are, by default it is set to 1
let targetPage; // page we want to go to
let pageNumber;
let pagination_buttons_tab = [];
let xhr; // name of XML HTTP request

/********************************************************** XML HTTP REQUEST **********************************************************/
// create a new request
try {
    xhr = new XMLHttpRequest();
} catch(Exception) {
    alert('Damned! Things went wrong, task failed successfully!');
}

/********************************************************** FETCH DATA **********************************************************/
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
                // console.log( 'telle est la réponse: ' + xhr.responseText.toString());
                let response = JSON.parse(xhr.responseText);
                // display pagination
                pageNumber = response[0];
                if (pagination_buttons_tab.length <= 0 || pagination_buttons_tab == undefined || newSearch){
                    displayPagination(pageNumber, currentPage);
                }
                // display movies on screen
                let mesFilms = response[1];
                displayItemsinList(mesFilms);
                // console.log(mesFilms.length);
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

/********************************************************** DISPLAY PAGINATION **********************************************************/
// creates pagination buttons corresponding to number of pages
const displayPagination = (pageNb, currPage) => {
    // clears pagination at each new search
    pagination_buttons_tab = [];
    while (nav.firstChild) {
        nav.removeChild(nav.firstChild);
    }   
    
    // add a nav button for each page of results
    for (i = 1; i <= pageNb; i++){
        // model of HTML we want to create for each page :  <li class="page-item"><a class="page-link" href="#">1</a></li>
        let pagination_item = document.createElement('li');
        pagination_item.className ='page-item';
        nav.appendChild(pagination_item);

        let page_link = document.createElement('button');
        page_link.className = 'page-link';
        page_link.textContent = i;
        page_link.id = 'btn' + i;

        pagination_item.appendChild(page_link);
        pagination_buttons_tab.push(page_link);

        page_link.addEventListener('click', () =>{
            displayAccordingContent(page_link);
        });

        // after creating pagination, we add active class to currentPage button
        if (currPage == i){
            let activeButton = document.getElementById('btn'+ i);
            activeButton.classList.add('btn_active');
        }
    } 
    // if there's more than one page of results we create two more navigation elements : the previous and next buttons
    if (pageNb > 1){
        // make the pagination item and give them classes
        let pagination_item_previous = document.createElement('li');
        let pagination_item_next = document.createElement('li');

        pagination_item_previous.className ='page-item previous';
        pagination_item_next.className ='page-item next';
        
        // create the buttons
        let btn_previous = document.createElement('button');
        let btn_next = document.createElement('button');
        
        btn_previous.className = 'page-link';
        btn_next.className = 'page-link';
        // add the buttons to an array 
        pagination_buttons_tab.push(btn_previous);
        pagination_buttons_tab.push(btn_next);
    
        btn_previous.textContent= 'previous';
        btn_previous.id = 'btn_previous';
        btn_next.textContent = 'next';
        btn_next.id = 'btn_next';

        pagination_item_previous.appendChild(btn_previous);
        pagination_item_next.appendChild(btn_next);

        nav.insertBefore(pagination_item_previous, nav.firstChild);
        nav.lastChild.after(pagination_item_next);
        
        //add eventlisteners to buttons previous and next
        btn_previous.addEventListener('click', () =>{
            displayAccordingContent(btn_previous);
        });
        btn_next.addEventListener('click', () =>{
            displayAccordingContent(btn_next);
        });
    }
};

/********************************************************** DISPLAY ITEMS LIST **********************************************************/
// displays movies results into the DOM
const displayItemsinList = (data) => {
    data.forEach(element => {
        // console.log(element.movie_title + " --- " + element.movie_genre);
        let list_item = document.createElement('li');
        list_item.classList.add('list-group-item');
        list_item.innerHTML = "<h5> " + element.movie_title + " </h5><span> " + element.movie_genre + " </span>";
        results_list.appendChild(list_item); 
    }); 
};

/********************************************************** DISPLAY CONTENT ACCORDING TO PAGINATION **********************************************************/
// display content according to the id of clicked button 
const displayAccordingContent = (btn) => {
    console.log("coucou je suis le bouton " + btn.id + " je viens d'être clické, cool non? ");
    console.log(pagination_buttons_tab);

    // remove class btn_active from other buttons
    for(let i = 0; i < pagination_buttons_tab.length; i++){
        if( pagination_buttons_tab[i].classList.contains('btn_active')){
            pagination_buttons_tab[i].classList.remove('btn_active');
        }
    }
    // handle buttons callbacks
    if (btn.textContent == 'previous'){
        if(currentPage !== 1){
            targetPage = currentPage - 1;
        }
    }else if (btn.textContent == 'next'){
        if(currentPage !== pageNumber){
            targetPage = currentPage + 1;
        }
    }else{
        // add class btn_active to the button that has just been clicked
        btn.classList.add('btn_active');
        // btn.style.color = 'purple';
        console.log(" moi " + btn.id + " j'ai les classes suivantes: " + btn.classList);
        targetPage = btn.textContent;
    }

    console.log(targetPage);
    currentPage = targetPage;

    // if the button clicked is next or previous, add class btn_active to button of currentPage
    if(btn.textContent == 'previous' || btn.textContent == 'next'){
        for(let i = 0; i < pagination_buttons_tab.length; i++){
            if( pagination_buttons_tab[i].textContent == currentPage){
                pagination_buttons_tab[i].classList.add('btn_active');
            }
        }
    }
    // clear research results before launching new request
    while (results_list.firstChild) {
        results_list.removeChild(results_list.firstChild);
    }  
    //launch a request to get appropriate results
    fetchData(inputSearchValue, targetPage); 
};


/********************************************************** BUTTON SEARCH EVENT LISTENER **********************************************************/
// sets an event listener on the button 'search'
btnSearch.addEventListener("click", () => {
    newSearch = true;
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
    displayPagination(pageNumber, currentPage);
});

// TODO put a listener on enter to launch a request
// search_field.addEventListener('keypress', function (e) {
//     let key = e.which || e.keyCode;
//     if (key === 13) { // 13 is enter
//       // code for enter
//     }
// });

