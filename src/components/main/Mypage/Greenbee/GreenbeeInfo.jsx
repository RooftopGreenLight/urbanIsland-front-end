import styled, { css } from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { greenbeeControl } from "api/controls/greenbeeControl"

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

  const moveToEditPage = () => {
    navigate("/mypage/greenbee/info/edit")
  }

  const { addressCity, addressDetail, addressDistrict, content, greenBeeImages, officeNumber } =
    myGreenbeeInfo

  return (
    <Wrapper>
      <OptionBox boxSize="lg">
        <h5>사무소 대표 사진</h5>
        <p>해당 사무소의 소개 사진입니다.</p>
        {greenBeeImages && (
          <div className="img-list">
            {greenBeeImages.map((elm, idx) => (
              <img src={elm.fileUrl} alt="Img" key={idx} />
            ))}
          </div>
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
      <ModifyBtn onClick={moveToEditPage}>정보 수정하기</ModifyBtn>
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

      .img-list {
        width: 90%;
        display: flex;
        justify-content: space-around;
      }

      img {
        width: 20%;

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

export default GreenbeeInfo
