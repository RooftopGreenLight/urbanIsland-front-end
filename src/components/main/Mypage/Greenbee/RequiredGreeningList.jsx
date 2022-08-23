import styled, { css } from "styled-components"
import { useState, useEffect } from "react"
import { greenbeeControl } from "api/controls/greenbeeControl"

const RequiredGreeningList = () => {
  const [rooftopList, setRooftopList] = useState([])
  useEffect(() => {
    const loadRequiredList = async () => {
      try {
        const reqList = await greenbeeControl.getRequiredGreen()
        console.log(reqList[0].mainImage.fileUrl)
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
        {rooftopList.map(({ city, detail, district, mainImage, width, widthPrice }, idx) => (
          <RoofTopInfo fileUrl={mainImage.fileUrl} key={idx}>
            <p>{`${width} m2 ${widthPrice} / m2`}</p>
            <h5>{`${city} ${detail} ${district}`}</h5>
          </RoofTopInfo>
        ))}
      </GridRoofTopList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
`

const GridRoofTopList = styled.div`
  width: 80%;
  height: 80%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`

const RoofTopInfo = styled.div`
  ${({ theme, fileUrl }) => {
    const { fonts, margins, paddings } = theme
    return css`
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column-reverse;

      background-image: url(${fileUrl});
      background-size: cover;
    `
  }}
`

export default RequiredGreeningList
