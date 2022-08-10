import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faComment } from "@fortawesome/free-solid-svg-icons"

const NoticeEmptyChatMessage = () => {
  return (
    <Wrapper>
      <EmptyIcon icon={faComment} />
      <h5>채팅 로그 없음</h5>
      <p>옥상지기님과 메세지를 보내보세요!</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 75%;
      height: 50%;

      margin: auto;
      text-align: center;

      h5 {
        font-size: ${fonts.size.xl};
        margin-bottom: ${margins.sm};
      }

      p {
        font-weight: 100;
      }
    `
  }}
`

const EmptyIcon = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 10%;
      height: 10%;

      margin-bottom: ${margins.xl};
      padding: ${paddings.lg};

      background-color: #000000;
      border-radius: 20vw;

      color: ${colors.white};
    `
  }}
`
export default NoticeEmptyChatMessage