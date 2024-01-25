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
			if (searchTerm === searchInput.value.toLowerCase().trim()) {
				if (filteredArtists.length > 0) {
					errorMessageContainer.classList.add("hidden");
				} else {
					// Muestra el mensaje de error si no hay resultados
					resultArtist.classList.add("hidden");
					errorMessageContainer.classList.remove("hidden");
					errorMessageTitle.innerText = `No se ha encontrado ningún resultado para "${searchInput.value}"`;
				}

				displayResults(filteredArtists);
			}
		})
		.catch((error) => {
			console.error("Error fetching data:", error);
		});
}

function createArtistCard(artist) {
	// Crea un nuevo card
	const artistCard = document.createElement("div");
	artistCard.classList.add("artist-card");

	// Crea la sección de la imagen
	const cardImgArtist = document.createElement("div");
	cardImgArtist.classList.add("card-img-artist");

	const artistImage = document.createElement("img");
	artistImage.classList.add("artist-img");
	artistImage.alt = artist.name;
	artistImage.src = artist.urlImg;

	// Crea la sección del icono de reproducción
	const playDiv = document.createElement("div");
	playDiv.classList.add("play");

	const playIcon = document.createElement("span");
	playIcon.classList.add("fa", "fa-solid", "fa-play");

	// Agrega la imagen y el icono de reproducción al card
	cardImgArtist.appendChild(artistImage);
	playDiv.appendChild(playIcon);
	cardImgArtist.appendChild(playDiv);
	artistCard.appendChild(cardImgArtist);

	// Crea la sección del texto del card
	const cardText = document.createElement("div");
	cardText.classList.add("card-text");

	const artistName = document.createElement("h3");
	artistName.classList.add("artist-name");
	artistName.innerText = artist.name;

	const artistCategorie = document.createElement("p");
	artistCategorie.classList.add("artist-categorie");
	artistCategorie.innerText = "Artista";

	const artistGenre = document.createElement("p");
	artistGenre.classList.add("artist-genre");
	artistGenre.innerText = artist.genre;

	// Agrega el nombre del artista, la categoría y el género al card
	cardText.appendChild(artistName);
	cardText.appendChild(artistCategorie);
	cardText.appendChild(artistGenre);
	artistCard.appendChild(cardText);

	return artistCard;
}

function displayResults(results) {
	if (results.length > 0) {
		const gridContainer = document.querySelector(".grid-container");

		// Limpia el contenido actual
		gridContainer.innerHTML = "";

		results.forEach((element) => {
			// Llama a la función para crear el card y lo agrega al contenedor de la cuadrícula
			const card = createArtistCard(element);
			gridContainer.appendChild(card);
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
	errorMessageContainer.classList.add("hidden");
	playlistContainer.classList.add("hidden");
	resultArtist.classList.remove("hidden");
	requestApi(searchTerm);
});
