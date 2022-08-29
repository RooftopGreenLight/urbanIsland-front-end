import styled, { css } from "styled-components"
import { useEffect, useState } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { greenbeeControl } from "api/controls/greenbeeControl"

const GreenbeeInfo = () => {
  const [myGreenbeeInfo, setMyGreenbeeInfo] = useState({})
  const { addressCity, addressDetail, addressDistrict, content, greenBeeImages, officeNumber } =
    myGreenbeeInfo
  useEffect(() => {
    const loadGreenbeeInfo = async () => {
      const loadedGreenbeeInfo = await greenbeeControl.getGreenbeeInfo()
      setMyGreenbeeInfo(loadedGreenbeeInfo)
    }
    loadGreenbeeInfo()
  }, [])

  const settings = {
    arrow: false,
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  return (
    <Wrapper>
      <OptionBox boxSize="lg">
        <h5>사무소 대표 사진</h5>
        <p>해당 사무소의 소개 사진입니다.</p>
        {greenBeeImages && (
          <Slider {...settings}>
            {greenBeeImages.map((elm, idx) => (
              <div key={elm}>
                <img src={elm.fileUrl} alt="Img" key={idx} />
              </div>
            ))}
          </Slider>
        )}
      </OptionBox>
      <OptionBox boxSize="base">
        <h5>사무소 주소</h5>
        <p>해당 사무소의 주소입니다.</p>
        <span>{`${addressCity} ${addressDistrict} ${addressDetail}`}</span>
      </OptionBox>
      <OptionBox boxSize="base">
        <h5>사무소 연락처</h5>
        <p>해당 사무소의 연락처입니다.</p>
        <span>{officeNumber}</span>
      </OptionBox>
      <OptionBox boxSize="lg">
        <h5>사무소 소개</h5>
        <p>해당 사무소의 소개글입니다.</p>
        <span>{content}</span>
      </OptionBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;

  margin: auto;
  padding: 1rem;

  display: flex;
  flex-wrap: wrap;

  background-color: #d3d3d3;
  text-align: center;
`

const OptionBox = styled.div`
  ${({ theme, boxSize }) => {
    const boxWidth = new Map([
      ["sm", "20%"],
      ["base", "40%"],
      ["lg", "90%"],
    ])
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: ${boxWidth.get(boxSize)};
      margin: 1vw auto;
      background-color: ${colors.white};
      padding: ${paddings.base};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        margin-bottom: ${margins.sm};
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      span {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      img {
        width: 50%;

        background-size: cover;
        object-fit: cover;

        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`

export default GreenbeeInfo
