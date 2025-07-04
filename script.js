function searchMovie() {
    const movieName = document.getElementById("movieInput").value.trim();
    const movieDetails = document.getElementById("movieDetails");
    const errorMessage = document.getElementById("errorMessage");


    movieDetails.innerHTML = "";
    errorMessage.textContent = "";

    if (movieName === "") {
        errorMessage.textContent = "Please enter a movie name!";
        return;
    }


    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.Response === "True") {
                movieDetails.innerHTML = `
            <h2>${data.Title} (${data.Year})</h2>
            <img src="${data.Poster !== "N/A" ? data.Poster : "https://via.placeholder.com/200"}" alt="Movie Poster" />
            <p><strong>Plot:</strong> ${data.Plot}</p>
          `;
            } else {
                errorMessage.textContent = "Movie not found. Please try again.";
            }
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
            errorMessage.textContent = "Something went wrong. Please try again later.";
        });
}
