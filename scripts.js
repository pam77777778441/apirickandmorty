window.onload = function () {
    contadorRodape();
  };
  
  const listaPersonagens = document.getElementById("lista-personagens");
  const paginacao = document.getElementById("paginacao");
  const inputBusca = document.getElementById("input-busca");
  const botaoBusca = document.getElementById("botao-busca");
  const urlPersonagem = "https://rickandmortyapi.com/api/character";
  const urlepisodio = "https://rickandmortyapi.com/api/episode";
  const urlLocalizacao = "https://rickandmortyapi.com/api/location";
  
  let paginaAtual = 1;
  let valorTraduzido = "";
  
  function buscarPersonagens(pagina, nome = "") {
    const url = `${urlPersonagem}?page=${pagina}&name=${nome}`;
  
    axios
      .get(url)
      .then(function (response) {
        const personagens = response.data.results;
        const informacoes = response.data.info;
  
        listaPersonagens.innerHTML = "";
  
        personagens.forEach(async function (personagem) {
          const itemLista = document.createElement("li");
          itemLista.classList.add("personagem-item");
  
          const imagem = document.createElement("img");
          imagem.classList.add("personagem-foto");
          imagem.src = personagem.image;
  
          const nome = document.createElement("h2");
          nome.classList.add("personagem-nome");
          nome.textContent = personagem.name;
  
          const status = document.createElement("p");
          status.classList.add("personagem-status");
  
          if (personagem.status === "Alive") {
            valorTraduzido = "🟢 Vivo";
          } else {
            valorTraduzido = "🔴 Morto";
          }
          status.textContent = valorTraduzido + " - " + personagem.species;
  
          const descricaolocalizacao = document.createElement("span");
          descricaolocalizacao.classList.add("descricaoLocalizacao");
  
          descricaolocalizacao.textContent = "Última localização conhecida";
  
          const ultimaLocalizacao = document.createElement("p");
          ultimaLocalizacao.classList.add("personagem-ultimaLocalizacao");
  
          ultimaLocalizacao.textContent = personagem.location.name;
  
          const descricaoEpfinal = document.createElement("span");
          descricaoEpfinal.classList.add("descricaoEpfinal");
  
          descricaoEpfinal.textContent = "Visto última vez em:";
  
          const ultimoEpisodio = document.createElement("p");
          ultimoEpisodio.classList.add("personagem-ultimoEpisodio");
  
          const nomeDoEp = await axios.get(personagem.episode[0]);
          ultimoEpisodio.textContent = nomeDoEp.data.name;
  
          const divpaiinfo = document.createElement("div");
          divpaiinfo.classList.add("personagem-info");
  
          divpaiinfo.appendChild(nome);
          divpaiinfo.appendChild(status);
          divpaiinfo.appendChild(descricaolocalizacao);
          divpaiinfo.appendChild(ultimaLocalizacao);
          divpaiinfo.appendChild(descricaoEpfinal);
          divpaiinfo.appendChild(ultimoEpisodio);
  
          itemLista.appendChild(imagem);
          itemLista.appendChild(divpaiinfo);
  
          listaPersonagens.appendChild(itemLista);
        });
  
        paginacao.innerHTML = "";
  
        if (informacoes.prev) {
          const botaoAnterior = document.createElement("button");
          botaoAnterior.classList.add("botaoProximo");
  
          botaoAnterior.textContent = "Anterior";
  
          botaoAnterior.addEventListener("click", function () {
            buscarPersonagens(informacoes.prev.split("=")[1], nome);
          });
          paginacao.appendChild(botaoAnterior);
        }
  
        if (informacoes.next) {
          const botaoProximo = document.createElement("button");
          botaoProximo.classList.add("botaoProximo");
  
          botaoProximo.textContent = "Próximo";
          botaoProximo.addEventListener("click", function () {
            buscarPersonagens(informacoes.next.split("=")[1], nome);
          });
          paginacao.appendChild(botaoProximo);
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });
  }
  
  function contadorRodape() {
    axios.get(urlPersonagem).then((res) => {
      const quantidadePersonagens = res.data.info.count;
      const quantidadePersonagensFooter = document.getElementById(
        "quantidadePersonagens"
      );
  
      quantidadePersonagensFooter.textContent =
        "PERSONAGENS: " + quantidadePersonagens;
    });
  
    axios.get(urlLocalizacao).then((res) => {
      const localizacao = res.data.info.count;
      const localizacaoPersonagensFooter = document.getElementById("localizacao");
  
      localizacaoPersonagensFooter.textContent = "LOCALIZAÇÕES: " + localizacao;
    });
  
    axios.get(urlepisodio).then((res) => {
      const episodio = res.data.info.count;
      const quantidadePersonagensFooter = document.getElementById("episodio");
  
      quantidadePersonagensFooter.textContent = "EPISÓDIOS: " + episodio;
    });
  }
  
  botaoBusca.addEventListener("click", function () {
    const termoBusca = inputBusca.value;
    buscarPersonagens(paginaAtual, termoBusca);
  });
  
  inputBusca.addEventListener("input", function () {
    const termoBusca = inputBusca.value;
    buscarPersonagens(paginaAtual, termoBusca);
  });
  
  buscarPersonagens(paginaAtual);