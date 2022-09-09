import styled, { css } from "styled-components"

import BaseTemplate from "components/template/BaseTemplate"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons"

const NotFound = () => {
  return (
    <Wrapper>
      <BaseTemplate>
        <NoticeEmptyIcon>
          <FontAwesomeIcon icon={faCircleQuestion} />
          <h5>페이지를 찾을 수 없음.</h5>
          <p>해당 페이지는 존재하지 않습니다.</p>
        </NoticeEmptyIcon>
      </BaseTemplate>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100vw;
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

export default NotFound
