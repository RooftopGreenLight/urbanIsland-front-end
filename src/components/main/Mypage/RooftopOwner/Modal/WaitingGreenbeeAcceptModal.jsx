import { useContext } from "react"
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"

const WaitingGreenbeeAcceptModal = () => {
  const { closeModal } = useContext(ModalContext)

  const sampleData = [
    {
      companyinformation: "A 건축사무소",
      number: "010-xxxx-xxxx",
    },
  ]
  return (
    <Wrapper>
      <header>
        <ModalCloseBtn onClick={closeModal}>
          <FontAwesomeIcon icon={faXmark} />
        </ModalCloseBtn>
      </header>
      <ModalContent>
        <p>그린비 대기상황</p>
        <h1>"서울시 은평구 주소주소 옥상"</h1>
        <button onClick={() => alert("녹화 종료")}>녹화 종료</button>
        {sampleData.map(d => {
          return (
            <>
              <Box>
                <span>{d.companyinformation}</span>
                <span>건축사무소 구경하기</span>
                <div>건축사무소 연락처:{d.number}</div>
              </Box>
            </>
          )
        })}
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 50%;
      margin: auto;

      border-radius: 0.3rem;
      background-color: #fff;

      animation: ${modalShow} 0.3s;
      animation-fill-mode: forwards;
      overflow: hidden;
      header {
        display: flex;
        flex-direction: row-reverse;

        padding: ${paddings.sm} ${paddings.base};
        background-color: #f1f1f1;
        font-weight: 700;
      }
    `
  }}
`
const Box = styled.div`
  background-color: grey;
  border-radius: 5%;
  padding: 1rem;
  margin-top: 1rem;
`

const ModalCloseBtn = styled.button`
  ${({ theme }) => {
    const { fonts } = theme
    return css`
      margin: 0vw 0vw 0vw auto

      color: #999;
      background-color: transparent;

      font-size: ${fonts.size.xsm};
      font-weight: 700;
      text-align: center;
    `
  }}
`

const ModalContent = styled.main`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      flex-direction: column;
      justify-content: center;

      padding: ${paddings.sm};
      border-top: 1px solid #dee2e6;
      background-color: ${colors.white};

      button {
        width: 20%;
        background-color: #000000;
        border-radius: 25px;
        text-align: center;
        color: ${colors.white};
        font-size: ${fonts.size.xsm};
      }
    `
  }}
`

export default WaitingGreenbeeAcceptModal
