import axios, { AxiosResponse } from "axios";

export const get_users_url = "/api/users";
export const get_posts_url = "/api/posts";
export const get_notifications_url = "/api/notifications";
export const add_new_post_url = "/api/posts";

class Client {
  static async addNewPost<T>(data: Partial<T>) {
    let res;
    const url = add_new_post_url;
    res = await axios.post<{ post: T }>(url, { data });
    return res.data.post;
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
  static async fetchPost<T>() {
    const res = await axios.get<{ posts: T }>(get_posts_url);
    return { data: res.data.posts };
  }

  static async fetchAllNotifications<T>(timestamp: string | undefined) {
    let res;
    const reqConfig = { params: { timestamp } };
    res = await axios.get<{ notifications: T }>(
      get_notifications_url,
      reqConfig
    );
    return { data: res.data.notifications };
  }

  static async fetchUsers<T>() {
    let res;
    res = await axios.get<{ users: T }>(get_users_url);
    return { data: res.data.users };
  }
}

export default Client;
