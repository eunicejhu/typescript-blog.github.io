import store from "../../store/index";
import { INITIAL_STATE } from "../../test/mock_data";
import Client from "../../api/client";
import {
  addNewPost,
  updatePost,
  fetchPosts,
  addReaction,
  Post,
} from "./postsSlice";
import { nanoid } from "@reduxjs/toolkit";

jest.mock("../../api/client.ts");

jest.mock("axios");

beforeAll(() => {
  console.error = jest.fn();
});

describe("fetchPost test", () => {
  test("failed", async () => {
    Client.fetchPost = jest
      .fn()
      .mockRejectedValueOnce(new Error("posts not found"));
    expect(store.getState().posts.data).toEqual([]);
    await store.dispatch(fetchPosts());
    expect(store.getState().posts.data).toEqual([]);
    expect(store.getState().posts.status).toBe("failed");
    expect(store.getState().posts.error).not.toBeUndefined();
  });
  test("succeeded", async () => {
    Client.fetchPost = jest
      .fn()
      .mockResolvedValueOnce({ data: INITIAL_STATE.posts.data });
    expect(store.getState().posts.data).toEqual([]);
    await store.dispatch(fetchPosts());
    expect(store.getState().posts.data).toEqual(INITIAL_STATE.posts.data);
    expect(store.getState().posts.status).toBe("succeeded");
    expect(store.getState().posts.error).toBeUndefined();
  });
});

describe("addNewPost test", () => {
  it("succeeded", async () => {
    Client.addNewPost = jest.fn().mockResolvedValueOnce({
      data: {
        id: nanoid(),
        title: "title 3",
        content: "Content 3",
        userId: "1",
        date: new Date().toISOString(),
        reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
      },
    });
    await store.dispatch(
      addNewPost({ title: "title 3", content: "Content 3", userId: "1" })
    );
    const latestPost = store.getState().posts.data[
      store.getState().posts.data.length - 1
    ];
    expect(latestPost).toMatchInlineSnapshot(
      {
        id: expect.any(String),
        date: expect.any(String),
      },
      `
    Object {
      "content": "Content 3",
      "date": Any<String>,
      "id": Any<String>,
      "reactions": Object {
        "eyes": 0,
        "heart": 0,
        "hooray": 0,
        "rocket": 0,
        "thumbsUp": 0,
      },
      "title": "title 3",
      "userId": "1",
    }
  `
    );
  });
});

describe("updatePost test", () => {
  beforeEach(() => {
    Client.fetchPost = jest
      .fn()
      .mockResolvedValueOnce({ data: INITIAL_STATE.posts.data });
    store.dispatch(fetchPosts());
  });
  it("succeeded", async () => {
    const existingPost = store
      .getState()
      .posts.data.find((post) => post.id === "1");
    Client.updatePost = jest.fn().mockResolvedValueOnce({
      data: {
        ...existingPost,
        id: "1",
        title: "Love, laugh, eat",
        content: "Hahaha",
      },
    });
    await store.dispatch(
      updatePost({
        id: "1",
        title: "Love, laugh, eat",
        content: "Hahaha",
      } as Post)
    );
    expect(store.getState().posts.data.find((post) => post.id === "1")).toEqual(
      {
        ...existingPost,
        id: "1",
        title: "Love, laugh, eat",
        content: "Hahaha",
      }
    );
  });
  it("failed at REST API", async () => {
    Client.updatePost = jest
      .fn()
      .mockRejectedValueOnce(new Error("failed to update post!"));
    await store.dispatch(
      updatePost({
        id: "1",
        title: "Love, laugh, eat",
        content: "Hahaha",
      } as Post)
    );
    expect(
      store.getState().posts.data.find((post) => post.id === "1")?.title
    ).not.toBe("Love, laugh, eat");
    expect(store.getState().posts.updatePostError).not.toBeUndefined();
  });

  it("failed when cannot find post returned from server", async () => {
    const existingPost = store
      .getState()
      .posts.data.find((post) => post.id === "1");
    Client.updatePost = jest.fn().mockResolvedValueOnce({
      data: {
        ...existingPost,
        id: 4,
        title: "Love, laugh, eat",
        content: "Hahaha",
      },
    });
    await store.dispatch(
      updatePost({
        id: "1",
        title: "Love, laugh, eat",
        content: "Hahaha",
      } as Post)
    );
    expect(existingPost?.title).not.toBe("Love, laugh, eat");
    expect(store.getState().posts.updatePostError).not.toBeUndefined();
  });
});

describe("addReaction Test", () => {
  beforeEach(() => {
    Client.fetchPost = jest
      .fn()
      .mockResolvedValueOnce({ data: INITIAL_STATE.posts.data });
    store.dispatch(fetchPosts());
  });
  it("succeeded", async () => {
    Client.addReaction = jest.fn().mockResolvedValueOnce({
      data: {
        id: "1",
        reactions: { thumbsUp: 0, hooray: 0, heart: 5, rocket: 0, eyes: 0 },
      },
    });
    await store.dispatch(addReaction({ postId: "1", reaction: "heart" }));
    expect(
      store.getState().posts.data.find((post) => post.id === "1")?.reactions
        .heart
    ).toBe(5);
  });
  it("failed when Rest API error", async () => {
    Client.addReaction = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed to add reaction"));
    await store.dispatch(addReaction({ postId: "1", reaction: "heart" }));
    expect(
      store.getState().posts.data.find((post) => post.id === "1")?.reactions
        .heart
    ).not.toBe(5);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
  it("failed when existing post is not found", async () => {
    const existingPost = store
      .getState()
      .posts.data.find((post) => post.id === "1");
    Client.addReaction = jest.fn().mockResolvedValueOnce({
      data: {
        ...existingPost,
        id: "5",
        reactions: { ...existingPost?.reactions, heart: 5 },
      },
    });
    await store.dispatch(addReaction({ postId: "1", reaction: "heart" }));
    expect(
      store.getState().posts.data.find((post) => post.id === "1")?.reactions
        .heart
    ).not.toBe(5);
    expect(console.error).toHaveBeenCalledTimes(1);
  });
});
