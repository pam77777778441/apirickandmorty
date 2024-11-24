const characterDetails = document.getElementById("character-details");
const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get("id");

// Função para buscar e exibir os detalhes
async function loadCharacterDetails() {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${characterId}`);
  const character = await response.json();

  document.getElementById("character-image").src = character.image;
  document.getElementById("character-name").textContent = character.name;
  document.getElementById("character-status").textContent = `Status: ${character.status}`;
  document.getElementById("character-species").textContent = `Espécie: ${character.species}`;
  document.getElementById("character-location").textContent = `Localização: ${character.location.name}`;
}

// Botão de voltar
function goBack() {
  window.history.back();
}

// Carregar detalhes ao iniciar
loadCharacterDetails();
