import styled, { css } from "styled-components"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { greenbeeControl } from "api/controls/greenbeeControl"

const GreenbeeInfoEdit = () => {
  const navigate = useNavigate()
  const [addImagesBase64, setAddImagesBase64] = useState([])
  const [currentInfo, setCurrentInfo] = useState({
    content: "",
    officeNumber: "",
    greenBeeImages: [],
    deleteImages: [],
    addImages: [],
  })

  useEffect(() => {
    const loadCurrentInfo = async () => {
      const { content, officeNumber, greenBeeImages } = await greenbeeControl.getGreenbeeInfo()
      setCurrentInfo({
        ...currentInfo,
        content,
        officeNumber,
        greenBeeImages: greenBeeImages.filter(
          ({ greenBeeImageType }) => greenBeeImageType === "NORMAL",
        ),
      })
    }
    loadCurrentInfo()
  }, [])

  const { content, greenBeeImages, officeNumber, deleteImages, addImages } = currentInfo

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addGreenbeeImage = e => {
    const fileList = e.target.files
    if (fileList.length > 0 && fileList.length < 5 - greenBeeImages.length) {
      setAddImagesBase64([])
      setCurrentInfo(prevInfo => ({
        ...prevInfo,
        addImages: Array.from(fileList),
      }))
      Object.values(fileList).forEach(file => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          const base64Img = reader.result
          const base64Sub = base64Img.toString()
          setAddImagesBase64(prevImgList => [...prevImgList, base64Sub])
        }
      })
    }
  }

  const removeGreenbeeImage = e => {
    const { name } = e.target
    const selectedImage = greenBeeImages[name]
    if (selectedImage.greenBeeImageType === "NORMAL") {
      setCurrentInfo(prevInfo => ({
        ...prevInfo,
        deleteImages: [...deleteImages, selectedImage.storeFilename],
        greenBeeImages: [...greenBeeImages].filter(
          ({ storeFilename }) => storeFilename !== selectedImage.storeFilename,
        ),
      }))
      return
    }
  }

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

  return (
    <Wrapper>
      <InputBox boxSize="lg">
        <h5>사무소 대표 사진</h5>
        <p>해당 사무소의 소개 사진입니다.</p>
        {greenBeeImages && addImagesBase64 && (
          <div className="img-list">
            {greenBeeImages.map(({ fileUrl }, idx) => (
              <img src={fileUrl} alt="Img" key={idx} name={idx} onClick={removeGreenbeeImage} />
            ))}
            {addImagesBase64.map((base64, idx) => (
              <img src={base64} alt="Img" key={idx} />
            ))}
          </div>
        )}
        <input type="file" onChange={addGreenbeeImage} multiple="multiple" accept=".png,.jpg" />
      </InputBox>
      <InputBox boxSize="lg">
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

const SelectBox = styled.select`
  ${({ theme }) => {
    const { fonts, margins, paddings } = theme
    return css`
      width: 25%;
      margin: ${margins.sm};
      padding: ${paddings.sm};

      border: 1px solid #999;
      border-radius: 0px;

      font-size: ${fonts.size.xsm};
      text-align: center;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      option {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
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
