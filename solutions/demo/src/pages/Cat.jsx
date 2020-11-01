import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Cat() {
  const history = useHistory();
  const {
    state: {
      data: { name, description, id },
    },
  } = history.location;
  const [imageUrl, setImageUrl] = useState("");
  const [isLoadingImage, setIsLoadingImage] = useState(false);

  const fetchData = async () => {
    const url = `https://api.thecatapi.com/v1/images/search?breed_id=${id}`;
    setIsLoadingImage(true);
    try {
      const { data } = await axios.get(url);
      const { url: imgUrl } = data[0];
      setImageUrl(imgUrl);
      setIsLoadingImage(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2>{name}</h2>
      {isLoadingImage ? (
        "Loading..."
      ) : (
        <img src={imageUrl} width="200" alt={name} />
      )}
      <p>{description}</p>
    </div>
  );
}

export default Cat;
