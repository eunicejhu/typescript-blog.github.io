import React from "react";
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from "@storybook/react/types-6-0";

import { themes } from "../../context/ThemeContext";
import Select, { SelectProps } from "./Select";
import { data } from "./Select.test";

export default {
    title: "Design system/Select",
    component: Select,
    argTypes: {},
} as Meta;

const Template: Story<SelectProps> = (args) => <Select {...args} />;

export const UserSelect = Template.bind({});
UserSelect.args = {
    mode: "pink",
    themes,
    data,
    placeholder: "choose the user",
};
