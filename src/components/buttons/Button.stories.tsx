import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { themes } from "../../context/ThemeContext";
import Button, { ButtonProps } from "./Button";

export default {
    title: "Design system/Button",
    component: Button,
    argTypes: {},
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    mode: "pink",
    themes,
    children: "Primary Button",
};

export const Disabled = Template.bind({});
Disabled.args = {
    mode: "pink",
    themes,
    disabled: true,
    children: "Secondary Button",
};
