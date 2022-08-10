import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyImgList = () => {
  const [applyImgFile, setApplyImgFile] = useState(null)
  const [imgBase64, setImgBase64] = useState([])

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addRoofTopImgList = e => {
    const fileList = e.target.files
    setImgBase64([])
    setApplyImgFile(fileList)
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

  const addRoofTopDetailView = e => {
    const ImgFile = e.target.files
  }

  return (
    <Wrapper>
      <RoofTopImgList>
        <OptionTitle>
          <h5>옥상 사진 업로드</h5>
          <p>등록하려는 옥상 시설 사진을 5장 업로드 해주세요.</p>
        </OptionTitle>
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
        {imgBase64.map((item, idx) => (
          <img src={item} key={idx} alt="First slide" style={{ width: "10vw", height: "10vw" }} />
        ))}
      </RoofTopImgList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 40%;
  padding: 2.5%;
  margin: auto;

  text-align: center;
  background-color: #ffffff;
`

const OptionTitle = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      margin: auto;

      h5 {
        font-size: ${fonts.size.lg};
      }

      p {
        font-weight: 100;
      }
    `
  }}
`

const FileUploadBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 50%;
      padding: ${paddings.sm};
      margin: 2vw auto;

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

const RoofTopImgList = styled.div`
  margin: auto;

  #imgList {
    display: none;
  }
`

export default ApplyImgList
