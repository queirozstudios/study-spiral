const container = document.querySelector(".container");
const circle = document.querySelector(".circle");
const themeSelect = document.getElementById("themeSelect");
const mapContent = document.getElementById("mapContent");

// Função para carregar temas e subtemas
function loadThemes() {
  const data = JSON.parse(localStorage.getItem("data")) || {};
  themeSelect.innerHTML = '<option value="">Selecionar Tema</option>'; // Resetar opções
  Object.keys(data).forEach((theme) => {
    const option = document.createElement("option");
    option.value = theme;
    option.textContent = theme;
    themeSelect.appendChild(option);
  });
}

// Função para atualizar o mapa com base no tema selecionado
function updateMap(theme) {
  const data = JSON.parse(localStorage.getItem("data")) || {};
  const subthemes = data[theme] || [];

  while (mapContent.firstChild) {
    mapContent.removeChild(mapContent.firstChild);
  }

  const radius = 150;
  const circleRadius = 100;
  const centerX = container.offsetWidth / 2;
  const centerY = container.offsetHeight / 2;
  const angleStep = (2 * Math.PI) / subthemes.length;

  subthemes.forEach((subtheme, index) => {
    const angle = -index * angleStep;

    const lineX = centerX + circleRadius * Math.cos(angle);
    const lineY = centerY + circleRadius * Math.sin(angle);

    const subthemeX = centerX + (circleRadius + radius) * Math.cos(angle) - 60;
    const subthemeY = centerY + (circleRadius + radius) * Math.sin(angle) - 25;

    const subthemeElement = document.createElement("div");
    subthemeElement.classList.add("subtheme");
    subthemeElement.style.left = `${subthemeX}px`;
    subthemeElement.style.top = `${subthemeY}px`;
    subthemeElement.innerText = `${index + 1}. ${subtheme}`;

    // Adiciona uma animação de fade-in ao novo subtema
    subthemeElement.style.animation = "fadeIn .5s ease";

    mapContent.appendChild(subthemeElement);

    const lineElement = document.createElement("div");
    lineElement.classList.add("line");
    lineElement.style.width = `${radius}px`;
    lineElement.style.left = `${lineX}px`;
    lineElement.style.top = `${lineY}px`;

    const lineAngle = (angle * 180) / Math.PI;
    lineElement.style.transform = `rotate(${lineAngle}deg)`;

    const arrowElement = document.createElement("div");
    arrowElement.classList.add("arrow");
    lineElement.appendChild(arrowElement);

    mapContent.appendChild(lineElement);
  });

  circle.innerText = theme;
}

// Função para atualizar o mapa sempre que o localStorage mudar
function syncWithLocalStorage() {
  const currentTheme = themeSelect.value;
  const data = JSON.parse(localStorage.getItem("data")) || {};
  if (currentTheme && data[currentTheme]) {
    updateMap(currentTheme);
  } else {
    loadThemes();
    circle.innerText = "Selecionar Tema";
    while (mapContent.firstChild) {
      mapContent.removeChild(mapContent.firstChild);
    }
  }
}

// Atualizar o mapa sempre que o localStorage mudar
// setInterval(syncWithLocalStorage, 1000); // Verifica a cada 1 segundo

// Carregar temas na inicialização
loadThemes();

// Atualizar o mapa quando o tema é selecionado
themeSelect.addEventListener("change", function () {
  const selectedTheme = themeSelect.value;
  if (selectedTheme) {
    updateMap(selectedTheme);
  }
});

// Atualizar o mapa inicialmente se já houver um tema selecionado
const initialTheme = themeSelect.value;
if (initialTheme) {
  updateMap(initialTheme);
}
