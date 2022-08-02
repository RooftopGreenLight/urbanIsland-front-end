import styled, { css } from "styled-components"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "pages/MainPage"

const Navbar = () => {
  const { authState } = useContext(AuthContext)
  const { authenticated } = authState

  return (
    <Wrapper>
      <LinkElement to="/">Main</LinkElement>
      {authenticated || (
        <>
          <LinkElement to="/login">Login</LinkElement>
          <LinkElement to="/signup">Register</LinkElement>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 40vw;
      height: 3vw;

      margin: 0vw auto;

      display: flex;
      align-items: center;
      justify-content: space-between;

      text-align: center;
      color: ${colors.white};
    `
  }}
`

const LinkElement = styled(Link)`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      font-family: ${fonts.family.detail};
      font-size: ${fonts.size.xsm};

      vertical-align: middle;
      transform: 0.5s all cubic-bezier(0.21, 0.76, 0.81, 0.31);

      &:hover {
        color: ${colors.white};

        &::after {
          border-bottom: 2px solid ${colors.white};
        }
      }

      &::after {
        content: "";
        display: block;
        margin: 0.1vw auto;
        border-bottom: 2px solid ${colors.white};
        width: ${fonts.size.sm};
      }
    `
  }}
`

export default Navbar
