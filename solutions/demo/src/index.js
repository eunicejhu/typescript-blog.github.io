import React from 'react';
import ReactDOM from 'react-dom';

import {Image} from './Image'
import {Subscribe} from "./Subscribe"
import {UserCard} from './UserCard'
import {ColorGenerator} from './ColorGenerator'
import {NumberGenerator} from './NumberGenerator'

ReactDOM.render(
  <React.StrictMode>
  <NumberGenerator num={32} />
  <h3 style={{textAlign: "center"}}>Front end technology</h3>
  <Image />
  <Subscribe />
  <ColorGenerator />
  <UserCard />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
