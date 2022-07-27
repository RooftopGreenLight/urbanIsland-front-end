import React from "react"
import styled from "styled-components"
import "fonts/font.css"

const BoxWrapper = styled.input`
  color: black;
  background-color: white;
  border: 2px solid #000000;
  border-radius: 10px;
  width: 400px;
  height: 40px;
  padding: 0px 4px;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 5px;
  font-family: "gmarketsans";
`
const InputBox = ({ ...data }) => {
  return <BoxWrapper {...data} />
}
export default InputBox
