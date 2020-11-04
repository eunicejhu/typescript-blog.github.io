import { useEffect } from "react";
import axios from "axios";
import useImmer from "use-immer";

export const API_STATUS = {
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
  LOADING: "LOADING",
};
const useApi = (url) => {
  const [response, setResponse] = useImmer({
    state: null,
    data: null,
    error: "",
  });
  const fetchData = async () => {
    try {
      setResponse((draft) => {
        draft.status = API_STATUS.LOADING;
      });
      const { data } = await axios.get(url);
      setResponse((draft) => {
        draft.status = API_STATUS.SUCCESS;
        draft.data = data;
      });
    } catch (error) {
      setResponse((draft) => {
        draft.state = API_STATUS.ERROR;
        draft.error = error;
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return response;
};

export default useApi;
