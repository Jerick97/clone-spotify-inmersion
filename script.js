//BOM DIA | BOA TARDE | BOA NOITE

// Obtém a referência do elemento com o ID "greeting"
const greetingElement = document.getElementById("greeting");

// Obtém a hora atual do sistema
const currentHour = new Date().getHours();

// Define a saudação com base na hora atual
// if (currentHour >= 5 && currentHour < 12) {
//   greetingElement.textContent = "Bom dia";
// } else if (currentHour >= 12 && currentHour < 18) {
//   greetingElement.textContent = "Boa tarde";
// } else {
//   greetingElement.textContent = "Boa noite";
// }

// Forma mais simples
const greetingMessage =
	currentHour >= 5 && currentHour < 12
		? "Buenos días"
		: currentHour >= 12 && currentHour < 18
		? "Buenas tardes"
		: "Buenas noches";

greetingElement.textContent = greetingMessage;

// GRID INTELIGENTE - result-artist
const container = document.querySelector(".grid-container");

const observer = new ResizeObserver(() => {
	const containerWidth = container.offsetWidth;
	const numColumns = Math.floor(containerWidth / 200);

	container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;
});

observer.observe(container);

// Cambio del Background del Navbar al hacer Scroll
const playlistContain = document.querySelector(".playlist-container");
const navbar = document.querySelector(".header__navigation");

playlistContain.addEventListener("scroll", () => {
	if (playlistContain.scrollTop > 0) {
		navbar.classList.add("scrolled");
	} else {
		navbar.classList.remove("scrolled");
	}
});
