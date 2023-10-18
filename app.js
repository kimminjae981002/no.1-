const movieCardLine = document.querySelector(".movieCardLine");
const searchInput = document.getElementById("searchMovieInput");
const searchBtn = document.querySelector(".searchMovieBtn");
const pageTitle = document.getElementsByTagName("h1");

console.log(pageTitle);
pageTitle.textContent = "하하ㅏㅎ";

const tmdbKey = "cc94064ab94a0145a45541730eb6f94b";

const fetchMovie = async () => {
  //   movieCardLine.remove();
  const url =
    "https://api.themoviedb.org/3/trending/all/week?api_key=" +
    tmdbKey +
    "&language=ko-KR";
  const response = await axios.get(url);
  let data = response.data;
  let results = data.results;
  results.forEach((movie) => {
    let image = movie.backdrop_path;
    let title = movie.title;
    let overview = movie.overview;
    let ratio = movie.vote_average;
    let temp_html = `
        <div class="card">
          <img
            src="http://image.tmdb.org/t/p/original/${image}"
            alt=""/>
          <span class="cardTitle">${title}</span>
          <span class="cardStory">${overview}</span>
          <span class="cardRatio">평점: ${ratio}</span>
        </div>`;
    movieCardLine.insertAdjacentHTML("afterbegin", temp_html);
  });
  for (let i = 0; i < results.length; i++) {
    const movieCard = document.getElementsByClassName("card");
    let movieId = results[i].id;
    let title = results[i].title;
    movieCard[i].addEventListener("click", function () {
      alert(`${title} - ID: ${movieId}`);
    });
  }
};

fetchMovie();

const searchMovie = () => {
  let userInput = searchInput.value;
};

searchBtn.addEventListener("click", searchMovie);
