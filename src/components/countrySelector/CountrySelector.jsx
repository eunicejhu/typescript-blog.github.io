import React from "react";

import "../../styles/CountrySelector.css";
import countriesData from "../../data/countries";

class CountrySelector extends React.PureComponent {
  state = {
    country: countriesData[0],
  };

  selectCountry = () => {
    const index = Math.floor(Math.random() * countriesData.length);
    this.setState({ country: countriesData[index] });
  };

  render() {
    const {
      name,
      capital,
      languages,
      population,
      flag,
      currency,
    } = this.state.country;
    return (
      <div className="countryselector_wrapper">
        <h2>Country Selector</h2>
        <div className="flag_wrapper">
          <img src={flag} alt={name} />
          <p>{name}</p>
        </div>

        <ul>
          <li>
            <label>Capital: </label>
            <span>{capital}</span>
          </li>
          <li>
            <label>Languages: </label>
            <span>{languages}</span>
          </li>
          <li>
            <label>Population: </label>
            <span>{population}</span>
          </li>
          <li>
            <label>Currency: </label>
            <span>{currency}</span>
          </li>
        </ul>
        <button onClick={this.selectCountry}>Select Country</button>
      </div>
    );
  }
}
export default CountrySelector;
