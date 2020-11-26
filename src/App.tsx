import React, { useEffect } from "react";
import NavBar from "./NavBar";
import Routes from "./Routes";
import styled from "styled-components";
import { Mode, Themes } from "./context/ThemeContext";
import useTheme from "./hooks/useTheme";

import { useDispatch } from "react-redux";
import { fetchUsers } from "./features/users/usersSlice";

export interface AppProps {
    themes: Themes;
    mode: Mode;
}

const StyledApp = styled.div<AppProps>`
    ${({ themes, mode }) => {
        return `
            color: ${themes[mode].text};
            background-color: ${themes[mode].background};
        &  a:hover {
            color: ${themes[mode].background};
            background-color: ${themes[mode].text};
        }
        & input, & textarea, & select {
            border: 1px solid  ${themes[mode].btnBorder};
            padding:  ${themes[mode].spacing};
            box-sizing: border-box;
        }
        `;
    }}
    : var(--color-text);
`;

const App: React.FC<AppProps> = (props) => {
    const dispatch = useDispatch();
    const { themes, mode } = useTheme();
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    return (
        <StyledApp {...props} themes={themes} mode={mode}>
            <header>
                <NavBar />
            </header>
            <main>
                <Routes />
            </main>
            <footer>copyright@2020 author ZUOQIN HU</footer>
        </StyledApp>
    );
};

export default App;
