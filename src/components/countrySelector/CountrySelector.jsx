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
      country: { name, capital, languages, population, flag, currency },
    } = this.state;
    return (
      <div className="countryselector_wrapper">
        <h2>Country Selector</h2>
        <div className="flag_wrapper">
          <img src={flag} alt={name} />
          <p>{name}</p>
        </div>

        <ul>
          <li>
            <label htmlFor="captital">Capital: </label>
            <span id="captical">{capital}</span>
          </li>
          <li>
            <label htmlFor="languages">Languages: </label>
            <span id="languages">{languages}</span>
          </li>
          <li>
            <label htmlFor="population">Population: </label>
            <span id="population">{population}</span>
          </li>
          <li>
            <label htmlFor="captital">Currency: </label>
            <span id="currency">{currency}</span>
          </li>
        </ul>
        <button type="button" onClick={this.selectCountry}>
          Select Country
        </button>
      </div>
    );
  }
}
export default CountrySelector;
