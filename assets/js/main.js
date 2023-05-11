const pokemonListHtml = document.querySelector('#pokemonList')
const pokemonHtml = document.querySelector('#pokemon')
const btn = document.querySelector('#loadMoreButton')
const limit = 6
let offset = 0


function loadPokemonItems(offset, limit) {

  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {

    const newItem = pokemons.map((pokemon) => {
      return `
        <li>
          <a href="./pokemon.html?pokemon=${pokemon.number}" class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number.toString().padStart(3, '0')}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
              <ol class="types">
                ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
              </ol>
              <img src="${pokemon.photo}"
                alt="${pokemon.name}">
            </div>
          </a>
        </li>
      `
    }).join('')

    if(pokemonListHtml){
      pokemonListHtml.innerHTML += newItem
    }
  })
}

loadPokemonItems(offset, limit)

if(btn){
  btn.addEventListener('click', () => {
    offset += limit
    loadPokemonItems(offset, limit)
  })
}

if(window.location.search){
  const pokemonNumber = window.location.search.split('?')[1].split('=')[1]
  pokeApi.getPokemon(pokemonNumber)
          .then((pokemon) => {

            const pokemonContent = `
              <div class="card">
                <div class="card-body">
                  <div class="image">
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                  </div>
                  <div class="name" data-name="${pokemon.name}">
                    <span>${pokemon.name}</span>
                  </div>
                  <div class="type">
                    <span>
                      ${pokemon.types.map((type) => `<span class="type ${type}">${type}</span>`).join('')}
                    </span>
                  </div>
                  <div class="status">
                    ${pokemon.stats.map((stat) => `
                      <div class="status-content">
                        <span>
                          ${stat.stat.name}
                        </span>
                        <span>
                          ${stat.base_stat}
                        </span>
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `
            if(pokemonHtml){
              pokemonHtml.innerHTML = pokemonContent
            }
          })
} else {
  const pokemonContent = `
    <div class="card">
      <div class="card-body">
        <div class="image">
          <img src="./assets/img/img.png" alt="Imagem">
        </div>
        <div class="name" data-name="Treinador">
          <span>Treinador</span>
        </div>
        <div class="type">
          <span>
            <span class="type">Treinador</span>
          </span>
        </div>
      </div>
    </div>
  `
  if(pokemonHtml){
    pokemonHtml.innerHTML = pokemonContent
  }
}