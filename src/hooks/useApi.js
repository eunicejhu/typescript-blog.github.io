import { useEffect, useState } from "react";
import axios from "axios";

export const API_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
};
const useApi = (url) => {
  const [response, setResponse] = useState({
    state: null,
    data: null,
    error: null,
  });
  const fetchData = async () => {
    try {
      setResponse({ ...response, state: API_STATUS.LOADING });
      const result = await axios.get(url);
      const { data } = result;
      setResponse({
        ...response,
        state: API_STATUS.SUCCESS,
        data,
        error: null,
      });
    } catch (error) {
      setResponse({ ...response, state: API_STATUS.ERROR, error, data: null });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return response;
};

export default useApi;
