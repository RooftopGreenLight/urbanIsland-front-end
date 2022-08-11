import styled, { css } from "styled-components"

import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { applyRoofTopImg } from "module/ApplyRoofTop"

const ApplyImgList = () => {
  const setApplyInfoImg = useSetRecoilState(applyRoofTopImg)
  const [imgBase64, setImgBase64] = useState([])

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addRoofTopImgList = e => {
    const fileList = e.target.files
    console.log(fileList)
    if (fileList.length > 0 && fileList.length < 6) {
      setImgBase64([])
      handleImgData(fileList)
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

  const handleImgData = fileList => {
    const fileData = new FormData()
    Object.values(fileList).forEach(file => {
      fileData.append("normalFile", file)
    })
    setApplyInfoImg({ name: "normalFile", value: fileData })
  }

  const removeRoofTopList = () => {
    setImgBase64([])
    setApplyInfoImg({ name: "normalFile", value: [] })
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
      width: 25%;
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

const FileRemoveBtn = styled(FileUploadBtn)`
  border: 1px solid rgb(77, 77, 77);
  border-radius: 2.5vw;

  background-color: rgb(77, 77, 77);
  color: white;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  font-weight: 100;

  &:hover {
    background: rgb(255, 255, 255);
    color: #313131;
  }
`

const RoofTopImgList = styled.div`
  margin: auto;

  #imgList {
    display: none;
  }
`

export default ApplyImgList
