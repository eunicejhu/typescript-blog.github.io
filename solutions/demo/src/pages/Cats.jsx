import React, { useEffect, useState } from "react";
import axios from "axios";

const { avgWeight, avgLifeSpan } = require("../utils/cats_utils");

function Cats() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const url = "https://api.thecatapi.com/v1/breeds";
      setIsLoading(true);
      try {
        const { data: cats } = await axios.get(url);
        setData(cats);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const averageLifeSpan = avgLifeSpan(data);
  const avergageWeight = avgWeight(data);
  const FormatedData = () => {
    return data.map(({ name, id }) => <li key={id}>{name}</li>);
  };
  return (
    <>
      <p>
        {isLoading
          ? "Loading..."
          : `The avergage weigth is
        ${avergageWeight}
        The avergage life span is
        ${averageLifeSpan}`}
      </p>
      <ul>
        <FormatedData />
      </ul>
    </>
  );
}

export default Cats;
