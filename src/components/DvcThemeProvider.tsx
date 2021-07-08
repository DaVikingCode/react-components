import { createTheme, ThemeProvider } from "@material-ui/core";
import React, { FC } from "react";

export const muiTheme = createTheme({
    palette: {
        primary: {
            main: '#005fb8',
        },
        secondary: {
            main: '#93c90e'
        },
        text: {
            primary: '#312929',
            secondary: '#4F6375',
        },
    },
    typography: {
        allVariants: {
            fontFamily: '"Ubuntu", sans-serif'
        },
        h6: {
            fontStyle: 'normal',
            fontWeight: 500,
            fontSize: '20px',
            letterSpacing: '0.15px'
        },
        subtitle2: {
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: '14px',
            letterSpacing: '0.1px'
        },
        caption: {
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '12px',
            letterSpacing: '0.4px'
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 'normal'
        },
        body2: {
            fontSize: '14px',
            fontWeight: 'normal'
        }
    }
});

export const DvcThemeProvider: FC = ({ children }) => {
    return <ThemeProvider theme={muiTheme}>
        {children}
    </ThemeProvider>
}

export default DvcThemeProvider;