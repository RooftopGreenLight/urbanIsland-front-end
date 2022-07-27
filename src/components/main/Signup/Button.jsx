import React from "react"
import styled from "styled-components"

const ButtonWrapper = styled.button`
  color: gray;
  background-color: black;
  border: 2px solid #000000;
  border-radius: 10px;
  width: 400px;
  height: 40px;
  padding: 0px 4px;
  font-size: 17px;
  font-weight: 500;
  text-align: center;
`
const Button = ({ ...data }) => {
  return <ButtonWrapper onClick={data.onClick}>{data.name}</ButtonWrapper>
}
export default Button
