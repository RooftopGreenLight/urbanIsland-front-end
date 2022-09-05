import styled, { css } from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { greenbeeControl } from "api/controls/greenbeeControl"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const GreenbeeInfo = () => {
  const navigate = useNavigate()
  const [myGreenbeeInfo, setMyGreenbeeInfo] = useState({})
  useEffect(() => {
    const loadGreenbeeInfo = async () => {
      const loadedGreenbeeInfo = await greenbeeControl.getGreenbeeInfo()
      setMyGreenbeeInfo(loadedGreenbeeInfo)
    }
    loadGreenbeeInfo()
  }, [])

  const SlickSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  const { addressCity, addressDetail, addressDistrict, content, greenBeeImages, officeNumber } =
    myGreenbeeInfo

  console.log(greenBeeImages)

  return (
    <Wrapper>
      <GreenbeeInfoBox>
        <Title>
          <h5>나의 그린비 정보</h5>
        </Title>
        <GreenbeeInfoLine>
          <div className="info">
            <span>사무소 주소</span>
            <p>
              {myGreenbeeInfo ? `${addressCity} ${addressDistrict} ${addressDetail}` : `*******`}
            </p>
          </div>
        </GreenbeeInfoLine>
        <GreenbeeInfoLine>
          <div className="info">
            <span>사무소 연락처</span>
            <p>{myGreenbeeInfo ? officeNumber : "*** - **** - ****"}</p>
          </div>
        </GreenbeeInfoLine>
        <GreenbeeInfoLine>
          <div className="info">
            <span>사무소 소개</span>
            <pre>{myGreenbeeInfo ? content : "****"}</pre>
          </div>
        </GreenbeeInfoLine>
      </GreenbeeInfoBox>
      <GreenbeeInfoBox>
        <Title>
          <h5>사무소 대표 사진 목록</h5>
        </Title>
        <SliderBox>
          <Slider {...SlickSettings}>
            {[...Array(4).keys()].map(idx => (
              <div>
                {greenBeeImages && greenBeeImages.length > idx ? (
                  <img src={greenBeeImages[idx].fileUrl} alt="Img" key={idx} />
                ) : (
                  <Rectangle />
                )}
              </div>
            ))}
          </Slider>
        </SliderBox>
        <ModifyBtn onClick={() => navigate("/mypage/greenbee/edit")}>
          <FontAwesomeIcon icon={faEdit} /> 정보 수정하기
        </ModifyBtn>
      </GreenbeeInfoBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  height: 75vh;
  margin: auto;

  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm} ${paddings.base};
      margin-bottom: ${margins.sm};

      display: flex;
      border-bottom: 1px solid ${colors.main.primary}77;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        width: 90%;

        font-size: ${fonts.size.base};
        font-weight: ${fonts.weight.bold};
        text-align: left;
      }
    `
  }}
`

const GreenbeeInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5vh;
`

const GreenbeeInfoLine = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};

      .info {
        width: 90%;
      }

      span {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      p,
      pre {
        margin: ${margins.xsm} 0vw;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }
    `
  }}
`

const SliderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: ${margins.lg} auto;
      width: 90%;

      img {
        width: 10vw;
        height: 10vw;
        overflow: hidden;
      }
    `
  }}
`

const Rectangle = styled.div`
  width: 10vw;
  height: 10vw;
  overflow: hidden;
  background: linear-gradient(to top, grey, #d4d4d4);
`

const ModifyBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.base} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${colors.main.primary};

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};

      svg {
        margin: auto ${margins.sm} auto 0vw;
      }

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`
export default GreenbeeInfo
