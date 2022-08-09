import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHourglassEmpty } from "@fortawesome/free-solid-svg-icons"

const NoticeEmptyChatRoom = () => {
  return (
    <Wrapper>
      <EmptyIcon icon={faHourglassEmpty} />
      <h5>개설된 채팅방 없음</h5>
      <p>새로운 채팅방을 개설하시면 목록이 나옵니다.</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 75%;
      height: 50%;

      margin: ${margins.xl} auto;
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
      padding: ${paddings.lg} ${paddings.xl};

      background-color: #000000;
      border-radius: 20vw;

      color: ${colors.white};
    `
  }}
`
export default NoticeEmptyChatRoom
