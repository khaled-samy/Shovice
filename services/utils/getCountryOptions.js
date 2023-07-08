const countries = require("countries-list");

function getCountryOptions() {
  const countryOptions = [];
  for (const code in countries.countries) {
    const country = countries.countries[code];
    countryOptions.push({
      code,
      name: country.name,
    });
  }
  return countryOptions;
}

module.exports = getCountryOptions();
