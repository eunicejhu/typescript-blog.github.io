import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Themes, Mode } from "../../context/ThemeContext";
export interface SelectProps {
    themes: Themes;
    mode: Mode;
    data: { id: string; name: string }[];
    placeholder: string;
    width?: string;
    [p: string]: any;
}
const StyledSelect = styled.div<SelectProps>`
    ${({ themes, mode, ...restProps }) => {
        return `
            &&& {
                width: ${restProps.width || themes[mode].width};
                position: relative;
            }
            &&& input {
                padding: ${themes[mode].spacing};
                border: 1px solid ${themes[mode].btnBorder};
                border-radius: ${themes[mode].borderRadius};
                width: 100%;
                box-sizing: border-box;
                outline: none;
                color: transparent;
                text-shadow: 0 0 0 ${themes[mode].text};

                &:hover {
                    cursor: pointer;
                }
            }
            &&& ul {
                &.open {
                    display: block
                    z-index: 2;
                    background-color: ${themes[mode].background};
                }
                &.close {
                    display: none;
                }
                position: absolute;
                background-color: ${themes[mode].btnBackground};
                border:1px solid ${themes[mode].btnBorder};
                width: 100%;
                box-sizing: border-box;
                margin: 0;
                padding: 0;

                li {
                    list-style: none;
                    color: ${themes[mode].btnBorder};
                    padding: ${themes[mode].spacing};
                    &:hover {
                        background-color: ${themes[mode].btnBackgroundHover};
                        color: ${themes[mode].btnTextHover};
                        cursor: pointer;
                    }
                }
            }
        `;
    }}
`;

const useClickOutside = (cb: () => void) => {
    const outsideClickHandler = useCallback(
        (e: Event) => {
            if (
                ["selectInput", "selectInput-li"].indexOf(
                    (e.target as HTMLElement).classList[0]
                ) === -1
            )
                cb();
        },
        [cb]
    );

    useEffect(() => {
        document.addEventListener("click", outsideClickHandler);
        return () => {
            document.removeEventListener("click", outsideClickHandler);
        };
    }, [outsideClickHandler]);
};

const Select: React.FC<SelectProps> = ({
    data,
    placeholder,
    onChange,
    ...props
}) => {
    const [value, setValue] = useState<string>("");
    const [focus, setFocus] = useState<boolean>(false);

    useClickOutside(setFocus.bind(this, false));
    const onSelectFocused = () => {
        setFocus(true);
    };
    const onLiClicked = (name: string) => {
        setValue(name);
        setFocus(false);
    };
    const onInputChange = (e: React.FormEvent) => {
        // Input has two entries:
        //  1. select li from ul
        //  2. change input value (here mainly for test, later it will be implemented to enable input value)
        const id =
            (e.target as HTMLLIElement).value ||
            (e.target as HTMLLIElement).dataset.id;
        onChange && onChange(id);
    };
    const datalist = data.map((item) => {
        return (
            <li
                data-testid={item.id}
                data-id={item.id}
                data-name={item.name}
                className="selectInput-li"
                key={item.id}
                onClick={(e: React.FormEvent) => {
                    const name = (e.target as HTMLLIElement).dataset
                        .name as string;
                    onLiClicked(name);
                    onInputChange(e);
                }}
            >
                {item.name}
            </li>
        );
    });
    return (
        <StyledSelect {...props}>
            <input
                data-testid="selectInput"
                className="selectInput"
                onFocus={onSelectFocused}
                type="text"
                value={value}
                onChange={onInputChange}
                placeholder={placeholder}
            ></input>
            <ul className={focus ? "open" : "close"}>{datalist}</ul>
        </StyledSelect>
    );
};

export default Select;
