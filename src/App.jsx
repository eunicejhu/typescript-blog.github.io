import React from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";

import "./App.css";

const App = () => {
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main>
        <Routes />
      </main>
      <footer>copyright@2020 author ZUOQIN HU</footer>
    </>
  );
};
export default App;
