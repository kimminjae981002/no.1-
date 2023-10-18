const movieCardLine = document.querySelector(".movieCardLine");
const searchInput = document.getElementById("searchMovieInput");

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
  for (let i = 0; i < results.length; i++) {
    let image = results[i].backdrop_path;
    let title = results[i].title;
    let overview = results[i].overview;
    let ratio = results[i].vote_average;
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
  }
};

fetchMovie();

console.log(searchInput);
