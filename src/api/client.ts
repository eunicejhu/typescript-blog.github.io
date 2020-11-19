import { AxiosResponse } from "axios";
import { INITIAL_STATE } from "../test/mock_data";
import { nanoid } from "@reduxjs/toolkit";
class Client {
  static async fetchPost<T>(): Promise<AxiosResponse<T>> {
    /**
     * TODO: Actual Implementation when server is ready
     const url = "fetch_post_url";
    const res = await axios.get<T>(url); */
    const res = new Promise<AxiosResponse<T>>((resolve) => {
      setTimeout(() => {
        return resolve({ data: INITIAL_STATE.posts.data } as AxiosResponse);
      }, 1000);
    });
    return res;
  }

  static async addNewPost<T>(data: T): Promise<AxiosResponse<T>> {
    let res;
    /**
     * TODO: Actual Implementation when server is ready
     * const url = "add_new_post_url";
     * res = await axios.post(url, {data });
     */

    res = new Promise<AxiosResponse<T>>((resolve, reject) => {
      setTimeout(() => {
        return resolve({
          data: {
            ...data,
            id: nanoid(), // normally, it should be returned from server
            date: new Date().toISOString(),
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          },
        } as AxiosResponse);
        // return reject(new Error("Cannot add new Post"));
      }, 1000);
    });

    return res;
  }

  static async updatePost<T>(data: T): Promise<AxiosResponse<T>> {
    let res;
    /**
     * TODO: Actual Implementation when server is ready
     * const url = "update_post_url";
     * res = await axios.post<T>(url, data);
     * */
    res = new Promise<AxiosResponse<T>>((resolve) => {
      setTimeout(() => {
        return resolve({ data } as AxiosResponse);
      }, 1000);
    });
    return res;
  }

  static async addReaction<Return>(
    data: Return
  ): Promise<AxiosResponse<Return>> {
    let res;
    /**
     * TODO: Actual Implementation when server is ready
     * const url = "add_reaction_url";
     * res = await axios.post<Return>(url, data);
     * */

    res = new Promise<AxiosResponse<Return>>((resolve) => {
      return resolve({ data } as AxiosResponse<Return>);
    });
    return res;
  }
}

export default Client;
