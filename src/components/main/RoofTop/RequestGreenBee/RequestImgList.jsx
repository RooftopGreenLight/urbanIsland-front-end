import styled, { css } from "styled-components"
import { useState } from "react"

const RequestImgList = ({ requiredInfo, setRequiredInfo }) => {
  const [imgBase64, setImgBase64] = useState([])

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addRoofTopImgList = e => {
    const fileList = e.target.files
    if (fileList.length > 0 && fileList.length < 6) {
      setImgBase64([])
      setRequiredInfo({ ...requiredInfo, normalFile: fileList })
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

  const removeRoofTopList = () => {
    setImgBase64([])
    setRequiredInfo({ ...requiredInfo, normalFile: [] })
  }

  return (
    <Wrapper>
      <Title>
        <h5>옥상 사진 업로드</h5>
        <p>등록하려는 옥상 시설 사진을 5장 업로드 해주세요.</p>
      </Title>
      <BtnList>
        <label htmlFor="imgList">
          <FileUploadBtn>사진 업로드</FileUploadBtn>
        </label>
        {imgBase64.length > 0 && (
          <FileRemoveBtn onClick={removeRoofTopList}>사진 제거</FileRemoveBtn>
        )}
        <input
          type="file"
          id="imgList"
          onChange={addRoofTopImgList}
          multiple="multiple"
          accept=".png,.jpg"
        />
      </BtnList>
      <ImgList imgAmount={imgBase64.length}>
        {imgBase64.map((item, idx) => (
          <img src={item} key={idx} alt="First slide" />
        ))}
      </ImgList>
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
      padding: ${paddings.sm} ${paddings.base};
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

const FileRemoveBtn = styled(FileUploadBtn)`
  background-color: rgb(77, 77, 77);
  color: white;

  &:hover {
    background: rgb(255, 255, 255);
    color: #313131;
  }
`

const BtnList = styled.div`
  display: flex;

  label {
    width: 15%;
    margin: auto;
  }

  #imgList {
    display: none;
  }
`

const ImgList = styled.div`
  ${({ imgAmount }) => {
    return css`
      width: 100%;

      display: flex;
      justify-content: space-between;

      img {
        width: ${90 / imgAmount}%;
        object-fit: cover;
      }
    `
  }}
`

export default RequestImgList
