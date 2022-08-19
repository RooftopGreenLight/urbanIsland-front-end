import React from "react"
import ReactDOM from "react-dom/client"
import { RecoilRoot } from "recoil"
import App from "App"

import { AuthProvider } from "module/Auth"
import { ModalProvider } from "module/Modal"
import { ThemeProvider } from "styled-components"
import { defalutTheme as theme } from "styles/Theme"
import GlobalStyle from "styles/GlobalStyle"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <AuthProvider>
        <ModalProvider>
          <GlobalStyle />
          <App />
        </ModalProvider>
      </AuthProvider>
    </RecoilRoot>
  </ThemeProvider>,
)
