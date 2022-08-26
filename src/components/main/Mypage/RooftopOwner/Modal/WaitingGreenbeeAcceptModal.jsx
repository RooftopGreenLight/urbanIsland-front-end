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
      <ModalHeader>
        <h5>그린비 대기상황</h5>
        <ModalCloseBtn icon={faXmark} onClick={closeModal} />
      </ModalHeader>
      <ModalContent>
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
  width: 50%;
  margin: auto;

  border-radius: 0.3rem;
  background-color: #fff;

  animation: ${modalShow} 0.3s;
  animation-fill-mode: forwards;
  overflow: hidden;
`
const Box = styled.div`
  background-color: grey;
  border-radius: 5%;
  padding: 1rem;
  margin-top: 1rem;
`
const ModalHeader = styled.header`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.base};

      background-color: #000000;

      display: flex;
      justify-content: space-between;

      h5 {
        color: ${colors.white};
        font-size: ${fonts.size.base};
        text-align: center;
        vertical-align: center;
      }
    `
  }}
`

const ModalCloseBtn = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      padding: ${paddings.sm};
      color: ${colors.white};
      font-size: ${fonts.size.xsm};

      cursor: pointer;
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
