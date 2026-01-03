import { createTheme } from "@mui/material/styles";

export default createTheme({
  palette: {
    mode: "light",
    primary: { main: "#2563EB" },
    success: { main: "#16A34A" },
    warning: { main: "#F97316" },
    text: { primary: "#0F172A", secondary: "rgba(15,23,42,0.55)" },
    background: { default: "#F5F7FB", paper: "#fff" },
  },
  typography: {
    fontFamily:
      '"ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji"',
    fontSize: 14,
    h1: { fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1 },
    h2: { fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.12 },
    body1: { fontSize: 15, fontWeight: 500, lineHeight: 1.6 },
    body2: { fontSize: 14, fontWeight: 600, lineHeight: 1.45 },
    button: { fontSize: 14, fontWeight: 800, textTransform: "none" },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          border: "1px solid rgba(15,23,42,0.06)",
          boxShadow: "0 12px 26px rgba(15,23,42,0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 999, minHeight: 44, paddingInline: 18 },
      },
    },
  },
});
