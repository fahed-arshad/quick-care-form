import { createTheme } from "@mui/material";
import type {} from "@mui/lab/themeAugmentation";
import { dmSans, gilroy, openSans } from "./font";
import { PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    appBar: Palette["primary"];
  }

  interface PaletteOptions {
    appBar?: PaletteOptions["primary"];
  }
}

const quickCarePalette: PaletteOptions = {
  appBar: {
    main: "#FFFFFF",
  },
  primary: {
    main: "#01081B",
  },
  secondary: {
    main: "#2E68FD",
  },
  text: {
    primary: "#303133",
  },
};

const wellPalette: PaletteOptions = {
  appBar: {
    main: "#FFFFFF",
  },
  primary: {
    main: "#014c6b",
  },
  secondary: {
    main: "#cfebf6",
  },
  text: {
    primary: "#014c6b",
  },
};

const superdrugPalette: PaletteOptions = {
  appBar: {
    main: "#FFFFFF",
  },
  primary: {
    main: "#121111",
  },
  secondary: {
    main: "#ee008e",
  },
  text: {
    primary: "#121111",
  },
};

// Step 1: Create a base theme
const baseTheme = createTheme({
  spacing: 8,
  palette:
    process.env.NEXT_PUBLIC_WELL_PHARMACY === "true"
      ? wellPalette
      : process.env.NEXT_PUBLIC_SUPERDRUG_PHARMACY === "true"
      ? superdrugPalette
      : quickCarePalette,
});

// Step 2: Create the final theme using the base theme
const quickCareTheme = createTheme({
  ...baseTheme,
  typography: {
    fontFamily: dmSans.style.fontFamily,
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
          backgroundColor: "white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: baseTheme.palette.primary.main,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "22px",
          whiteSpace: "normal",
          fontWeight: "bold",
          marginBottom: 24,
          color: baseTheme.palette.text.primary,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "24px",
          textTransform: "none",
          border: `1px solid ${baseTheme.palette.primary.main}`,
          borderRadius: "100px",
          ":hover": {
            backgroundColor: baseTheme.palette.secondary.main,
          },
          ":active": {
            backgroundColor: baseTheme.palette.primary.main,
          },
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
    MuiMenu: {
      styleOverrides: {
        paper: {
          border: `1px solid ${baseTheme.palette.primary.main}`,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          border: `1px solid ${baseTheme.palette.primary.main}`,
        },
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
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: "white",
          borderColor: baseTheme.palette.primary.main,
          color: baseTheme.palette.primary.main,
          fontWeight: "bold",
          fontSize: 22,
          ":hover": {
            backgroundColor: baseTheme.palette.secondary.main,
          },
          "&.Mui-selected": {
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.common.white,
            ":hover": {
              backgroundColor: baseTheme.palette.primary.dark,
            },
          },
        },
      },
    },
    MuiToggleButtonGroup: {
      styleOverrides: {
        root: {
          borderColor: baseTheme.palette.primary.main,
        },
        firstButton: {
          borderTopLeftRadius: "100px",
          borderBottomLeftRadius: "100px",
        },
        lastButton: {
          borderLeft: `1px solid ${baseTheme.palette.primary.main}`,
          borderTopRightRadius: "100px",
          borderBottomRightRadius: "100px",
        },
      },
    },
  },
});

const wellTheme = createTheme({
  ...baseTheme,
  ...quickCareTheme,
  typography: {
    fontFamily: gilroy.style.fontFamily,
  },
  components: {
    ...quickCareTheme.components,
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "24px",
          textTransform: "none",
          border: `1px solid ${baseTheme.palette.primary.main}`,
          borderRadius: "100px",
          ":hover": {
            border: `1px solid ${baseTheme.palette.primary.main}`,
            backgroundColor: baseTheme.palette.secondary.main,
            color: baseTheme.palette.primary.main,
          },
          ":active": {
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.appBar.main,
          },
        },
        outlined: {
          ":active": {
            color: baseTheme.palette.primary.main,
          },
        },
      },
    },
  },
});

const superdrugTheme = createTheme({
  ...baseTheme,
  ...quickCareTheme,
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  components: {
    ...quickCareTheme.components,
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: "24px",
          textTransform: "none",
          border: `1px solid ${baseTheme.palette.secondary.main}`,
          backgroundColor: baseTheme.palette.secondary.main,
          borderRadius: "3px",
          ":hover": {
            border: `1px solid ${baseTheme.palette.primary.main}`,
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.appBar.main,
          },
          ":active": {
            backgroundColor: baseTheme.palette.primary.main,
            color: baseTheme.palette.appBar.main,
          },
        },
        outlined: {
          border: `1px solid ${baseTheme.palette.primary.main}`,
          ":hover": {
            color: baseTheme.palette.primary.main,
          },
        },
      },
    },
  },
});

const themeToExport =
  process.env.NEXT_PUBLIC_WELL_PHARMACY === "true"
    ? wellTheme
    : process.env.NEXT_PUBLIC_SUPERDRUG_PHARMACY === "true"
    ? superdrugTheme
    : quickCareTheme;

export default themeToExport;
