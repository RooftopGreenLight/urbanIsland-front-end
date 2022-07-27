import styled, { css } from "styled-components"
import { useContext } from "react"
import { Link } from "react-router-dom"

import { AuthContext } from "pages/MainPage"

const Navbar = () => {
  const { authState } = useContext(AuthContext)
  const { authenticated } = authState
  return (
    <NavbarLayout>
      <LinkElement to="/">Main</LinkElement>
      {authenticated || (
        <>
          <LinkElement to="/login">Login</LinkElement>
          <LinkElement to="/signup">Register</LinkElement>
        </>
      )}
    </NavbarLayout>
  )
}

const NavbarLayout = styled.ul`
  width: 50vw;
  height: 3vw;

  margin: 0vw auto;

  display: flex;
  align-items: center;
  justify-content: space-between;

  text-align: center;
`

const LinkElement = styled(Link)`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      color: ${colors.blue.tertiary};
      font-family: ${fonts.family.detail};
      font-size: ${fonts.size.sm};

      vertical-align: middle;
      transform: 0.5s all cubic-bezier(0.21, 0.76, 0.81, 0.31);

      &:hover {
        color: ${colors.blue.tertiary};

        &::after {
          border-bottom: 2px solid ${colors.blue.tertiary};
        }
      }

      &::after {
        content: "";
        display: block;
        margin: auto;
        border-bottom: 2px solid ${colors.blue.tertiary};
        width: ${fonts.size.sm};
      }
    `
  }}
`

export default Navbar
