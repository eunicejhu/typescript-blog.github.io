import React from 'react'

import {str2Num} from './utils/str2Num'
const COUNTRIES = [["world", "7,693,165,599"], ["china", "1,377,422,166"], ["india", "1,295,210,000"], ["usa", "323,947,000"], ["indonesia", "258,705,000"], ["brazil", "206,135,893"], ["pakistan","194,125,062"], ["nigeria", "186,988,000"], ["bangladesh", "161,006,790"], ["russia","146,599,183"], ["japan","126,960,000"]];


const CountryBars = () => COUNTRIES.map(([country, population] )=> <li key={country}>
    <span>{country.toUpperCase()}</span><span className="bar" ><span style={{width: Math.round(str2Num(population)/str2Num(COUNTRIES[0][1])*100)+"%"}}></span></span>
    <span>{population}</span>
</li>)
export const WorldPopulation = () => <div className="worldpopulation_wrapper">
    <h2>World population</h2>
    <p>Ten most populated countries</p>
    <ul><CountryBars /></ul>
</div>