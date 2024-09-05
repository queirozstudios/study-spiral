const themeSelect = document.getElementById("themeSelect");
const themeInput = document.getElementById("theme");
const subthemesInput = document.getElementById("subthemes");
const deleteButton = document.getElementById("deleteButton");

function updateThemeList() {
  themeSelect.innerHTML =
    '<option value="" disabled selected>Selecione um Tema</option>';
  const data = JSON.parse(localStorage.getItem("data")) || {};
  Object.keys(data).forEach((theme) => {
    const option = document.createElement("option");
    option.value = theme;
    option.innerText = theme;
    themeSelect.appendChild(option);
  });
}

document.getElementById("themeForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const theme = themeInput.value.trim();
  const subthemes = subthemesInput.value.split(",").map((s) => s.trim());

  let data = JSON.parse(localStorage.getItem("data")) || {};

  // Se o tema já existe, atualiza os subtemas; se não, adiciona o tema
  data[theme] = subthemes;

  localStorage.setItem("data", JSON.stringify(data));

  // Limpar o formulário e atualizar a lista de temas
  themeInput.value = "";
  subthemesInput.value = "";
  updateThemeList();
});

themeSelect.addEventListener("change", function () {
  const selectedTheme = themeSelect.value;
  const data = JSON.parse(localStorage.getItem("data")) || {};
  if (data[selectedTheme]) {
    themeInput.value = selectedTheme;
    subthemesInput.value = data[selectedTheme].join(", ");
  }
});

deleteButton.addEventListener("click", function () {
  const selectedTheme = themeSelect.value;
  if (selectedTheme) {
    let data = JSON.parse(localStorage.getItem("data")) || {};
    delete data[selectedTheme];
    localStorage.setItem("data", JSON.stringify(data));

    // Limpar o formulário e atualizar a lista de temas
    themeInput.value = "";
    subthemesInput.value = "";
    updateThemeList();
  } else {
    alert("Selecione um tema para excluir.");
  }
});

// Inicializar a lista de temas ao carregar a página
updateThemeList();
