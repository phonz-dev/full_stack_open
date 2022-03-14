import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log(response.data[100]);
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = !filter
    ? countries
    : countries.filter(country =>
      country
        .name
        .common
        .toLowerCase()
        .includes(filter.toLowerCase())
    )

  const displayCountries = () => {
    return countriesToShow.map(country =>
      <div key={country.name.common}>
        {country.name.common}
      </div>
    )
  }

  const displayCountry = () => {
    const country = countriesToShow[0];
    const languages = Object.values(country.languages);

    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>
          capital {country.capital}
        </div>
        <div>
          area {country.area}
        </div>

        <h3>languages:</h3>
        <ul>
          {languages.map(language =>
            <li key={language}>
              {language}
            </li>
          )}
        </ul>
        <div>
          {country.flag}
        </div>
      </div>
    )
  }

  const filterCountries = () => {
    const [MIN, MAX] = [1, 10];
    const len = countriesToShow.length;

    if (!filter) return "";

    if (len === MIN) {
      return displayCountry();
    }

    if (len <= MAX) {
      return displayCountries();
    }

    return "Too many matches, specify another filter";
  }

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter} />
      </div>
      <div>
        {filterCountries()}
      </div>
    </div>
  );
}

export default App;
