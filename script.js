console.log("chalo fir se suru kare");

function getPoster(poster) {
  if (poster === "N/A") {
    return "https://via.placeholder.com/300x450?text=No+Image";
  }
  return poster;
}

async function getdata() {
  let name = document.querySelector(".input").value.trim();

  if (!name) {
    alert("yaar pahle movie name to dal");
    return;
  }

  let url = `https://www.omdbapi.com/?s=${encodeURIComponent(name)}&apikey=3566431e`;

  try {
    let res = await fetch(url);
    let data = await res.json();
    let container = document.querySelector(".container");

    if (data.Response === "False") {
      container.innerHTML = `<p>Movie nahi mili dost</p>`;
      return;
    }

    container.innerHTML = "";
    data.Search.forEach(movie => {
      container.innerHTML += `
        <div class="card">
          <img src="${getPoster(movie.Poster)}">
          <div class="content">
            <h2>${movie.Title}</h2>
            <p class="year">${movie.Year}</p>
          </div>
        </div>
      `;
    });
  } catch {
    alert("Kuch galat ho gaya");
  }
}

async function loadDefaultMovies() {
  let container = document.querySelector(".container");
  let url = `https://www.omdbapi.com/?s=avengers&apikey=3566431e`;

  try {
    let res = await fetch(url);
    let data = await res.json();

    if (data.Response === "False") return;

    container.innerHTML = "";
    data.Search.slice(0, 10).forEach(movie => {
      container.innerHTML += `
        <div class="card">
          <img src="${getPoster(movie.Poster)}">
          <div class="content">
            <h2>${movie.Title}</h2>
            <p class="year">${movie.Year}</p>
          </div>
        </div>
      `;
    });
  } catch {}
}

document.querySelector(".btn").addEventListener("click", getdata);
window.addEventListener("load", loadDefaultMovies);
document.querySelector(".input").addEventListener("keydown",(e)=>{
  if (e.key === "Enter") getdata()
});
