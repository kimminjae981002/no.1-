const movieCardLine = document.querySelector(".movieCardLine");
const searchInput = document.getElementById("searchMovieInput");
const searchBtn = document.querySelector(".searchMovieBtn");
const pageTitle = document.getElementsByTagName("h1");
const card = document.querySelector(".card");

document.onload = function () {
  searchInput.focus();
};

searchInput.focus();
const tmdbKey = "cc94064ab94a0145a45541730eb6f94b";
const fetchMovie = async () => {
  const url =
    "https://api.themoviedb.org/3/trending/all/week?api_key=" +
    tmdbKey +
    "&language=en-EN";
  //api data받아오기
  const response = await axios.get(url);
  let data = response.data;
  let results = data.results;
  //movie data 가져오기
  results.forEach((movie) => {
    let image = movie.backdrop_path;
    let title = movie.title ? movie.title : movie.name;
    let overview = movie.overview;
    let ratio = movie.vote_average;
    let id = movie.id;
    let temp_html = `
        <div class="card" id=${id}>
          <img
            src="http://image.tmdb.org/t/p/original/${image}"
            alt=""/>
          <span class="cardTitle">${title}</span>
          <span class="cardStory">${overview}</span>
          <span class="cardRatio">평점: ${ratio}</span>
        </div>`;
    movieCardLine.insertAdjacentHTML("afterbegin", temp_html);
  });
  // 클릭 시 id 받기 위해 배열을 뒤집어줌
  results.reverse();

  // 검색 시 맞는 영화 나오게 하기
  const searchMovie = () => {
    for (let i = 0; i < results.length; i++) {
      let movieCard = document.getElementsByClassName("card");
      let title = results[i].title ? results[i].title : results[i].name;
      title = title.toLowerCase();
      let userInput = searchInput.value.toLowerCase();
      let string = title.includes(userInput);
      if (string) {
        movieCard[i].style.display = "block";
      } else {
        movieCard[i].style.display = "none";
      }
    }
  };

  searchBtn.addEventListener("click", searchMovie);

  //   클릭시 id나오게 하기
  for (let i = 0; i < results.length; i++) {
    let movieCard = document.getElementsByClassName("card");
    let movieId = results[i].id;
    let title = results[i].title ? results[i].title : results[i].name;
    movieCard[i].addEventListener("click", () => {
      alert(`${title}- ID: ${movieId}`);
    });
  }
};

fetchMovie();
