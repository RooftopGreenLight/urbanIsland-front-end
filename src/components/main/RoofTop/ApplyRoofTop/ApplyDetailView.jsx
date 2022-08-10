import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyDetailView = () => {
  const [imgBase64, setImgBase64] = useState(null)

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addRoofTopDetailView = e => {
    const file = e.target.files[0]
    setImgBase64(null)
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64Img = reader.result
      const base64Sub = base64Img.toString()
      setImgBase64(base64Sub)
    }
  }

  return (
    <Wrapper>
      <RoofTopDetailViewImg>
        <OptionTitle>
          <h5>옥상 식생 / 조경도 업로드</h5>
          <p>등록하려는 옥상 조경 / 식생 상세도를 업로드 해주세요.</p>
        </OptionTitle>
        <label htmlFor="detailView">
          <FileUploadBtn>사진 업로드</FileUploadBtn>
        </label>
        <input type="file" id="detailView" onChange={addRoofTopDetailView} accept=".png,.jpg" />
        {imgBase64 && <img src={imgBase64} alt="None" style={{ width: "10vw", height: "10vw" }} />}
      </RoofTopDetailViewImg>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 33%;
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

const RoofTopDetailViewImg = styled.div`
  margin: auto;

  #detailView {
    display: none;
  }
`

export default ApplyDetailView
