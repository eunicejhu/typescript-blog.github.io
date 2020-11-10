import React from "react";
import Signup from "./Signup";

// This default export determines where your story goes in the story list
export default {
  title: "Signup",
  component: Signup,
};

const Template = (args) => <Signup {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* the args you need here will depend on your component */
};
