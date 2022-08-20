import { useContext, useState, useRef, useEffect } from "react"
import styled, { css } from "styled-components"
import { modalShow } from "styles/Animation"
import { ModalContext } from "module/Modal"
import { SidoGunguList } from "constants/SidoGunguList"
const BoxWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const Box = styled.div`
  text-align: center;
  width: 50%;
  margin: 0.1rem;
`
const Line = styled.div`
  padding: 0.1rem;
`
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.3rem;
  span {
    font-weight: bold;
    font-size: 1.2rem;
  }
  button {
    border: 1px solid black;
    padding: 0.2rem;
    border-radius: 0.3rem;
    background-color: white;
  }
`
const RegionFilterModal = ({ setCitys, setDistricts }) => {
  const { closeModal } = useContext(ModalContext)
  const ref = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [ref])

  const clear = e => {
    setSido("")
    setGungu("")
    setCitys("")
    setDistricts("")
  }

  const [sido, setSido] = useState("")
  const [gungu, setGungu] = useState("")
  const onClickSido = d => {
    setSido(d)
    setCitys(d)
  }
  const onClickGungu = d => {
    setGungu(d)
    setDistricts(d)
    closeModal()
  }
  return (
    <Wrapper ref={ref}>
      <ModalContent>
        <Title>
          <span>지역선택</span>
          <button onClick={clear}>초기화</button>
        </Title>
        <BoxWrapper>
          <Box>
            {Array.from(SidoGunguList.keys()).map(d => (
              <Line onClick={() => onClickSido(d)}>{d}</Line>
            ))}
          </Box>
          {sido && (
            <Box>
              {SidoGunguList.get(sido).map(d => (
                <Line onClick={() => onClickGungu(d)}>{d}</Line>
              ))}
            </Box>
          )}
        </BoxWrapper>
      </ModalContent>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 30%;
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
      text-align: center;
    `
  }}
`

export default RegionFilterModal
