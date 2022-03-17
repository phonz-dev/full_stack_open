import { useState, useEffect } from "react";
import Display from "./components/Display";
import countriesService from "./services/countries";


function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries);
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const countriesToShow = !filter
    ? []
    : countries.filter(country =>
      country
        .name
        .common
        .toLowerCase()
        .includes(filter.toLowerCase())
    )

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={handleFilter} />
      </div>
      <div>
        {<Display countries={countriesToShow} />}
      </div>
    </div>
  );
}

export default App;
