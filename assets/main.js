const endpoint =
    "https://servicodados.ibge.gov.br/api/v1/localidades/municipios/";
const cities = [];

fetch(endpoint)
    .then((response) => response.json()) // busca os dados
    .then((data) => cities.push(...data)); // insire os dados no array

function filterCity(wordToMatch, cities) {
    return cities.filter((place) => {
        // filtrar as palavras que dão match com o que for pesquisado
        const regex = new RegExp(wordToMatch, "gi");
        if (place.nome.match(regex)){
            return place
        }
    });
}


function showCities() { // Add no html as cidades
    const filterAray = filterCity(this.value, cities);
    console.log(filterAray)
    const htmlCreator = filterAray
        .map((place) => {
            const regex = new RegExp(this.value, "gi");
            const cityName = place.nome.replace(
                regex,
                `<span>${this.value}</span>`
            );

            return `
      <li class="city">
        <span class="name" >${place.nome} - ${place.microrregiao.mesorregiao.UF.sigla}</span>       
      </li>
    `;
        })
        .join("");
    suggestions.innerHTML = htmlCreator;
}


// Parte principal

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", showCities);
searchInput.addEventListener("keyup", showCities);