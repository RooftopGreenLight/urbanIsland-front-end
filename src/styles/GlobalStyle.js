import { createGlobalStyle } from "styled-components"
import { defalutTheme as Theme } from "./Theme"

import "fonts/font.css"

const GlobalStyle = createGlobalStyle`
    
    body {
        box-sizing: border-box;
        min-width: 280px;
        height: 100vh;
        background-color: ${Theme.colors.white};

        ::-webkit-scrollbar {
            width: 10px;
            height: 10px;
            background: #ffffff;
        }
        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: #ced4da;
            &:hover {
                background-color: #adb5bd;
            }
        }
    }

    button {
        border: 0;
        outline: 0;
    }
    
    * {
        font-family: "nanumsquare";
        box-sizing: inherit;
        margin: 0;
        padding: 0; 
        outline: none;
        text-decoration: none;
        list-style: none;
        color: inherit;
        font-size: inherit;
    }
`

export default GlobalStyle
