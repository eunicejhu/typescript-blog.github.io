import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Cat from "./Cat";
import useQuery from "../hooks/useQuery";
import useApi, { API_STATUS } from "../hooks/useApi";

const { avgWeight, avgLifeSpan, totalBreeds } = require("../utils/cats_utils");

function Cats() {
  const { url: matchedUrl } = useRouteMatch();

  const { data, error, state } = useApi("https://api.thecatapi.com/v1/breeds");
  const catId = useQuery().get("id");

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

  switch (state) {
    case API_STATUS.ERROR:
      return <>{error}</>;
    case API_STATUS.SUCCESS:
      return catId ? (
        <Cat />
      ) : (
        <>
          <div>
            <Summary />
          </div>
          <ul>
            <FormatedData />
          </ul>
        </>
      );
    default:
      return <>Loading</>;
  }
}

export default Cats;
