// variables
var searchBoxEl = document.querySelector("#title");
var searchButtonEl = document.querySelector("#search-button");
var watchListEl = document.querySelector("#watch-list");
var repoListEl = document.querySelector("#repo-list");
var warningEl = document.querySelector(".input-field");
var warningParagraphEl = document.querySelector(".warning");
var titleInfoEl = document.querySelector("#title-info");
var titleSummary = document.querySelector("#title-summary");
var modalTitleEl = document.querySelector("#modal-title");
var modalSummaryEl = document.querySelector("#modal-summary");
var modalImageEl= document.querySelector("#modal-image");
var modalButtonEl = document.querySelector("#modal-button");
var savedMovies = [];

//API Keys to pull in data
var ApiKey = "1d758f3d2b1a8c8efada332dc1acd449";

//submit form handler
var submitFormHandler = function (event) {
  event.preventDefault();
  var movie = searchBoxEl.value.toLowerCase().trim();

  if (movie) {
    warningParagraphEl.classList.remove("show");
    repoListEl.innerHTML = "";
    getMovie(movie);
  } else {
    warningParagraphEl.classList.add("show");
  }
};

// function to search movie title
var getMovie = function (titleName) {
  var apiUrl =
    "https://api.themoviedb.org/3/search/movie?&api_key=" +
    ApiKey +
    "&query=" +
    titleName;

  //fetch API for titles and then display data
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayTitles(data.results);
        console.log(data);
      });
    } else {
      console.log(response.statusText);
    }
    // fetch API for genres
    // var genreApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + ApiKey + "&query=" + titleName;
    // fetch(genreApiUrl).then(function(response) {
    //   response.json().then(function (data) {
    //     console.log(data);
    //  });
    // });
  });
};

// display movie titles
var displayTitles = function (titles) {
  var display = titles.splice(10);
  display.forEach((el) => {
    var moviesListItem = document.createElement("div");
    var moviesThumb = document.createElement("img");
    moviesListItem.style.display = "flex";
    moviesListItem.style.padding = "10px";
    moviesThumb.style.marginRight = "10px";
    var moviesInfo = document.createElement("div");
    if (el.poster_path == null) {
      moviesThumb.setAttribute("src", "./image-not-found.png");
      moviesThumb.style.width = "50px";
      moviesThumb.style.height = "70px";
    } else {
      moviesThumb.setAttribute(
        "src",
        "https://image.tmdb.org/t/p/original" + el.poster_path
      );
      moviesThumb.style.width = "50px";
      moviesThumb.style.height = "70px";
    }
    moviesInfo.innerHTML =
      "<p>" + el.title + "</p><p>" + el.release_date + "</p>";
    moviesListItem.append(moviesThumb);
    moviesListItem.append(moviesInfo);
    moviesListItem.setAttribute("class", "card");
    repoListEl.appendChild(moviesListItem);

    moviesListItem.addEventListener("click", function(event) {
      console.log(event.target)
      var elem = document.querySelector("#modal1");
      var instance = M.Modal.init(elem);
      instance.open()
      modalTitleEl.textContent = el.title;
      modalSummaryEl.textContent = el.overview;
      modalImageEl.setAttribute( "src", "https://image.tmdb.org/t/p/original" + el.poster_path)
      modalButtonEl.addEventListener("click", function (){
        saveLocalStorage(el)
        // we were having trouble callign the data instantly when modal initiated. 
        //By binding the function to the event lister we are supposedly calling it there. 
        //Supposedly by writing it the above way instead we are now assigning the function to a handler.
        //I don't fully understand, but maybe it does what we want now?
      });     
         
    });    

  });
};


function saveLocalStorage (item) { 
  console.log(item);     
    var savedFilms = JSON.parse(localStorage.getItem("savedMovies")) || [];
    if (!savedFilms.includes(item)) {
      savedFilms.push(item) 
    } 
    localStorage.setItem("savedMovies", JSON.stringify(savedFilms))
}

// submit button
searchButtonEl.addEventListener("click", submitFormHandler);
