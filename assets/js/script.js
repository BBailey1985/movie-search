// variables
var searchBoxEl = document.querySelector("#title");
var searchButtonEl = document.querySelector("#search-button");
var watchListEl = document.querySelector("#watch-list");
var repoListEl = document.querySelector("#repo-list");
var warningEl = document.querySelector(".input-field");
var warningParagraphEl=document.querySelector(".warning");
//API Keys to pull in data
var titleApiKey = "c0542bf1";
var genreApiKey = "1d758f3d2b1a8c8efada332dc1acd449";

//submit form handler 
var submitFormHandler= function(event){
event.preventDefault();
var movie=searchBoxEl.value.toLowerCase().trim()

if (movie){
    warningParagraphEl.classList.remove("show");
    getMovie()
   
}else{ warningParagraphEl.classList.add("show");
}
}
  

// function to search movie title
var getMovie = function(titleName) {
  var apiUrl = "https://www.omdbapi.com/?apikey=" + titleApiKey + "&s=" + titleName;

  //fetch API for titles and then display data
  fetch(apiUrl).then(function(response) {
    console.log(response);
      if(response.ok){
        response.json().then(function(data) {
            displayTitles(data.Search)
            console.log(data);
  })
      }else {
          console.log(response.statusText)
      }
  // fetch API for genres
  var genreApiUrl = "https://api.themoviedb.org/3/search/movie?api_key=" + genreApiKey + "&query=" + titleName;
  fetch(genreApiUrl).then(function(response) {
    response.json().then(function (data) {
      console.log(data);
   });
  });
});
}

//display movie titles
var displayTitles = function(titles) {
    for(var i = 0; i < titles.length; i++) {
      var moviesListItem = document.createElement("div");
      var moviesThumb = document.createElement("img");
      var moviesInfo = document.createElement("div");
      if (titles[i].Poster == "N/A") {
        moviesThumb.src = "assets/img/image-not-found.png"
      } else {
        moviesThumb.src=titles[i].Poster;
      }         
      moviesInfo.innerHTML = '<div><h5>' + titles[i].Title + '<h5><p class = "card-title">' + titles[i].Year + '</p>'
      moviesListItem.append(moviesInfo); 
      moviesListItem.append(moviesThumb);      
      moviesListItem.setAttribute("class", "card");          
      repoListEl.appendChild(moviesListItem);

    }
  
}


// submit button
searchButtonEl.addEventListener("click", function () {
  var selectedTitle = searchBoxEl.value;
  getMovie(selectedTitle);
  searchBoxEl.value ="";
});