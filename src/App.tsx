import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";

import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
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
