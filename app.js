const tmdbKey = "cc94064ab94a0145a45541730eb6f94b";

const fetchMovie = async () => {
  const url =
    "https://api.themoviedb.org/3/trending/all/week?api_key=" +
    tmdbKey +
    "&language=ko-KR";
  const response = await axios.get(url);
  console.log(response);
};

fetchMovie();
