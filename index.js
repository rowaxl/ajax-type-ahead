const search = document.querySelector('input');
const suggestions = document.querySelector('.suggestions');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];

fetch(endpoint)
  .then(res => res.json())
  .then(data => cities.push(...data));

function findMatches(target, cities) {
  return cities.filter(place => {
    const regex = new RegExp(target, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function displayMatches() {
  const input = this.value;

  if (!input.length) {
    suggestions.innerHTML = `
      <li>Filter for a city</li>
      <li>or a state</li>
    `;
    return;
  }

  const list = findMatches(input, cities);
  const listElems = list.map(place => {
    const regex = new RegExp(input, 'gi');
    const cityName = place.city.replace(regex,
      `<span class="hl">${input}</span>`
    );

    const stateName = place.state.replace(regex,
      `<span class="hl">${input}</span>`
    );

    const formatedPopulation = new Intl.NumberFormat().format(place.population);

    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${formatedPopulation}</span>
      </li>
      `;
  }).join('');

  suggestions.innerHTML = listElems;
}


search.addEventListener('change', displayMatches);
search.addEventListener('keyup', displayMatches);
