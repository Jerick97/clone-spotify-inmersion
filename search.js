const resultArtist = document.getElementById("result-artist");
const playlistContainer = document.getElementById("result-playlists");
const errorMessageContainer = document.getElementById(
	"error-message-container"
);
const errorMessageTitle = document.getElementById("error-search-title");
const searchInput = document.getElementById("search-input");

function requestApi(searchTerm) {
	fetch("https://api.jsonbin.io/v3/b/65b04c26266cfc3fde7f0469", {
		method: "GET",
		headers: {
			"X-Access-Key":
				"$2a$10$.taFhNIZLe0Fme24ECrtc.VXY7bZFpEfa0tf7zvqpUZH/7i4UQm3u",
		},
	})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			return response.json();
		})
		.then((data) => {
			const filteredArtists = data.record.artists.filter(
				(artist) =>
					artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					artist.genre.toLowerCase().includes(searchTerm.toLowerCase())
			);
			if (filteredArtists.length === 0) {
				resultArtist.classList.add("hidden");
				errorMessageContainer.classList.remove("hidden");
				errorMessageTitle.innerText = `No se ha encontrado ningún resultado para "${searchTerm}"`;
			} else {
				displayResults(filteredArtists);
			}
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
}

function displayResults(results) {
	if (results.length > 0) {
		const artistImage = document.getElementById("artist-img");
		const artistName = document.getElementById("artist-name");
		const artistGenre = document.getElementById("artist-genre");

		results.forEach((element) => {
			artistImage.src = element.urlImg;
			artistName.innerText = element.name;
			artistGenre.innerText = element.genre;
		});
	}
}

function hidePlaylists() {
	playlistContainer.classList.add("hidden");
}

searchInput.addEventListener("input", function () {
	const searchTerm = searchInput.value.toLowerCase().trim();

	if (searchTerm === "") {
		resultArtist.classList.add("hidden");
		errorMessageContainer.classList.add("hidden");
		playlistContainer.classList.remove("hidden");
		return;
	}
	playlistContainer.classList.add("hidden");
	errorMessageContainer.classList.add("hidden");
	resultArtist.classList.remove("hidden");
	requestApi(searchTerm);
});
