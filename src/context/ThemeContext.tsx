import React from "react";

export const LIGHT = {
    text: "rgba(0, 0, 0, 1)",
    background: "rgba(255, 255, 255, 1)",
    btnBackground: "transparent",
    btnBorder: "rgba(0, 0, 0, 1)",
    btnTextHover: "rgba(255, 255, 255, 0.8)",
    btnBackgroundHover: "rgba(0, 0, 0, 0.8)",
    disabled: "rgba(0, 0, 0, 0.24)",
    disabledBackground: "rgba(255, 255, 255, 0.2)",
};
export const DARK = {
    text: "rgba(255, 255, 255, 1)",
    background: "rgba(0, 0, 0, 1)",
    btnBackground: "transparent",
    btnBorder: "rgba(255, 255, 255, 1)",
    btnTextHover: "rgba(0, 0, 0, 0.8)",
    btnBackgroundHover: "rgba(255, 255, 255, 0.8)",
    disabled: "rgba(255, 255, 255, 0.4)",
    disabledBackground: "rgba(0, 0, 0, 0.2)",
};

const PINK = {
    text: "rgba(196, 139, 159, 1)",
    background: "rgba(255, 255, 255, 1)",
    btnBackground: "transparent",
    btnBorder: "rgba(196, 139, 159, 1)",
    btnTextHover: "rgba(255, 255, 255, 0.8)",
    btnBackgroundHover: "rgba(196, 139, 159, 0.8)",
    disabled: "rgba(196, 139, 159, 0.4)",
    disabledBackground: "rgba(196, 139, 159, 0.2)",
};

const OTHER = {
    borderRadius: "4px",
    transition: "all 0.2s",
    spacing: "10px",
    width: "100%",
};

export const themes = {
    dark: { ...DARK, ...OTHER },
    light: { ...LIGHT, ...OTHER },
    pink: { ...PINK, ...OTHER },
};

export type Mode = "pink" | "dark" | "light";
export type Themes = typeof themes;
export type SetMode = (mode: Mode) => void;

const ThemeContext = React.createContext<{
    mode: Mode;
    themes: Themes;
    setMode: SetMode;
}>({
    mode: "pink",
    themes: themes,
    setMode: () => {},
});

ThemeContext.displayName = "ThemeContext";

export default ThemeContext;
