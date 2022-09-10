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
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 75%;
      padding: ${paddings.xl} 0vw;

      margin: auto;
      text-align: center;

      color: ${colors.main.primary};

      h5 {
        font-size: ${fonts.size.xl};
        margin-bottom: ${margins.xsm};
      }

      p {
        font-weight: 100;
      }
    `
  }}
`

const EmptyIcon = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, margins, paddings } = theme
    return css`
      width: 12.5%;
      height: 12.5%;

      margin-bottom: ${margins.base};
      padding: ${paddings.lg};

      background-color: ${colors.main.primary};
      border-radius: 15vw;

      color: ${colors.white};
    `
  }}
`
export default NoticeEmptyChatMessage
