const Countries = ({ countries, onClick }) => {
  return (
    <div>
      {countries.map(country => {
        const countryName = country.name.common;
        return (
          <div key={countryName}>
            {countryName}
            <button onClick={onClick}>
              show
            </button>
          </div>
        )
      })}
    </div>
  )
}

export default Countries;