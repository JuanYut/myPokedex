// * HTML Elements
const pokedex = document.getElementById('pokedex');

// * For save the last pokemon data
const pokeCache = [];

// * Fetch Pokemons API
const fetchPokemon = async () => {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
  const res = await fetch(url);
  const data = await res.json();
  const pokemonArray = data.results.map((result, index) => ({
    // name: result.name,
    // apiURL: result.url,
    ...result,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index +
      1}.png`
  }));
  displayPokemon(pokemonArray);
};

// * Display List
const displayPokemon = pokemon => {
  const pokemonHTMLString = pokemon
    .map(
      thePokemon =>
        `
      <li class="card card-list" onClick="selectPokemon(${thePokemon.id})">
        <img class="card-image" src="${thePokemon.image}"></img>
        <h2 class="card-title">${thePokemon.id}. ${thePokemon.name}</h2>
      </li>
    `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

// * Display Modal
const displayModal = pokemon => {
  const type = pokemon.types.map(type => type.type.name).join(', ');
  const image = pokemon.sprites['front_default'];

  const htmlString = `
  <div class="modal" id='modal'>
    <button
      id="closeModal"
      onClick="closeModal()"
    >
      ❌
    </button>
      <div class="card modal-card">
        <img class="card-image modal-card-image" src="${image}"></img>
        <h2 class="card-title modal-card-title">${pokemon.id}. ${pokemon.name}</h2>
        <p class="card-description modal-card-description">
          <small>Height: </small>
          ${pokemon.height} | 
          <small>Weight: </small>
          ${pokemon.weight} |
          <small>Type: </small>
          ${type}
        </p>
      </div>
  </div>
  `;
  pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

// * Select Pokemon to display in the Modal
const selectPokemon = async id => {
  if (!pokeCache[id]) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const thePokemon = await res.json();
    pokeCache[id] = thePokemon;
    displayModal(thePokemon);
  } else {
    displayModal(pokeCache[id]);
  }
};

// * Close Modal
const closeModal = () => {
  const modal = document.getElementById('modal');
  modal.parentElement.removeChild(modal);
};

// * Call my main function
fetchPokemon();
