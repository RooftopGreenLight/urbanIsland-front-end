import styled, { css } from "styled-components"
import { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { greenbeeControl } from "api/controls/greenbeeControl"

const OtherGreenbeeInfo = () => {
  const navigate = useNavigate()
  const { memberId } = useParams()
  const [otherGreenbeeInfo, setOtherGreenbeeInfo] = useState({
    addressCity: "",
    addressDetail: "",
    addressDistrict: "",
    content: "",
    greenBeeImages: [],
    officeNumber: "",
  })
  useEffect(() => {
    const loadGreenbeeInfo = async () => {
      try {
        const loadedGreenbeeInfo = await greenbeeControl.getOtherGreenbeeInfo(memberId)
        setOtherGreenbeeInfo(loadedGreenbeeInfo)
      } catch (err) {
        console.log(err.message)
        navigate("/mypage/greenbee/not_exist")
      }
    }
    loadGreenbeeInfo()
  }, [])

  const { addressCity, addressDetail, addressDistrict, content, greenBeeImages, officeNumber } =
    otherGreenbeeInfo

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
      <GreenbeeInfoBox>
        <Title>
          <h5>그린비 정보 안내</h5>
        </Title>
        <GreenbeeInfoLine>
          <div className="info">
            <span>사무소 주소</span>
            <p>
              {otherGreenbeeInfo ? `${addressCity} ${addressDistrict} ${addressDetail}` : `*******`}
            </p>
          </div>
        </GreenbeeInfoLine>
        <GreenbeeInfoLine>
          <div className="info">
            <span>사무소 연락처</span>
            <p>{otherGreenbeeInfo ? officeNumber : "*** - **** - ****"}</p>
          </div>
        </GreenbeeInfoLine>
        <GreenbeeInfoLine>
          <div className="info">
            <span>사무소 소개</span>
            <pre>{otherGreenbeeInfo ? content : "****"}</pre>
          </div>
        </GreenbeeInfoLine>
      </GreenbeeInfoBox>
      <GreenbeeInfoBox>
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
      </GreenbeeInfoBox>
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

export default OtherGreenbeeInfo
