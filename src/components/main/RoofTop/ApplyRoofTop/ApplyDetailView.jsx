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
    changeInfo({ ...applyInfo, structFile: null })
  }

  return (
    <Wrapper>
      <Title>
        <h5>옥상 식생 / 조경도 업로드</h5>
        <p>등록하려는 옥상 조경 / 식생 상세도를 업로드 해주세요.</p>
      </Title>
      <Content>
        <label htmlFor="detailView">
          <FileUploadBtn>사진 업로드</FileUploadBtn>
        </label>
        {imgBase64 && <img src={imgBase64} alt="None" onClick={removeStructImg} />}
        <input type="file" id="detailView" onChange={addRoofTopDetailView} accept=".png,.jpg" />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 90%;
  padding: 1rem;
  margin: 1vw auto;

  text-align: center;
  background-color: #ffffff;
`

const Title = styled.div`
  ${({ theme }) => {
    const { fonts } = theme
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
    const { paddings } = theme
    return css`
      width: 5vw;
      padding: ${paddings.sm};
      margin: 1vw auto;

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

const Content = styled.div`
  width: 60%;
  margin: 1vw auto 0vw;

  display: flex;
  justify-content: space-evenly;

  label {
    width: 100%;
    margin: auto;
  }

  img {
    width: 10vw;
    height: 10vw;
    object-fit: cover;
  }

  #detailView {
    display: none;
  }
`

export default ApplyDetailView
