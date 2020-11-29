// eslint-disable-next-line import/no-extraneous-dependencies
import { createServer, Factory, Model } from "miragejs";
import { sub } from "date-fns";

export const makeServer = ({ environment = "test" } = {}) => {
  let server = createServer({
    environment,
    models: { user: Model, post: Model, notification: Model },
    factories: {
      user: Factory.extend({
        name(i) {
          return ["Tianna Jenkins", "Kevin Grant", "Madison Price"][i % 3];
        },
      }),
      // id starts from "1", i starts with 0
      post: Factory.extend({
        title(i) {
          const candidates = ["First", "Second"];
          return `${candidates[i % 2]} test Post`;
        },
        content: "test",
        userId() {
          const candidates = [1, 2, 3];
          return `${candidates[Math.floor(Math.random() * 3)]}`;
        },
        date(i) {
          return sub(new Date(), { days: i }).toISOString();
        },
        reactions(i) {
          const candidates = [
            { thumbsUp: 0, hooray: 0, heart: 4, rocket: 0, eyes: 0 },
            { thumbsUp: 3, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          ];
          return candidates[i % 2];
        },
      }),
      notification: Factory.extend({
        date(i) {
          // eslint-disable-next-line no-param-reassign
          return sub(new Date(), { days: i }).toISOString();
        },
        userId(i) {
          const candidates = [1, 2, 3];
          return `${candidates[Math.floor(Math.random() * 3)]}`;
        },
        message(i) {
          const candidates = [
            "Glad to know you",
            "Concert in two weeks",
            "Cinema next thursday",
          ];
          return candidates[i % 3];
        },
      }),
    },
    seeds(server) {
      server.createList("user", 3);
      server.createList("notification", 30);
      server.createList("post", 20);
    },
    routes() {
      this.namespace = "api";
      this.get("/users", (schema) => {
        return schema.users.all();
      });
      this.get("/posts", (schema) => {
        return schema.posts.all();
      });
      this.get("/notifications", (schema) => {
        return schema.notifications.all();
      });

      this.post("/posts", (schema, request) => {
        const { requestBody } = request;
        const { data } = JSON.parse(requestBody);
        const { id: postId, reactions } = data;

        if (postId) {
          // add Reaction
          const post = schema.posts.find(postId);
          post.update("reactions", reactions);
          return post;
        } else {
          //create Post
          const date = new Date().toISOString();
          return schema.posts.create({
            ...data,
            date,
            reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
          });
        }
      });

      this.put("/posts", (schema, request) => {
        const { requestBody } = request;
        const {
          data: { id, ...attrs },
        } = JSON.parse(requestBody);

        const existingPost = schema.posts.find(id);
        Object.entries(attrs).forEach(([attr, value]) => {
          existingPost.update(attr, value);
        });
        return existingPost;
      });
    },
  });
  return server;
};
