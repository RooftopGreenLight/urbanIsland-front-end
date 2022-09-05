import { useParams } from "react-router-dom"
import styled, { css } from "styled-components"

const PaymentFailure = () => {
  const { rooftopId } = useParams()
  return (
    <Wrapper>
      <h5>결제 실패 테스트 페이지 {rooftopId}</h5>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  max-height: 80vh;
  margin: auto;
`

export default PaymentFailure
