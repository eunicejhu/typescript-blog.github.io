import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";

const { avgWeight, avgLifeSpan, totalBreeds } = require("../utils/cats_utils");

function Cats() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { url: matchedUrl } = useRouteMatch();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url = "https://api.thecatapi.com/v1/breeds";
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
  const totalCount = totalBreeds(data);

  const FormatedData = () => {
    return data.map((cat) => (
      <li key={cat.id}>
        <Link
          to={{
            pathname: `${matchedUrl}/${cat.id}`,
            state: { referer: "/cats", data: cat },
          }}
        >
          {cat.name}
        </Link>
      </li>
    ));
  };

  const Summary = () => (
    <div>
      <h2>Cats Paradise</h2>
      <h4>
        There are
        {totalCount}
        cat breeds
      </h4>
      <p>
        The avergage weigth is
        {avergageWeight}
        The avergage life span is
        {averageLifeSpan}
      </p>
    </div>
  );

  return (
    <>
      <div>{isLoading ? "Loading..." : <Summary />}</div>
      <ul>
        <FormatedData />
      </ul>
    </>
  );
}

export default Cats;
