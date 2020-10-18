import React from 'react';
import ReactDOM from 'react-dom';

import {Image} from './Image'
import {Subscribe} from "./Subscribe"

ReactDOM.render(
  <React.StrictMode>
  <h3 style={{textAlign: "center"}}>Front end technology</h3>
  <Image />
  <Subscribe />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
