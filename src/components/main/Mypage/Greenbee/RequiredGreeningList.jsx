import styled, { css } from "styled-components"
import { useState, useEffect } from "react"
import { greenbeeControl } from "api/controls/greenbeeControl"

const RequiredGreeningList = () => {
  const [rooftopList, setRooftopList] = useState([])
  const getRooftopInfo = async rooftopId => {
    try {
      const rooftopInfo = await greenbeeControl.getRequiredGreenRooftop(rooftopId)
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    const loadRequiredList = async () => {
      try {
        const reqList = await greenbeeControl.getRequiredGreen()
        console.log(reqList)
        setRooftopList(reqList)
      } catch (err) {
        console.log(err)
      }
    }
    loadRequiredList()
  }, [])

  return (
    <Wrapper>
      <GridRoofTopList>
        {rooftopList.map(({ city, detail, district, mainImage, width, widthPrice, id }, idx) => (
          <RoofTopInfo fileUrl={mainImage.fileUrl} key={idx} onClick={() => getRooftopInfo(id)}>
            <p>{`${width} m2 ${widthPrice} 원 / m2`}</p>
            <h5>{`${city} ${detail} ${district}`}</h5>
          </RoofTopInfo>
        ))}
      </GridRoofTopList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 55vw;
  height: 75vh;

  margin: auto;
  display: flex;
  flex-direction: column;
`

const GridRoofTopList = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`

const RoofTopInfo = styled.div`
  ${({ theme, fileUrl }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 100%;
      height: 100%;

      padding: ${paddings.sm};

      display: flex;
      flex-direction: column-reverse;

      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25)), url(${fileUrl});
      background-size: cover;

      color: ${colors.white};
    `
  }}
`

export default RequiredGreeningList
