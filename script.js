// Grid del Contenedor Principal
const grid = document.querySelector(".grid");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
const footer = document.querySelector("footer");

const resizeSidebar = (entries) => {
  entries.forEach((entry) => {
    const viewportHeight = window.innerHeight;
    const sidebarHeight = viewportHeight * 0.9;
    const footerMargin = 0;
    if (entry.isIntersecting) {
      sidebar.style.height = `${sidebarHeight}px`;
      main.style.height = `${sidebarHeight}px`;

      const usedHeight = sidebarHeight + footerMargin;
      const remainingHeight = viewportHeight - usedHeight;
      footer.style.height = `${remainingHeight}px`;
    }
  });
};

const observer = new IntersectionObserver(resizeSidebar, {
  threshold: 0.5,
});
observer.observe(grid);

//BOM DIA | BOA TARDE | BOA NOITE
// Obtén la referencia del elemento con el ID "greeting"
const greetingElement = document.getElementById("greeting");

// Obtén la hora actual del sistema
const currentHour = new Date().getHours();

// Encuentra el mensaje de saludo correspondiente según la hora actual

let greetingMessage = "";

if (currentHour >= 5 && currentHour < 12) {
  greetingMessage = "Buenos días ☀️";
} else if (currentHour >= 12 && currentHour < 18) {
  greetingMessage = "Buenas tardes 🌤️";
} else {
  greetingMessage = "Buenas noches 🌙";
}

// Actualiza el texto del saludo
greetingElement.textContent = greetingMessage;

// GRID INTELIGENTE - playlist
const container = document.querySelector(".offer__list");

const observer2 = new ResizeObserver(() => {
  const containerWidth = container.offsetWidth;
  const numColumns = Math.floor(containerWidth / 200); // Ancho deseado por cada tarjeta
  const gapSize = 18;

  // Calcula el nuevo ancho de las tarjetas para ajustarse al número de columnas
  let cardWidth;
  if (numColumns <= 1) {
    cardWidth = containerWidth - gapSize; // Asigna el ancho al card si hay una sola columna
  } else {
    cardWidth =
      (containerWidth - gapSize - (numColumns - 1) * gapSize) / numColumns;
    container.style.height = "";
  }

  // Aplica el nuevo ancho y el espaciado entre columnas a las tarjetas
  const cards = document.querySelectorAll(".cards");
  cards.forEach((card) => {
    card.style.width = `${cardWidth}px`;
    card.style.height = `${cardWidth}px`; // Mantenemos el mismo alto que el ancho para mantener la proporción
  });

  // Establece el tamaño de las columnas del grid
  container.style.gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;
  container.style.gridRowGap = `${gapSize}px`;
  container.style.gridColumnGap = `${gapSize}px`;
});

observer2.observe(container);

function resizeMainContainer() {
  const viewportHeight = window.innerHeight;
  const mainContainer = document.querySelector(".main-container");

  // Calcular el tamaño del main container restando el tamaño del header al tamaño total de la ventana
  const mainContainerHeight = viewportHeight * 0.9;

  // Asignar el tamaño calculado al main container
  mainContainer.style.height = `${mainContainerHeight}px`;
}

// Mostrar Mensaje de Dispositivo no Compatible

function handleVisibility() {
  const screenWidth = window.innerWidth;
  const screen = document.querySelector(".screen");
  const grid = document.querySelector(".grid");

  if (screenWidth <= 320) {
    screen.classList.remove("hidden");
    grid.classList.add("hidden");
    document.title = "Navegador no compatible";
  } else {
    screen.classList.add("hidden");
    grid.classList.remove("hidden");
    document.title = "Spotify – Buscar";
  }
}

function onWindowResize() {
  resizeMainContainer();
  handleVisibility();
}

// Llamar a la función una vez que la página esté completamente cargada
window.addEventListener("load", onWindowResize());

// Volver a calcular el tamaño del main container cuando la ventana cambie de tamaño
window.addEventListener("resize", onWindowResize());

// GRID INTELIGENTE - result-artist
const containerArtist = document.querySelector(".grid-container");

const observer3 = new ResizeObserver(() => {
  const containerWidth = containerArtist.offsetWidth;
  const numColumns = Math.floor(containerWidth / 200);

  containerArtist.style.gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;
});

observer3.observe(containerArtist);

// Cambio del Background del Navbar al hacer Scroll
const playlistContain = document.querySelector(".main-box");
const navbar = document.querySelector(".header__navigation");

playlistContain.addEventListener("scroll", () => {
  if (playlistContain.scrollTop > 0) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
