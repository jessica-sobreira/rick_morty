const main = document.querySelector("main");
const footer = document.querySelector("footer");

  
//character
axios.get('https://rickandmortyapi.com/api/character')
    .then(response => {
        if (response.status === 200) {
            const characters = response.data.results;
            console.log('Lista de personagens:');

            characters.forEach(character => {
                console.log('Nome:', character.name);
                console.log('Status:', character.status);
                console.log('Espécie:', character.species);
                console.log('----------');
            });
        } else {
            console.log('Algo deu errado:', response.status);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });


//location

axios.get('https://rickandmortyapi.com/api/location')
    .then(response => {
        if (response.status === 200) {
            const locations = response.data.results;
            console.log('Lista de localizações:');

            locations.forEach(location => {
                console.log('Nome:', location.name);
                console.log('Tipo:', location.type);
                console.log('Dimensão:', location.dimension);
                console.log('----------');
            });
        } else {
            console.log('Algo deu errado:', response.status);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });

//episodes
axios.get('https://rickandmortyapi.com/api/episode')
    .then(response => {
        if (response.status === 200) {
            const episodes = response.data.results;
            console.log('Lista de episódios:');

            episodes.forEach(episode => {
                console.log('Nome:', episode.name);
                console.log('Número:', episode.episode);
                console.log('Data de Lançamento:', episode.air_date);
                console.log('----------');
            });
        } else {
            console.log('Algo deu errado:', response.status);
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
    });


//paginação
const botaoProximo = document.querySelector("#proximo");
const botaoAnterior = document.querySelector("#anterior");
let paginaAtual = 1;
paginas();

function paginas() {
    axios.get(`https://rickandmortyapi.com/api/character?page=${paginaAtual}`)
        .then((response) => {
            main.innerHTML = "";
            const characters = response.data.results;
            characters.forEach((character) => {
                main.innerHTML += `
                <div class="personagem-card">
                <div class="personagem-imagem">
                  <img src="${character.image}" alt="${character.name}">
                </div>
                <div class="personagem-info">
                  <h2>${character.name}</h2>
                  <br>
                  <p><strong>${character.status} - ${character.species}</strong></p>
                  <br>
                  <p><strong>Gênero:</strong> ${character.gender}</p>
                  <br>
                  <p><strong>Last known location:</strong><br> ${character.origin.name}</p>
                  <br>
                  <p><strong>First seen in:</strong><br> ${character.location.name}</p>
                </div>
              </div>
        `;
            });

            verificarPagina(response.data.info.pages);
        });
}

function verificarPagina(numeroDePaginas) {
    if (paginaAtual === 1) botaoAnterior.disabled = true;
    else botaoAnterior.disabled = false;
    if (paginaAtual === numeroDePaginas) botaoProximo.disabled = true;
    else botaoProximo.disabled = false;
}

function avancarPagina() {
    paginaAtual++;
    paginas();
    window.scrollTo(0, 0);
}

function voltarPagina() {
    paginaAtual--;
    paginas();
    window.scrollTo(0, 0);
}

botaoProximo.addEventListener("click", avancarPagina);
botaoAnterior.addEventListener("click", voltarPagina);
