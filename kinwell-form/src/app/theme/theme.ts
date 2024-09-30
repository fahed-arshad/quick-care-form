import { createTheme } from "@mui/material";
import type {} from "@mui/lab/themeAugmentation";
import { dmSans } from "../layout";

declare module "@mui/material/styles" {
  interface Palette {
    appBar: Palette["primary"];
  }

  interface PaletteOptions {
    appBar?: PaletteOptions["primary"];
  }
}

// Step 1: Create a base theme
const baseTheme = createTheme({
  spacing: 8,
  palette: {
    appBar: {
      main: "#FFFFFF",
    },
    primary: {
      main: "#05173d",
    },
    secondary: {
      main: "#00a2af",
    },
    text: {
      primary: "#303133",
    },
  },
  typography: {
    fontFamily: dmSans.style.fontFamily,
  },
});

// Step 2: Create the final theme using the base theme
export const theme = createTheme({
  ...baseTheme,
  typography: {
    ...baseTheme.typography,
    h2: {
      [baseTheme.breakpoints.down("sm")]: {
        fontSize: "2.5rem",
      },
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "24px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "24px",
          whiteSpace: "normal",
          fontWeight: "bold",
          color: baseTheme.palette.text.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "24px",
          textTransform: "none",
          ":hover": {
            backgroundColor: baseTheme.palette.secondary.main,
          },
          ":active": {
            backgroundColor: baseTheme.palette.primary.main,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: baseTheme.palette.secondary.main,
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "16px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "24px",
        },
        asterisk: {
          display: "none",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          alignItems: "flex-start!important",
        },
        listbox: {
          alignItems: "flex-start",
        },
        focused: {
          alignItems: "flex-start",
        },
      },
    },
  },
});
