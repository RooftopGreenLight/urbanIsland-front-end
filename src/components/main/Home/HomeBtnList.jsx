import styled, { css } from "styled-components"
import { useRecoilValue } from "recoil"
import { Link } from "react-router-dom"

import { AuthCheckLogin } from "module/Auth"
import { leftToRight } from "styles/Animation"
import { accountControl } from "api/controls/accountControl"

const HomeBtnList = () => {
  const authenticated = useRecoilValue(AuthCheckLogin)

  return (
    <Wrapper>
      <HomeBtn to="/reservation" delay={0}>
        옥상시설 예약
      </HomeBtn>
      <HomeBtn to="/" delay={1}>
        서비스 소개
      </HomeBtn>
      <HomeBtn to="/" delay={2}>
        녹색공모 조회
      </HomeBtn>
      {authenticated ? (
        <>
          <HomeBtn to="/mypage/profile" delay={3}>
            마이페이지
          </HomeBtn>
          <HomeBtn to="/" delay={4} onClick={accountControl.deleteLogOut}>
            로그아웃
          </HomeBtn>
        </>
      ) : (
        <HomeBtn to="/login" delay={3}>
          로그인
        </HomeBtn>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 12.5vw;
  height: 10vw;
  margin: 5vh 0vw;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`

const HomeBtn = styled(Link)`
  ${({ theme, delay }) => {
    const { colors, fonts } = theme
    return css`
      width: 100%;
      height: 2.75vw;

      margin: 0.25rem auto 0vw 3rem;
      opacity: 0%;

      border: 0;
      background-color: transparent;

      color: ${colors.white};
      font-size: 1.25rem;
      font-weight: 100;
      mix-blend-mode: screen;

      transition: 0.15s font-weight ease-in-out;
      animation: ${leftToRight} 2s 0.25s;
      animation-fill-mode: forwards;
      animation-delay: ${`${delay * 0.2}s`};

      &:hover {
        font-weight: 400;
        text-shadow: 0 0 3px #fff;
      }
    `
  }}
`

export default HomeBtnList
