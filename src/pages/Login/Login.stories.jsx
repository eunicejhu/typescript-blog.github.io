import React from "react";
import Login from "./Login";

// This default export determines where your story goes in the story list
export default {
  title: "Login",
  component: Login,
};

const Template = (args) => <Login {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* the args you need here will depend on your component */
};
