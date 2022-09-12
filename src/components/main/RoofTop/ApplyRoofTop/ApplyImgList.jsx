import styled, { css } from "styled-components"
import { useState } from "react"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const ApplyImgList = ({ applyInfo, changeInfo }) => {
  const [imgBase64, setImgBase64] = useState([])

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addRoofTopImgList = e => {
    const fileList = e.target.files
    if (fileList.length > 0 && fileList.length < 6) {
      setImgBase64([])
      changeInfo(prevInfo => ({
        ...prevInfo,
        normalFile: Array.from(fileList),
        mainFile: fileList[0],
      }))
      Object.values(fileList).forEach(file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          const base64Img = reader.result
          const base64Sub = base64Img.toString()
          setImgBase64(imgBase64 => [...imgBase64, base64Sub])
        }
      })
    }
  }

  const SlickSettings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: imgBase64.length > 2 ? 3 : imgBase64.length,
    slidesToScroll: 1,
  }

  return (
    <Wrapper>
      <div className="title">
        <h5>옥상 사진 업로드</h5>
        <p>등록하려는 옥상 시설 사진을 5장 업로드 해주세요.</p>
      </div>
      <BtnList>
        <label htmlFor="imgList">
          <FileUploadBtn>사진 업로드</FileUploadBtn>
        </label>
        <input
          type="file"
          id="imgList"
          onChange={addRoofTopImgList}
          multiple="multiple"
          accept=".png,.jpg"
        />
      </BtnList>
      <SliderBox>
        <Slider {...SlickSettings}>
          {imgBase64.map((item, idx) => (
            <div key={idx}>
              <img src={item} key={idx} alt="First slide" />
            </div>
          ))}
        </Slider>
      </SliderBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 100%;
      background-color: ${colors.white};
      padding: ${paddings.base};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .title {
        width: 80%;
        margin-bottom: ${margins.sm};
        text-align: left;
      }

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }
    `
  }}
`
const FileUploadBtn = styled.div`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm};

      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      cursor: pointer;

      display: flex;
      align-items: center;
      justify-content: center;

      font-weight: 100;

      &:hover {
        border: 0px;
        background: ${colors.main.tertiary};
        color: ${colors.white};
      }
    `
  }}
`

const SliderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: ${margins.lg} auto 0vw auto;
      width: 90%;

      img {
        width: 10vw;
        height: 10vw;
        overflow: hidden;
      }
    `
  }}
`

const BtnList = styled.div`
  width: 20%;
  display: flex;

  label {
    width: 100%;
    margin-bottom: 0.25rem;
  }

  #imgList {
    display: none;
  }
`

export default ApplyImgList
