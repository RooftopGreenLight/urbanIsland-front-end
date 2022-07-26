import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { RecoilRoot } from "recoil"
import App from "App"

import { ModalProvider } from "module/Modal"
import { ThemeProvider } from "styled-components"
import { defalutTheme as theme } from "styles/Theme"
import GlobalStyle from "styles/GlobalStyle"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <RecoilRoot>
        <ModalProvider>
          <GlobalStyle />
          <App />
        </ModalProvider>
      </RecoilRoot>
    </BrowserRouter>
  </ThemeProvider>,
)
