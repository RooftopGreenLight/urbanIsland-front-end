import styled, { css } from "styled-components"
import { useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"

const NotFound = () => {
  const navigate = useNavigate()
  return (
    <Wrapper>
      <NoticeEmptyIcon>
        <FontAwesomeIcon icon={faCircleQuestion} />
        <h5>404 Not Found</h5>
        <p>해당 페이지는 존재하지 않습니다.</p>
        <HomeBtn onClick={() => navigate("/")}>메인 페이지로 돌아가기</HomeBtn>
      </NoticeEmptyIcon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`

const NoticeEmptyIcon = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: auto;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        font-size: ${fonts.size.xl};
        margin-bottom: ${margins.sm};
      }

      p {
        font-size: ${fonts.size.sm};
        font-weight: 100;
      }

      svg {
        width: 5vw;
        height: 5vw;

        margin-bottom: ${margins.lg};
        padding: ${paddings.xl};

        background-color: ${colors.main.secondary};
        border-radius: 20vw;

        color: ${colors.white};
      }
    `
  }}
`

const HomeBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 20vw;
      padding: ${paddings.sm} ${paddings.lg};
      margin: ${margins.lg} auto;

      border-radius: 5rem;
      background: ${colors.main.secondary};
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      color: ${colors.white};
      font-size: ${fonts.size.sm};
      font-weight: bold;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

export default NotFound
