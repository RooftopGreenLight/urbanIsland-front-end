import styled, { css } from "styled-components"
import { useState, useContext, useEffect } from "react"
import { Link } from "react-router-dom"

import { AuthStateContext } from "module/Auth"
import { accountControl } from "api/accountControl"

const Navbar = () => {
  const authState = useContext(AuthStateContext)
  const [isLogin, setLogin] = useState(false)
  useEffect(() => {
    setLogin(authState.authenticated)
  }, [authState])
  return (
    <NavbarLayout>
      <LinkElement to="/">Main</LinkElement>
      {!isLogin ? (
        <>
          <LinkElement to="/login">Login</LinkElement>
          <LinkElement to="/signup">Register</LinkElement>
        </>
      ) : (
        <>
          <LinkElement to="/mypage">MyPage</LinkElement>
          <LinkElement replace={true} to="/" onClick={accountControl.getLogOut}>
            Log Out
          </LinkElement>
        </>
      )}
    </NavbarLayout>
  )
}

const NavbarLayout = styled.ul`
  ${({ theme }) => {
    return css`
      width: 40vw;
      height: 3vw;

      margin: 0vw auto;

      display: flex;
      align-items: center;
      justify-content: space-between;

      text-align: center;
      color: ${theme.colors.white};
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
