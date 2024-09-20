import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { createContext, useCallback, useContext, useState } from "react";

const ThemeContext = createContext();

export default function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const theme = createTheme({
    palette: {
      background: {
        default: '#ffffff',
      },
      primary: {
        main: '#CFC9C6',
        contrastText: '#918A87',
      },
      secondary: {
        main: '#F1E8CF',
      },
      text: {
        primary: '#918A87',
      },
    },
    typography: {
      fontFamily: 'Tahoma',
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "F1E8CF",
            justifyContent: "space-between",
            '&:hover': {
              backgroundColor: '#918A87',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: '#CFC9C6',
            boxShadow: 'none',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            color: '#918A87',
            '&:hover': {
              color: '#918A87',
              backgroundColor: '#E1DCD9',
              borderRadius: '50%',
            },
            '& + &': {
              paddingLeft: '8px',
            },
          },
        },
      },
      MuiFab: {
        styleOverrides: {
          root: {
            backgroundColor: '#F0E7CE',
            color: '#ffffff',
            '&:hover': {
              backgroundColor: '#918A87',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: '#918A87',
            '&:hover': {
              color: '#000',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: '#EEEAE8',
            border: '0.2px solid #A8A8A8',
            '&:hover': {
              backgroundColor: '#ffffff',
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
              padding: '3px',
              transition: 'all 0.3s ease',
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            textAlign: 'center',
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleDarkMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within a Provider");
  return context;
};
