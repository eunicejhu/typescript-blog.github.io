import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Cat from "./Cat";
import useQuery from "../hooks/useQuery";
import useApi, { API_STATUS } from "../hooks/useApi";
import getCatsSummary from "../helpers/getCatsSummary";

function Cats() {
  const { url: matchedUrl } = useRouteMatch();
  const { data, error, state } = useApi("https://api.thecatapi.com/v1/breeds");
  const catId = useQuery().get("id");
  // FIXME: data is undefined, because of asynchronous data loading from useApi.
  const { averageLifeSpan, averageWeight, totalBreeds } = getCatsSummary(data);
  const FormatedData = () => {
    return (
      data &&
      data.map((cat) => (
        <li className={`item ${cat.id}`} key={cat.id}>
          <Link
            to={{
              pathname: `${matchedUrl}`,
              search: `?id=${cat.id}`,
            }}
          >
            {cat.name}
          </Link>
        </li>
      ))
    );
  };

  const Summary = () => (
    <div>
      <h2>Cats Paradise</h2>
      <h4>
        There are
        <span data-testid="totalBreeds">{totalBreeds}</span>
        cat breeds
      </h4>
      <p>
        The avergage weigth is
        <span data-testid="averageWeight">{averageWeight}</span>
        The avergage life span is
        <span data-testid="averageLifeSpan">{averageLifeSpan}</span>
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
      console.log("default");
      return <>Loading</>;
  }
}

export default Cats;
