import Country from "./Country";
import Countries from "./Countries";

const Display = ({ countries }) => {
  const len = countries.length;

  if (len === 1) {
    return <Country country={countries[0]} />
  }

  if (len <= 10) {
    return <Countries countries={countries} />
  }

  return 'Too many matches, specify another filter'
}

export default Display;