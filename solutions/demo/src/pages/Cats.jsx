import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useRouteMatch } from "react-router-dom";
import Cat from "./Cat";
import useQuery from "../hooks/useQuery";

const { avgWeight, avgLifeSpan, totalBreeds } = require("../utils/cats_utils");

function Cats() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [catId, setCatId] = useState(null);
  const { url: matchedUrl } = useRouteMatch();
  const id = useQuery().get("id");

  useEffect(() => {
    setCatId(id);
  }, [id]);

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
            pathname: `${matchedUrl}`,
            search: `?id=${cat.id}`,
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
      {catId ? (
        <Cat />
      ) : (
        <>
          <div>{isLoading ? "Loading..." : <Summary />}</div>
          <ul>
            <FormatedData />
          </ul>
        </>
      )}
    </>
  );
}

export default Cats;
