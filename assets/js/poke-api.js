const pokeApi = {}
const url = `https://pokeapi.co/api/v2/pokemon`
function convertPokeApiToPokemon(pokeDetail){
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id
  pokemon.name = pokeDetail.name
  
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types

  pokemon.types = types
  pokemon.type = type
  pokemon.stats = pokeDetail.stats.map((stat) => stat)

  pokemon.photo = pokeDetail.sprites.versions['generation-v']['black-white'].animated.front_default

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
  return fetch((pokemon.url))
          .then((response) => response.json())
          .then(convertPokeApiToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
  return fetch(`${url}?offset=${offset}&limit=${limit}`)
  .then((response) => response.json())
  .then((jsonBody) => jsonBody.results)
  .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
  .then((detailsRequest) => Promise.all(detailsRequest))
  .then((pokemonDetails) => pokemonDetails)
  .catch(error => console.log(error))
}

pokeApi.getPokemon = (id) => {
  return fetch(`${url}/${id}/`)
          .then((response) => response.json())
          .then(convertPokeApiToPokemon)
}
