import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d9488", // Emerald Teal - clean, caring, professional
      light: "#2dd4bf",
      dark: "#0f766e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6366f1", // Indigo
      light: "#818cf8",
      dark: "#4338ca",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc", // Very soft blue-gray background
      paper: "#ffffff",
    },
    text: {
      primary: "#1e293b", // Slate-800
      secondary: "#64748b", // Slate-500
    },
    success: {
      main: "#10b981", // Emerald-500
      light: "#34d399",
      dark: "#047857",
    },
    warning: {
      main: "#f59e0b", // Amber-500
      light: "#fbbf24",
      dark: "#b45309",
    },
    error: {
      main: "#ef4444", // Red-500
      light: "#f87171",
      dark: "#b91c1c",
    },
    divider: "#e2e8f0", // Slate-200
  },
  typography: {
    fontFamily: [
      '"Inter"',
      '"-apple-system"',
      '"BlinkMacSystemFont"',
      '"Segoe UI"',
      '"Roboto"',
      '"Helvetica Neue"',
      '"Arial"',
      'sans-serif',
    ].join(","),
    h1: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700 },
    h2: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700 },
    h3: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700 },
    h4: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 700 },
    h5: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 600 },
    h6: { fontFamily: '"Outfit", "Inter", sans-serif', fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    subtitle2: { fontWeight: 500 },
    button: {
      fontFamily: '"Outfit", "Inter", sans-serif',
      textTransform: "none",
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f8fafc",
          scrollbarWidth: "thin",
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f5f9",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#cbd5e1",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "#94a3b8",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "none",
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
            transform: "translateY(-1px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
          border: "1px solid #f1f5f9",
        },
        elevation1: {
          boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)",
        },
        elevation2: {
          boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05)",
        },
        elevation4: {
          boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.04), 0 4px 6px -4px rgb(0 0 0 / 0.04)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
