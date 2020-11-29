import axios from "axios";
export const get_users_url = "/api/users";
export const get_notifications_url = "/api/notifications";
export const posts_endpoint = "/api/posts";

class Client {
  static async addNewPost<T>(data: Partial<T>): Promise<{ data: T }> {
    let res;
    res = await axios.post<{ post: T }>(posts_endpoint, { data });
    return { data: res.data.post };
  }

  static async updatePost<T>(data: Partial<T>): Promise<{ data: T }> {
    let res;
    res = await axios.put<{ post: T }>(posts_endpoint, { data });
    return { data: res.data.post };
  }

  static async addReaction<T>(data: Partial<T>): Promise<{ data: T }> {
    let res;
    res = await axios.post<{ post: T }>(posts_endpoint, { data });
    return { data: res.data.post };
  }
  static async fetchPost<T>() {
    const res = await axios.get<{ posts: T }>(posts_endpoint);
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
