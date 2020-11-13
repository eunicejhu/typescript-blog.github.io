const isTest = process.env.NODE_ENV === "test";
const mockPosts = [
  { id: "1", title: "First test Post!", content: "test!" },
  { id: "2", title: "Second test Post", content: "test" },
];
const initialState = {
  posts: isTest ? mockPosts : [],
};

export default initialState;
