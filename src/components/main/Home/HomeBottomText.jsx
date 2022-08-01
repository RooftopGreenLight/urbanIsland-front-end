import styled, { css } from "styled-components"

import { fadeIn } from "styles/Animation"

const HomeBottomText = () => {
  return (
    <Wrapper>
      <h5>Soil Bank.</h5>
      <p>옥상녹화는 투수면적을 늘림으로 도시 홍수를 막을 수 있습니다.</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 23.5%;
      margin: ${margins.xl} auto;

      color: ${colors.white};
      opacity: 0%;

      animation: ${fadeIn} 2s 1s;
      animation-fill-mode: forwards;

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        font-weight: 100;
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default HomeBottomText
