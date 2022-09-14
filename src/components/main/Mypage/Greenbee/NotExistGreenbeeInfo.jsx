import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled, { css } from "styled-components"

const NotExistGreenbeeInfo = () => {
  return (
    <Wrapper>
      <NoticeEmptyIcon>
        <FontAwesomeIcon icon={faCircleQuestion} />
        <h5>그린비 정보 없음</h5>
        <p>해당 ID를 가진 그린비는 존재하지 않습니다.</p>
      </NoticeEmptyIcon>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  margin: auto;

  display: flex;
  flex-direction: column;
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

export default NotExistGreenbeeInfo
