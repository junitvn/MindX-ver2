export const API_KEY = 'ed74e2be46msha0be35e5f345febp17ac10jsn4262a33cbe07';
export const API = 'https://world-population.p.rapidapi.com/';
export const world = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/worldpopulation',
  headers: {
    'x-rapidapi-host': 'world-population.p.rapidapi.com',
    'x-rapidapi-key': API_KEY,
  },
};

export const countriesOption = {
  method: 'GET',
  url: 'https://world-population.p.rapidapi.com/allcountriesname',
  headers: {
    'x-rapidapi-host': 'world-population.p.rapidapi.com',
    'x-rapidapi-key': API_KEY,
  },
};

export const populationByCountry = (country: string) => {
  return {
    method: 'GET',
    url: 'https://world-population.p.rapidapi.com/population',
    params: {country_name: country},
    headers: {
      'x-rapidapi-host': 'world-population.p.rapidapi.com',
      'x-rapidapi-key': API_KEY,
    },
  };
};
