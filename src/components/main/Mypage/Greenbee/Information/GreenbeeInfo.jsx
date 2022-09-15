import styled, { css } from "styled-components"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { greenbeeControl } from "api/controls/greenbeeControl"

import { InfomationBox, InfomationLine } from "components/common/Style/Mypage/CommonStyle"
import { faEdit } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const GreenbeeInfo = () => {
  const navigate = useNavigate()
  const [myGreenbeeInfo, setMyGreenbeeInfo] = useState({
    addressCity: "",
    addressDetail: "",
    addressDistrict: "",
    content: "",
    greenBeeImages: [],
    officeNumber: "",
  })
  useEffect(() => {
    const loadGreenbeeInfo = async () => {
      const loadedGreenbeeInfo = await greenbeeControl.getGreenbeeInfo()
      setMyGreenbeeInfo(loadedGreenbeeInfo)
    }
    loadGreenbeeInfo()
  }, [])

  const { addressCity, addressDetail, addressDistrict, content, greenBeeImages, officeNumber } =
    myGreenbeeInfo

  const imgAmount = useMemo(() => greenBeeImages.length ?? 0, [greenBeeImages])

  const SlickSettings = {
    dots: imgAmount > 3,
    infinite: imgAmount > 3,
    lazyLoad: "progressive",
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <Wrapper>
      <InfomationBox>
        <Title>
          <h5>나의 그린비 정보</h5>
        </Title>
        <InfomationLine>
          <div className="info">
            <span>사무소 주소</span>
            <p>
              {myGreenbeeInfo ? `${addressCity} ${addressDistrict} ${addressDetail}` : `*******`}
            </p>
          </div>
        </InfomationLine>
        <InfomationLine>
          <div className="info">
            <span>사무소 연락처</span>
            <p>{myGreenbeeInfo ? officeNumber : "*** - **** - ****"}</p>
          </div>
        </InfomationLine>
        <InfomationLine>
          <div className="info">
            <span>사무소 소개</span>
            <pre>{myGreenbeeInfo ? content : "****"}</pre>
          </div>
        </InfomationLine>
      </InfomationBox>
      <InfomationBox>
        <Title>
          <h5>사무소 대표 사진 목록</h5>
        </Title>
        <SliderBox>
          {greenBeeImages && (
            <Slider {...SlickSettings}>
              {greenBeeImages.map(({ fileUrl }, idx) => (
                <div key={idx}>
                  <img src={fileUrl} alt="Img" key={idx} />
                </div>
              ))}
            </Slider>
          )}
        </SliderBox>
        <ModifyBtn onClick={() => navigate("/mypage/greenbee/edit")}>
          <FontAwesomeIcon icon={faEdit} /> 정보 수정하기
        </ModifyBtn>
      </InfomationBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  margin: 7.5vh auto auto auto;

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

const SliderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 33vw;
      margin: ${margins.lg} auto;

      img {
        width: 10vw;
        height: 10vw;
        overflow: hidden;
      }
    `
  }}
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
