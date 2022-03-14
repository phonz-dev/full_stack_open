import { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/Country";


function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
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
        <button onClick={() => setCountry(country)}>
          show
        </button>
      </div>
    )
  }

  const filterCountries = () => {
    const [MIN, MAX] = [1, 10];
    const len = countriesToShow.length;

    if (!filter) {
      if (country) setCountry("");
      return "";
    };

    if (country) {
      return <Country country={country} />
    }

    if (len === MIN) {
      return <Country country={countriesToShow[0]} />;
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
