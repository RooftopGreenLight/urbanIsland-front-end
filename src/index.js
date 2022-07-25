import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

import { ThemeProvider } from "styled-components"
import { defalutTheme as theme } from "styles/Theme"
import GlobalStyle from "./styles/GlobalStyle"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>,
)
