const movieCardLine = document.querySelector(".movieCardLine");
const searchInput = document.getElementById("searchMovieInput");
const searchBtn = document.querySelector(".searchMovieBtn");
const pageTitle = document.getElementsByTagName("h1");
const card = document.querySelector(".card");

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

  // 카드 만드는 함수(movie를 받아온다.)
  const createCard = (movie) => {
    let image = movie.backdrop_path;
    let title = movie.title ? movie.title : movie.name;
    let overview = movie.overview;
    let ratio = movie.vote_average;
    let id = movie.id;

    const movieCard = document.createElement("div");
    movieCard.id = id;
    movieCard.classList.add("movieCard");
    movieCardLine.appendChild(movieCard);

    const cardImage = document.createElement("img");
    cardImage.classList.add("movieImage");
    cardImage.style.width = "100%";
    cardImage.style.height = "30%";
    cardImage.src = `http://image.tmdb.org/t/p/original/${image}`;
    movieCard.append(cardImage);

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("movieTitle");
    cardTitle.innerText = title;
    movieCard.append(cardTitle);

    const cardInfo = document.createElement("div");
    cardInfo.classList.add("movieInfo");
    cardInfo.innerText = overview;
    movieCard.append(cardInfo);

    const cardRatio = document.createElement("div");
    cardRatio.classList.add("movieRatio");
    cardRatio.innerText = `평점: ${ratio}`;
    movieCard.append(cardRatio);
  };

  // 카드 받고 movie를 createCard함수에 보내준다.
  results.forEach((movie) => {
    createCard(movie);
  });

  // 클릭시 CARD ID나오게 만들었다.
  let movieCards = document.querySelectorAll(".movieCard");
  movieCards.forEach((card) => {
    card.addEventListener("click", () => {
      let id = card.id;
      alert(`ID: ${id}`);
    });
  });

  // 검색 시 단어 속한 영화 나오게 하기
  const searchMovie = () => {
    for (let i = 0; i < results.length; i++) {
      let movieCard = document.getElementsByClassName("movieCard");
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
};

//   클릭시 id나오게 하기
// for (let i = 0; i < results.length; i++) {
//   let movieCard = document.getElementsByClassName("card");
//   let movieId = results[i].id;
//   let title = results[i].title ? results[i].title : results[i].name;
//   movieCard[i].addEventListener("click", () => {
//     alert(`${title}- ID: ${movieId}`);
//   });
// }

fetchMovie();
