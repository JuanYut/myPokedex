// * HTML Elements
const pokedex = document.getElementById('pokedex');

// * Fetch Pokemons API
const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 151; i++) {
    console.log('Fetching...');
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(res => res.json()));
  }

  Promise.all(promises).then(results => {
    const pokemon = results.map(data => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map(type => type.type.name).join(', ')
    }));
    displayPokemon(pokemon);
  });
};

// * Function to map the pokemons
const displayPokemon = pokemon => {
  console.log(pokemon);
  const pokemonHTMLString = pokemon
    .map(
      thePokemon =>
        `
      <li class="card">
        <img class="card-image" src="${thePokemon.image}"></img>
        <h2 class="card-title">${thePokemon.id}. ${thePokemon.name}</h2>
        <p class="card-description">Type: ${thePokemon.type}</p>
      </li>
    `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLString;
};

// * Call my main function
fetchPokemon();
