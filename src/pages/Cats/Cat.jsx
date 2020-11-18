import React, { useState, useEffect } from "react";
import axios from "axios";
import { useImmer } from "use-immer";

import useQuery from "../../hooks/useQuery";

function Cat() {
  const [data, setData] = useImmer({ url: "", name: "", description: "" });
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const id = useQuery().get("id");

  useEffect(() => {
    const fetchData = async () => {
      const url = `https://api.thecatapi.com/v1/images/search?breed_id=${id}`;
      setIsLoadingImage(true);
      try {
        const { data: catData } = await axios.get(url);
        const { breeds, url: catUrl } = catData[0];
        const { name: catName, description: catDescription } = breeds[0];

        setData((draft) => {
          draft.url = catUrl;
          draft.name = catName;
          draft.description = catDescription;
        });
        setIsLoadingImage(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (id) fetchData();
  }, [id, setData]);

  const { name, url, description } = data;
  return (
    <div>
      <h2>{name}</h2>
      {isLoadingImage ? "Loading..." : <img src={url} width="200" alt={name} />}
      <p>{description}</p>
    </div>
  );
}

export default Cat;
