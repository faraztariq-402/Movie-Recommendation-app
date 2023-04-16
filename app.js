(async function () {
    const response = await fetch("./response.json");
    const movies = await response.json();
    const inputElem1 = document.getElementById("input1");
    const inputElem2 = document.getElementById("input2");
    const inputElem3 = document.getElementById("input3");
    const movieList = document.getElementById("movieList")
    const movieDetails = document.getElementById("movieDetails")
    movieDetails.innerHTML = ""


    const searchBtn = document.getElementById("searchBtn");
    function movieDetailsOnScreen(movie){
      movieDetails.innerHTML = ""
    let minutes = 113;
    let hours = Math.floor(movie.runtime / 60);;
let remainingMinutes = minutes % 60;
let time = hours.toString() + 'h ' + remainingMinutes.toString() + 'min';

movieDetails.innerHTML = `

<h2><b>Name : ${movie.title}</b><h2>
<ul class = "listItems"><b>Genres : ${movie.genres.map(function(mygenre){

return "<li class = 'childList'>" + mygenre + "," + "</li>"
}).join("")}</b></ul>
<h1>Year : </h1>
<div class = yearFont><b>${movie.release_date}</b></div>
<h1>Run Time : </h1>
<div class = yearFont><b>${time}</b></div>
`

    }
  function displayResultsOnScreen(finalAnswer){
    movieList.innerHTML = ""
    finalAnswer.forEach(function(movie){
 const li = document.createElement("li");
const img = document.createElement("img");
const a = document.createElement("a");
img.src = `https://image.tmdb.org/t/p/w92${movie.poster_path}`
 

li.appendChild(img)
li.appendChild(a)
li.innerHTML += movie.title 
li.classList.add("movieList-li");
li.addEventListener("click", function(){
movieDetailsOnScreen(movie)
})
 //  `
// //    <li><div class = "title">${movie.title}</div>
// //    <div class = "movieGenre">${movie.genres}</div>
   
   
// //    </li>


// // `
movieList.appendChild(li);
    })
  }
    function search() {
      const genre = inputElem1.value.toLowerCase();
      const year = inputElem2.value;
      const language = inputElem3.value.toLowerCase();

      const finalAnswer = movies.filter(function (movie) {
        const genreAnswer = movie.genres && Array.isArray(movie.genres) &&
        movie.genres.join("").toLowerCase().includes(genre); 
     const yearAnswer = movie.release_date.includes(year);
     const languageAnswer = movie.original_language.toLowerCase().includes(language)
    return genreAnswer && yearAnswer && languageAnswer;  
    })
displayResultsOnScreen(finalAnswer)
movieDetails.innerHTML = ""

  }
  
    searchBtn.addEventListener("click", search);
  })();