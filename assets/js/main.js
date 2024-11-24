const apiURL = "https://rickandmortyapi.com/api/character";
const characterList = document.getElementById("character-list");
const pagination = document.getElementById("pagination");

let currentPage = 1;

// Função para carregar os personagens
async function loadCharacters(page = 1) {
  const response = await fetch(`${apiURL}?page=${page}`);
  const data = await response.json();
  
  displayCharacters(data.results);
  setupPagination(data.info);
}

// Exibir personagens na tela
function displayCharacters(characters) {
  characterList.innerHTML = characters
    .map(
      (character) => `
      <div class="col-md-4">
        <div class="card">
          <img src="${character.image}" class="card-img-top" alt="${character.name}">
          <div class="card-body">
            <h5 class="card-title">${character.name}</h5>
            <p class="card-text">Status: ${character.status}</p>
            <p class="card-text">Espécie: ${character.species}</p>
            <a href="character.html?id=${character.id}" class="btn btn-primary">Detalhes</a>
          </div>
        </div>
      </div>`
    )
    .join("");
}

// Configurar paginação
function setupPagination(info) {
  pagination.innerHTML = "";
  for (let i = 1; i <= info.pages; i++) {
    pagination.innerHTML += `
      <li class="page-item ${i === currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>`;
  }
}

// Trocar página
function changePage(page) {
  currentPage = page;
  loadCharacters(page);
}

// Carregar personagens ao iniciar
loadCharacters();
