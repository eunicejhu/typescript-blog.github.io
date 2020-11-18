import axios from "axios";
class Client {
  async get(url) {
    let res;
    res = await axios.get(url);
    return res;
  }
  async post(url, options) {
    let res;
    res = await axios.post(url, { ...options });
    return res;
  }
}

export default Client;
