// const btnSearch = document.getElementById("btn_search"); // button to lauch a search
// const search_field = document.getElementById("search_field"); // search input
// const results_list = document.getElementById("movie_search_results");
// const loader = document.getElementById("loader");

// let url_base = "process.php?"; // String representing the URL to send the request to.
// let url_complement_search = "search=";
// let url_complement_page = "&page=";

// let inputSearchValue; // value of search input (entered by the user)
// let targetPage; // page we want to go to, by default it is set to 1
// let xhr; // name of XML HTTP request

// // create a new request
// try {
//     xhr = new XMLHttpRequest();
// } catch(Exception) {
//     alert('Damned! Things went wrong, task failed successfully!');
// }


// // lauch the request and collect data from the response
// const fetchData = (search, page) => {

//     try {
//         xhr.open("GET", url_base + url_complement_search + search + url_complement_page + page, true);
//         xhr.send(null);
//         xhr.onreadystatechange = () => {
//             // check if the server did get back the response without error
//             if(xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)){

//                 // if the expected response is received, the loader is not displayed
//                 loader.style.display = "none";
//                 // get the response content and parse it into JSON format
//                 console.log( 'telle est la réponse: ' + xhr.responseText.toString());
//                 let mesFilms = JSON.parse(xhr.responseText);
//                 // display movies on screen
//                 displayItemsinList(mesFilms);
//                 console.log(mesFilms.length);
//                 // check if the response actually contains some movie 
//                 if (mesFilms.length <= 0 ){
//                     // if the response is empty, a message is displayed to inform the user
//                     console.log( "euh... on n'a rien trouvé, bizarre comme recherche: " + xhr.responseText);
//                     results_list.innerHTML = '<h5>Sorry but we have not found anything like that... not judging but maybe try something more... conventional... XD </h5>'; 
//                 }
                
//             } else if (xhr.readyState < 4) {
//                 // if the server response has not arrived yet, the loader is displayed on screen
//                 // to warn the user the request is being processed
//                 loader.style.display = "inline-block";
//             }
//         };
//     } catch(Exception){
//         console.log(Exception);
//         alert('pas top');
//         // TODO display error message to user. beautiful popup stuff would be nice...
//     }
// };

// // associer à chaque page/bouton le contenu qui lui correspond
// const displayAccordingContent = () => {
//     // switch(btn.id){
//     //     case bnt1: ;
//     //     break;
//     //     case bnt2: ;
//     //     break;
//     //     case bnt3: ;
//     //     break;
//     //     case bnt4: ;
//     //     break;
//     }
//     // récupérer un arraylist des list_items 
//     // et boucler sur cet arraylist et appendChild items_list:
//     // - de indice 0 à 24 pour page 1
//     // - de indice 25 à 49 pour page 2
//     // - de indice 50 à 74 pour page 3 ... etc.
// // }

// // displays collected data into desired elements of the DOM
// const displayItemsinList = (data) => {
//     data.forEach(element => {
//         console.log(element.movie_title + " --- " + element.movie_genre);
//         let list_item = document.createElement('li');
//         list_item.classList.add('list-group-item');
//         list_item.innerHTML = "<h5> " + element.movie_title + " </h5><span> " + element.movie_genre + " </span>";
//         results_list.appendChild(list_item); 
//     });
    
//      // TODO AJOUTER LIMIT à 25 résultats et système de pagination
//         // establish the number of pages (we want a maximum of 25 results per page)
//         // let pageNumber = Math.ceil(data.length / 25);

//         // et créer bouton correspondant au nombre de page
//         for (i = 0; i <= pageNumber; i++){
//             let btn = document.createElement('button');
//             btn.className ='btn btn-light';
//             btn.id = 'btn' + i;
//             btn.textContent = i;
//             // btn.addEventListener('click', displayAccordingContent());
//             // modele d'élement à créer pour la pagination : 
//             // <li class="page-item"><a class="page-link" href="#">1</a></li>
//          }
// };


// // to put a listener on enter
// //document.querySelector('#txtSearch').addEventListener('keypress', function (e) {
// //     var key = e.which || e.keyCode;
// //     if (key === 13) { // 13 is enter
// //       // code for enter
// //     }
// // });

// // sets an event listener on the button
// btnSearch.addEventListener("click", () => {

//     // gets input value into a string and removes any special characters
//     inputSearchValue = search_field.value.replace(/[^a-zA-Z ]/g, "");
//     console.log(inputSearchValue);

//     // clear research results before launching new request
//     while (results_list.firstChild) {
//         results_list.removeChild(results_list.firstChild);
//     }   

//     //check if there's something in the input field
//     if (inputSearchValue === undefined || inputSearchValue == null || inputSearchValue.length <= 0 ){ 
//         // ask the user to enter a keyword to launch a specific research
//         let message = document.createElement('h5');
//         message.textContent = 'Feel free to insert... something into the searchfield, use your imagination ;)';
//         results_list.insertBefore(message, results_list.childNodes[0]);  // Insert <li> before the first child of <ul>
//         console.log("c'est viiiiiiide, VIIIIDDEEEE, ô vacuité des apparences!");
//     }

//     //launch a new request
//     fetchData(inputSearchValue, targetPage); 
// });


