import styled, { css } from "styled-components"
import { useEffect, useMemo, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import Slider from "react-slick"

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { greenbeeControl } from "api/controls/greenbeeControl"

import { InfomationBox, InfomationLine } from "components/common/Style/Mypage/CommonStyle"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faImage } from "@fortawesome/free-solid-svg-icons"

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
  const feedbackMsg = useRef()

  useEffect(() => {
    const loadCurrentInfo = async () => {
      const { content, officeNumber, greenBeeImages } = await greenbeeControl.getGreenbeeInfo()
      console.log(greenBeeImages)
      setCurrentInfo({
        ...currentInfo,
        content,
        officeNumber,
        greenBeeImages,
      })
    }
    loadCurrentInfo()
  }, [])

  const { content, greenBeeImages, officeNumber, deleteImages, addImages } = currentInfo

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addGreenbeeImage = e => {
    const fileList = e.target.files
    if (fileList.length > 0 && fileList.length <= 5 - greenBeeImages.length) {
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
    feedbackMsg.current.innerText = "사무소 대표 사진은 변경할 수 없습니다."
  }

  const removeAddedImage = e => {
    const { name } = e.target
    const selectedImage = addImages[name]
    setCurrentInfo(prevInfo => ({
      ...prevInfo,
      addImages: [...addImages].filter(({ name }) => name !== selectedImage.name),
    }))
    setAddImagesBase64([...addImagesBase64].filter((_, idx) => idx !== parseInt(name)))
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

  const totalImgAmount = useMemo(
    () => greenBeeImages.length + addImagesBase64.length,
    [greenBeeImages, addImagesBase64],
  )

  const SlickSettings = {
    dots: totalImgAmount > 3,
    infinite: totalImgAmount > 3,
    lazyLoad: "progressive",
    speed: 250,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  return (
    <Wrapper>
      <InfomationBox>
        <Title>
          <h5>내 그린비 정보 수정</h5>
        </Title>
        <InfomationLine>
          <div className="info">
            <span>사무소 연락처</span>
            <input name="officeNumber" value={officeNumber} onChange={changeInput} />
          </div>
        </InfomationLine>
        <InfomationLine>
          <div className="info">
            <span>사무소 소개</span>
            <textarea name="content" rows="4" cols="50" value={content} onChange={changeInput} />
          </div>
        </InfomationLine>
      </InfomationBox>
      <InfomationBox>
        <Title>
          <h5>사무소 대표 이미지 수정</h5>
        </Title>
        <SliderBox>
          <Slider {...SlickSettings}>
            {greenBeeImages &&
              greenBeeImages.map(({ fileUrl }, idx) => (
                <div key={fileUrl}>
                  <img
                    src={fileUrl}
                    alt="Img"
                    key={idx}
                    name={idx}
                    onDoubleClick={removeGreenbeeImage}
                  />
                </div>
              ))}
            {addImagesBase64 &&
              addImagesBase64.map((base64, idx) => (
                <div key={base64}>
                  <img
                    src={base64}
                    alt="Img"
                    key={idx}
                    name={idx}
                    onDoubleClick={removeAddedImage}
                  />
                </div>
              ))}
          </Slider>
        </SliderBox>
        <FeedBackMsg ref={feedbackMsg} />
        <BtnList>
          <label htmlFor="imgList">
            <FileUploadBtn>
              <FontAwesomeIcon icon={faImage} /> 사진 업로드
            </FileUploadBtn>
          </label>
          <ModifyBtn onClick={confirmSaveInfo}>
            <FontAwesomeIcon icon={faEdit} /> 정보 수정하기
          </ModifyBtn>
          <input
            id="imgList"
            type="file"
            onChange={addGreenbeeImage}
            multiple="multiple"
            accept=".png,.jpg"
          />
        </BtnList>
      </InfomationBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  margin: 7.5vh auto auto auto;

  display: flex;
  flex-direction: column;
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

const SliderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 33vw;
      margin: ${margins.lg} auto;

      img {
        width: 10vw;
        height: 10vw;
        overflow: hidden;
      }
    `
  }}
`

const FileUploadBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 80%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.base} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${colors.main.secondary};

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};

      svg {
        margin: auto ${margins.sm} auto 0vw;
      }

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
    width: 50%;

    display: flex;
    justify-content: space-between;
  }

  #imgList {
    display: none;
  }
`

const FeedBackMsg = styled.p`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      width: 100%;
      margin: 0vw auto ${margins.base} auto;

      font-size: ${fonts.size.xsm};
      font-weight: 100;
      text-align: center;
    `
  }}
`

const ModifyBtn = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 40%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.base} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${colors.main.primary};

      text-align: center;
      color: ${colors.white};
      font-size: ${fonts.size.sm};

      svg {
        margin: auto ${margins.sm} auto 0vw;
      }

      &:hover {
        background-color: ${colors.main.tertiary};
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

export default GreenbeeInfoEdit
