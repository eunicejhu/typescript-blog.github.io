import React from "react";
import { render } from "@testing-library/react";
import Select from "./Select";
import { themes } from "../../context/ThemeContext";
import { fireEvent } from "@testing-library/react";

export const data = [
    {
        id: "1",
        name: "Chris",
    },
    {
        id: "3",
        name: "Isa",
    },
    {
        id: "2",
        name: "Bob",
    },
];

describe("Select test", () => {
    it("Select test:", () => {
        const ui = (
            <Select
                themes={themes}
                mode="pink"
                data={data}
                placeholder="choose the user"
            ></Select>
        );
        const { container } = render(ui);
        expect(container.firstChild).toMatchSnapshot();
    });

    it("select li, update input value", () => {
        const mockOnChange = jest.fn();
        const ui = (
            <Select
                themes={themes}
                mode="pink"
                data={data}
                placeholder="choose the user"
                value=""
                onChange={mockOnChange}
            ></Select>
        );
        const { getByTestId } = render(ui);
        fireEvent.click(getByTestId("1"));
        expect(mockOnChange).toHaveBeenCalledWith("1");
    });
});
