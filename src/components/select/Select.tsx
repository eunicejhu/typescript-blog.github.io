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
                background-color: ${themes[mode].background};
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
    value,
    ...props
}) => {
    const [focus, setFocus] = useState<boolean>(false);

    useClickOutside(setFocus.bind(this, false));

    const onSelectFocused = () => {
        setFocus(true);
    };
    const onLiClicked = (e: React.FormEvent) => {
        const id = (e.target as HTMLLIElement).dataset.id;
        onChange(id as string);
        setFocus(false);
    };

    const datalist = data.map((item) => {
        return (
            <li
                data-testid={item.id}
                data-id={item.id}
                data-name={item.name}
                className="selectInput-li"
                key={item.id}
                onClick={onLiClicked}
            >
                {item.name}
            </li>
        );
    });
    return (
        /** Here we use uncontrolled component, because it's onClick of li
            charging the change of the value, instead of onChange of input. */
        <StyledSelect {...props}>
            <input
                data-testid="selectInput"
                className="selectInput"
                onFocus={onSelectFocused}
                type="text"
                defaultValue={value}
                placeholder={placeholder}
            ></input>
            <ul className={focus ? "open" : "close"}>{datalist}</ul>
        </StyledSelect>
    );
};

export default Select;
