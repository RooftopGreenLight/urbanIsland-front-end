import { KakaoPayControl } from "api/KakaoPay"
import { useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import styled, { css } from "styled-components"

const PaymentSuccess = () => {
  const { rooftopId } = useParams()
  const [searchParam] = useSearchParams()
  const navigate = useNavigate()
  useEffect(() => {
    const approvePayment = async () => {
      const pg_token = searchParam.get("pg_token")
      const tid = localStorage.getItem("tid")
      const paymentInfo = JSON.parse(localStorage.getItem("payment_information"))
      try {
        const res = await KakaoPayControl.postApprovePayment(tid, pg_token)
        console.log(res)
        console.log(paymentInfo)
        localStorage.removeItem("tid")
        localStorage.removeItem("payment_information")
        navigate("/mypage/profile")
      } catch (err) {
        console.log(err.message)
      }
    }
    setTimeout(() => approvePayment(), 1000)
  }, [])
  return (
    <Wrapper>
      <h5>결제 성공 테스트 페이지 {`옥상 넘버 : ${rooftopId} 번`}</h5>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  max-height: 80vh;
  margin: auto;
`

export default PaymentSuccess
