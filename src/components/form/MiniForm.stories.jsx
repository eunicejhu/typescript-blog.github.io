import React from "react";
import MiniFormik from "./MiniFormik";

// This default export determines where your story goes in the story list
export default {
  title: "MiniFormik",
  component: MiniFormik,
};

const Template = (args) => <MiniFormik {...args} />;

export const FirstStory = Template.bind({});

FirstStory.args = {
  /* the args you need here will depend on your component */
};
