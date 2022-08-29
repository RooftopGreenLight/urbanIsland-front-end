import styled, { css } from "styled-components"
import { useState, useEffect } from "react"

import { greenbeeControl } from "api/controls/greenbeeControl"
import { useNavigate } from "react-router-dom"

const RequiredGreeningList = () => {
  const navigate = useNavigate()
  const [rooftopList, setRooftopList] = useState([])
  useEffect(() => {
    const loadRequiredList = async () => {
      try {
        const reqList = await greenbeeControl.getRequiredGreen()
        setRooftopList(reqList)
      } catch (err) {
        console.log(err)
      }
    }
    loadRequiredList()
  }, [])

  return (
    <Wrapper>
      <Title>
        <h5>옥상 녹화 필요 시설 목록</h5>
        <p>그린비의 손길이 필요한 시설 목록입니다.</p>
      </Title>

      <GridRoofTopList>
        {rooftopList.map(({ city, detail, district, mainImage, width, widthPrice, id }, idx) => (
          <RoofTopInfo
            fileUrl={mainImage.fileUrl}
            key={idx}
            onClick={() => navigate(`/mypage/required-greening/${id}`)}>
            <h5>{`${city} ${district}`}</h5>
            <p>{detail}</p>
            <div className="width-price">
              <span>{`${width} m2`}</span>
              <span> {`${widthPrice} 원 / m2`}</span>
            </div>
          </RoofTopInfo>
        ))}
      </GridRoofTopList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 75vh;
  height: 75vh;

  margin: auto;
  display: flex;
  flex-direction: column;

  text-align: center;
`

const Title = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      margin: 1vw auto;
      background-color: ${colors.white};
      padding: ${paddings.base};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }
    `
  }}
`

const GridRoofTopList = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-gap: 10px 10px;
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
      text-align: left;

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

export default RequiredGreeningList
