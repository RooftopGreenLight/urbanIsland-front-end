import styled, { css } from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { greenbeeControl } from "api/controls/greenbeeControl"

const GreenbeeInfoEdit = () => {
  const navigate = useNavigate()
  const [currentInfo, setCurrentInfo] = useState({
    addressCity: "",
    addressDetail: "",
    addressDistrict: "",
    content: "",
    greenBeeImages: [],
    officeNumber: "",
  })
  useEffect(() => {
    const loadCurrentInfo = async () => {
      const loadedGreenbeeInfo = await greenbeeControl.getGreenbeeInfo()
      setCurrentInfo(loadedGreenbeeInfo)
    }
    loadCurrentInfo()
  }, [])

  const changeInput = e => {
    const { name, value } = e.target
    setCurrentInfo({ ...currentInfo, [name]: value })
  }

  const confirmSaveInfo = async () => {
    const modifiedData = new FormData()
    for (const [option, value] of Object.entries(currentInfo)) {
      // 배열의 경우 append를 통해 같은 옵션에 값을 추가해주어야 함
      if (Array.isArray(value)) {
        for (let idx = 0; idx < value.length; idx++) {
          modifiedData.append(option, value[idx])
        }
        continue
      }
      // 배열이 아닌 경우에는 그냥 값을 추가해주면 됨.
      modifiedData.append(option, value)
    }
    try {
      await greenbeeControl.postGreenbeeModifiedInfo(modifiedData)
      navigate("/mypage/greenbee/info")
    } catch (err) {
      console.log(err.message)
    }
  }

  const { addressCity, addressDetail, addressDistrict, content, greenBeeImages, officeNumber } =
    currentInfo

  const sliderSettings = {
    arrow: false,
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  return (
    <Wrapper>
      <InputBox boxSize="lg">
        <h5>사무소 대표 사진</h5>
        <p>해당 사무소의 소개 사진입니다.</p>
        {greenBeeImages && (
          <Slider {...sliderSettings}>
            {greenBeeImages.map((elm, idx) => (
              <div key={elm}>
                <img src={elm.fileUrl} alt="Img" key={idx} />
              </div>
            ))}
          </Slider>
        )}
      </InputBox>
      <InputBox boxSize="base">
        <h5>사무소 주소</h5>
        <p>해당 사무소의 주소입니다.</p>
        <span>{`${addressCity} ${addressDistrict} ${addressDetail}`}</span>
      </InputBox>
      <InputBox boxSize="base">
        <h5>사무소 연락처</h5>
        <p>해당 사무소의 연락처입니다.</p>
        <input name="officeNumber" value={officeNumber} onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="lg">
        <h5>사무소 소개</h5>
        <p>해당 사무소의 소개글입니다.</p>
        <input name="content" value={content} onChange={changeInput} />
      </InputBox>
      <ModifyBtn onClick={confirmSaveInfo}>수정 사항 적용하기</ModifyBtn>
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

const InputBox = styled.div`
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
        font-weight: ${fonts.weight.light};
      }

      input,
      textarea {
        width: 100%;
        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;

        font-weight: ${fonts.weight.light};
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

const ModifyBtn = styled.button`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      width: 30%;
      padding: ${paddings.sm};
      margin: 0.75vw auto 0.25vw auto;

      border: 1px solid rgb(77, 77, 77);
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        background: rgb(77, 77, 77);
        color: #fff;
      }
    `
  }}
`

export default GreenbeeInfoEdit
