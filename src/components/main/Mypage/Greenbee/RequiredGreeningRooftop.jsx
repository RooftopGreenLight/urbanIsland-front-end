import styled, { css } from "styled-components"
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { greenbeeControl } from "api/controls/greenbeeControl"

const RequiredGreeningRooftop = () => {
  const { rooftopId } = useParams()
  const [rooftopInfo, setRooftopInfo] = useState([])
  useEffect(() => {
    const loadRooftopInfo = async () => {
      try {
        const loadedRooftopInfo = await greenbeeControl.getRequiredGreenRooftop(rooftopId)
        setRooftopInfo(loadedRooftopInfo)
      } catch (err) {
        console.log(err)
      }
    }
    loadRooftopInfo()
  }, [])

  return (
    <Wrapper>
      <p>{rooftopInfo}</p>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 75vh;
  height: 75vh;

  margin: auto;
  display: flex;
  flex-direction: column;
`

const GridRoofTopList = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`

const RoofTopInfo = styled.div`
  ${({ theme, fileUrl }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 100%;
      height: 100%;

      padding: ${paddings.sm};

      display: flex;
      flex-direction: column;

      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25)), url(${fileUrl});
      background-size: cover;

      color: ${colors.white};

      .width-price {
        display: flex;
        justify-content: space-between;
      }

      h5 {
        font-size: ${fonts.size.sm};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.normal};
      }

      span {
        font-size: ${fonts.size.xxsm};
        font-weight: ${fonts.weight.light};
      }
    `
  }}
`

export default RequiredGreeningRooftop
