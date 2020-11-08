import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Cat from "./Cat";
import useQuery from "../../hooks/useQuery";
import useApi, { API_STATUS } from "../../hooks/useApi";
import getCatsSummary from "../../helpers/getCatsSummary";
import catReducer from "../../reducers/catsReducer";

const GET_CATS_URL = "https://api.thecatapi.com/v1/breeds";

function Cats() {
  const { url: matchedUrl } = useRouteMatch();
  const [state, dispatch] = React.useReducer(catReducer, {
    data: null,
    error: null,
    status: null,
  });
  useApi(GET_CATS_URL, dispatch);
  const catId = useQuery().get("id");
  const { data, error, status } = state;
  const { averageLifeSpan, averageWeight, totalBreeds } = getCatsSummary(data);

  const SummaryAndDataList = () => {
    if (data && data.length) {
      return (
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
          <ul>
            {data.map((cat) => (
              <li className={`item ${cat.id}`} key={cat.id}>
                <Link
                  data-testid={`${cat.id}`}
                  to={{
                    pathname: `${matchedUrl}`,
                    search: `?id=${cat.id}`,
                  }}
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return <>No Data</>;
  };

  switch (status) {
    case API_STATUS.ERROR:
      return <>{error}</>;
    case API_STATUS.SUCCESS:
      return catId ? (
        <Cat data-testid="CatComponent" />
      ) : (
        <SummaryAndDataList />
      );
    default:
      return <>Loading</>;
  }
}

export default Cats;
