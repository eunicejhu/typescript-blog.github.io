import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import styled from "styled-components";
import { Mode, Themes, SetMode } from "./context/ThemeContext";
import Select from "./components/select/Select";

import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";

export interface AppProps {
    themes: Themes;
    mode: Mode;
    setMode: SetMode;
}

const StyledApp = styled.div<AppProps>`
    ${({ themes, mode }) => {
        return `
            color: ${themes[mode].text};
            background-color: ${themes[mode].background};
      
        & input, & textarea {
            border: 1px solid  ${themes[mode].btnBorder};
            padding:  ${themes[mode].spacing};
            box-sizing: border-box;
        }

        & header {
            display: flex;
            align-items: center;
            justify-content: flex-end;

            nav {
                display: flex;
                li {
                    margin: 0 ${themes[mode].spacing};
                    list-style: none;
                    &:hover {
                        cursor: pointer;
                        color: ${themes[mode].background};
                        background-color: ${themes[mode].text};
                    }
                }
            }

            .selectWrapper {
                width: 4em;
                margin: 0 ${themes[mode].spacing};
            }
        }
        `;
    }}
    : var(--color-text);
`;

const modeData = (data: string[]) =>
    data.map((mode: string) => ({ id: mode, name: mode }));

const App: React.FC<AppProps> = (props) => {
    const dispatch = useDispatch();

    const { themes, mode, setMode } = props;
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <StyledApp {...props} themes={themes} mode={mode}>
            <header>
                <NavBar />
                <div className="selectWrapper">
                    <Select
                        themes={themes}
                        mode={mode}
                        value={mode}
                        data={modeData(["dark", "pink", "light"])}
                        placeholder="theme"
                        onChange={setMode}
                    ></Select>
                </div>
            </header>
            <main>
                <Routes />
            </main>
            <footer>copyright@2020 author ZUOQIN HU</footer>
        </StyledApp>
    );
};

export default App;
