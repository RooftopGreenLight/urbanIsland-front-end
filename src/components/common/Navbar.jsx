import styled, { css } from "styled-components"
import { useResetRecoilState, useRecoilValue } from "recoil"
import { Link } from "react-router-dom"

import { AuthCheckLogin, AuthState } from "module/Auth"
import { accountControl } from "api/controls/accountControl"

const Navbar = () => {
  const resetAuthState = useResetRecoilState(AuthState)
  const authenticated = useRecoilValue(AuthCheckLogin)

  const logOut = async () => {
    accountControl.getLogOut()
    resetAuthState()
  }

  return (
    <Wrapper>
      <LinkElement to="/">Main</LinkElement>
      {!authenticated ? (
        <>
          <LinkElement to="/login">Login</LinkElement>
          <LinkElement to="/signup">Register</LinkElement>
        </>
      ) : (
        <>
          <LinkElement to="/login">Mypage</LinkElement>
          <LinkElement to="/" onClick={logOut}>
            Logout
          </LinkElement>
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  ${({ theme }) => {
    const { colors } = theme
    return css`
      width: 20vw;
      height: 3vw;

      margin: 0vw auto;

      display: flex;
      align-items: center;
      justify-content: space-evenly;

      text-align: center;
      color: ${colors.main.primary};
    `
  }}
`

const LinkElement = styled(Link)`
  ${({ theme }) => {
    const { colors, fonts } = theme
    return css`
      font-family: ${fonts.family.detail};
      font-size: ${fonts.size.sm};

      vertical-align: middle;
      transform: 0.5s all cubic-bezier(0.21, 0.76, 0.81, 0.31);

      &:hover {
        color: ${colors.main.secondary};

        &::after {
          border-bottom: 2px solid ${colors.main.secondary};
        }
      }

      &::after {
        content: "";
        display: block;
        margin: 0.1vw auto;
        border-bottom: 2px solid ${colors.main.primary};
        width: ${fonts.size.sm};
      }
    `
  }}
`

export default Navbar
