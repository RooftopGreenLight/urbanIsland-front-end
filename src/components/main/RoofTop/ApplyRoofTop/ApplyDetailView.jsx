import styled, { css } from "styled-components"
import { useState } from "react"

const ApplyDetailView = ({ applyInfo, changeInfo }) => {
  const [imgBase64, setImgBase64] = useState(null)

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addRoofTopDetailView = e => {
    const file = e.target.files[0]
    changeInfo({ ...applyInfo, structureFile: file })
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const base64Img = reader.result
      const base64Sub = base64Img.toString()
      setImgBase64(base64Sub)
    }
  }

  const removeStructImg = () => {
    setImgBase64(null)
    changeInfo({ ...applyInfo, structureFile: null })
  }

  return (
    <Wrapper>
      <div className="title">
        <h5>옥상 식생 / 조경도 업로드</h5>
        <p>등록하려는 옥상 조경 / 식생 상세도를 업로드 해주세요.</p>
      </div>
      <BtnList>
        <label htmlFor="detailView">
          <FileUploadBtn>사진 업로드</FileUploadBtn>
        </label>
        <input type="file" id="detailView" onChange={addRoofTopDetailView} accept=".png,.jpg" />
      </BtnList>
      {imgBase64 && <img src={imgBase64} alt="None" onClick={removeStructImg} />}
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

      img {
        width: 80%;
        margin: ${margins.lg} auto 0vw auto;
      }
    `
  }}
`

const FileUploadBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings } = theme
    return css`
      height: 70%;
      padding: ${paddings.sm};

      border-radius: ${fonts.size.xsm};
      background-color: ${colors.main.secondary};

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

const BtnList = styled.div`
  display: flex;

  label {
    width: 100%;
    margin-bottom: 0.25rem;
  }

  #detailView {
    display: none;
  }
`

export default ApplyDetailView
