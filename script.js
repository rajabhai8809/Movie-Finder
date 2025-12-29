console.log("chalo fir se suru kare");

async function getdata() {
  let name = document.querySelector(".input").value.trim();

  if (!name) {
    alert("yaar pahle movie name to dal");
    return;
  }

  let url = `http://www.omdbapi.com/?s=${encodeURIComponent(name)}&apikey=3566431e`;

  try {
    let res = await fetch(url);
    let data = await res.json();
    let container = document.querySelector(".container");

    if (data.Response === "False") {
      container.innerHTML = `<p>Movie nahi mili dost</p>`;
      return;
    }

    let movies = data.Search;
    container.innerHTML = "";

    movies.forEach(movie => {
      let card = `
        <div class="card">
          <img src="${movie.Poster}" alt="">
          <div class="content">
            <h2>${movie.Title}</h2>
            <p class="year">Year: ${movie.Year}</p>
            <p class="rating">⭐ N/A</p>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  } catch (err) {
    alert("Kuch galat ho gaya dost, thodi der baad try karo.");
  }
}

async function loadDefaultMovies() {
  let container = document.querySelector(".container");
  let url = `http://www.omdbapi.com/?s=avengers&apikey=3566431e`;

  try {
    let res = await fetch(url);
    let data = await res.json();

    if (data.Response === "False") {
      container.innerHTML = `<p>Movies load nahi ho paayi</p>`;
      return;
    }

    let movies = data.Search.slice(0, 10);
    container.innerHTML = "";

    movies.forEach(movie => {
      let card = `
        <div class="card">
          <img src="${movie.Poster}" alt="">
          <div class="content">
            <h2>${movie.Title}</h2>
            <p class="year">Year: ${movie.Year}</p>
            <p class="rating">⭐ N/A</p>
          </div>
        </div>
      `;
      container.innerHTML += card;
    });
  } catch (err) {}
}

document.querySelector(".btn").addEventListener("click", getdata);
window.addEventListener("load", loadDefaultMovies);
document.querySelector(".input").addEventListener("keydown",(e)=>{
  if (e.key === "Enter") getdata()
});