import React, { useEffect, useState } from "react";
import axios from "axios";

const { avgWeight, avgLifeSpan } = require("../utils/cats_utils");

function Cats() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.thecatapi.com/v1/breeds";
      try {
        const { data: cats } = await axios.get(url);
        setData(cats);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const averageLifeSpan = data.length ? avgLifeSpan(data) : "...";
  const avergageWeight = data.length ? avgWeight(data) : "...";
  const FormatedData = () => {
    return data.map(({ name, id }) => <li key={id}>{name}</li>);
  };
  return (
    <>
      <p>
        The avergage weigth is
        {avergageWeight}
        The avergage life span is
        {averageLifeSpan}
      </p>
      <ul>
        <FormatedData />
      </ul>
    </>
  );
}

export default Cats;
