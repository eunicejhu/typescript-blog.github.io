import { useEffect } from "react";
import axios from "axios";

export const API_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
};
const useApi = (url, dispatch) => {
  const fetchData = async () => {
    try {
      dispatch({ type: API_STATUS.LOADING });
      const result = await axios.get(url);
      const { data } = result;
      dispatch({ type: API_STATUS.SUCCESS, payload: { data } });
    } catch (error) {
      dispatch({ type: API_STATUS.ERROR, payload: { error } });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
};

export default useApi;
