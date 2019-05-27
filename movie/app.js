$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchTerm = $("#searchText").val();
    getMovies(searchTerm);
    e.preventDefault();
  });
});

function getMovies(searchTerm) {
  let apikey = "1f987e93";
  axios
    .get("http://www.omdbapi.com/?s=" + searchTerm + "&apikey=" + apikey)
    .then(response => {
      console.log(response);
      let movies = response.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        if (movie.Poster === "N/A") {
          console.log(movie.Poster);
          movie.Poster = "http://tuomas.com/projects/imdbapi/noPoster.jpg";
        }
      });
      $.each(movies, (index, movie) => {
        output += `
            <div class="col-md-3">
                <div class="well text-center">
                   <img src="${movie.Poster}">
                    <h5> ${movie.Title} </h5>
                    <a onClick="movieSelected('${
                      movie.imdbID
                    }')" class="btn btn-primary href="#"> Movie Details</a>
                </div>
            </div>
        `;
      });
      $("#movies").html(output);
    })

    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  let apikey = "1f987e93";

  axios
    .get("http://www.omdbapi.com/?i=" + movieId + "&apikey=" + apikey)
    .then(response => {
      let movie = response.data;
      let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                    </div>
                    <div class="col-md-8">
                    <h2 class="display-3">${movie.Title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Genre:</strong> ${
                          movie.Genre
                        } </li>
                        <li class="list-group-item"><strong>Released:</strong> ${
                          movie.Released
                        } </li>
                        <li class="list-group-item"><strong>Rated:</strong> ${
                          movie.Rated
                        } </li>
                        <li class="list-group-item"><strong>IMDB Rating:</strong> ${
                          movie.imdbRating
                        } </li>
                        <li class="list-group-item"><strong>Director:</strong> ${
                          movie.Director
                        } </li>
                        <li class="list-group-item"><strong>Writers:</strong> ${
                          movie.Writer
                        } </li>
                        <li class="list-group-item"><strong>Actors:</strong> ${
                          movie.Actors
                        } </li>
                    </ul>
                    </div>
                    </div>
                    <div class="row">
                    <div class="well">
                    <h3>Plot</h3>
                    ${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${
                      movie.imdbID
                    }" target="_blank" class="btn btn-primary">view in IMDB</a>
                    <a href="index.html" class="btn btn-primary">Go Back To Search</a>
        `;

      $("#movie").html(output);
    })

    .catch(err => {
      console.log(err);
    });
}
