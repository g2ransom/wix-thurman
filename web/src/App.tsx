import React from "react";
import { createTheme, responsiveFontSizes, ThemeProvider } from "@mui/material/styles";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import "./App.css";
import AccountProvider from "./providers/AccountProvider";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

let theme = createTheme({
  typography: {
    fontFamily: [
      "Space Grotesk", 
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: "0.5em",
          fontWeight: "bold",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          boxSizing: "border-box",
          borderRadius: "0",
          textTransform: "none",
          margin: "1.0em 1.5em 1.0em 0.0em",
          padding: "0.5em 2.5em 0.5em 2.5em",
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

function App() {  
  return (
    <ThemeProvider theme={theme}>
      <AccountProvider>
        <div className="App">
          <Header />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
          <Footer />
        </div>
      </AccountProvider>
    </ThemeProvider>
  );
}

export default App;
