import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { roofTopControl } from "api/controls/roofTopControl"
import styled, { css } from "styled-components"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar, faUser, faArrowsLeftRight } from "@fortawesome/free-solid-svg-icons"
import { useContext } from "react"
import { ModalContext } from "module/Modal"
import FeeChangeModal from "components/main/RoofTop/Supervise/Modal/FeeChangeModal"
import PayOptionChangeModal from "components/main/RoofTop/Supervise/Modal/PayOptionChangeModal"
import Calendar from "react-calendar"
import { CalenderContainer } from "styles/calender"
import SetAvailableTimeModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailableTimeModal"
import SetAvailablePersonModal from "components/main/RoofTop/ApplyRoofTop/Modal/SetAvailablePersonModal"
import { useNavigate } from "react-router-dom"
const SuperviseDetailRooftop = () => {
  const { openModal } = useContext(ModalContext)
  const { id } = useParams()
  const nav = useNavigate()
  const [addImagesBase64, setAddImagesBase64] = useState([])
  const [tmpStructure, setTmpStructure] = useState([])
  const [input, setInput] = useState({
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    totalCount: 0,
    startTime: [],
    endTime: [],
    totalPrice: 0,
    deleteImages: [],
    addImages: [],
    rooftopImages: [],
    structureImage: [],
  })

  const { totalCount, deleteImages, addImages, rooftopImages, structureImage } = input

  const onChangeInput = e => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  useEffect(() => {
    const loadCurrentInfo = async () => {
      const {
        structureImage,
        rooftopImages,
        kidCount,
        adultCount,
        petCount,
        totalCount,
        totalPrice,
        startTime,
        endTime,
      } = await roofTopControl.getRooftopDetail(id)
      setInput({
        ...input,
        rooftopImages: rooftopImages.filter(
          ({ rooftopImageType }) => rooftopImageType === "NORMAL",
        ),
        structureImage: structureImage,
        kidCount,
        adultCount,
        petCount,
        totalCount,
        totalPrice,
        startTime,
        endTime,
      })
    }
    loadCurrentInfo()
  }, [])
  useEffect(() => {
    console.log(input)
  }, [input])

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addImage = e => {
    const fileList = e.target.files
    if (fileList.length > 0 && fileList.length <= 5 - rooftopImages.length) {
      setAddImagesBase64([])
      setInput(prevInfo => ({
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
  const setStruct = e => {
    const files = e.target.files
    if (!files[0]) return
    const reader = new FileReader()
    reader.readAsDataURL(files[0])
    reader.onloadend = () => {
      const base64Img = reader.result
      const base64Sub = base64Img.toString()
      setInput(prevInfo => ({
        ...prevInfo,
        addImages: Array.from(files),
      }))
      setTmpStructure(base64Sub)
      console.log(tmpStructure)
    }
  }

  const removeGivenImage = e => {
    const { name, id } = e.target
    if (id === "NORMAL") {
      const selectedImage = rooftopImages[name]
      setInput(prevInfo => ({
        ...prevInfo,
        deleteImages: [...deleteImages, selectedImage.storeFilename],
        rooftopImages: [...rooftopImages].filter(
          ({ storeFilename }) => storeFilename !== selectedImage.storeFilename,
        ),
      }))
    } else if (id === "STRUCTURE") {
      const selectedImage = structureImage
      setInput(prevInfo => ({
        ...prevInfo,
        deleteImages: [...deleteImages, selectedImage.storeFilename],
        structureImage: [],
      }))
    }
  }

  const removeAddedImage = e => {
    const { name } = e.target
    const selectedImage = addImages[name]
    console.log(name)
    setInput(prevInfo => ({
      ...prevInfo,
      addImages: [...addImages].filter(({ name }) => name !== selectedImage.name),
    }))
    setAddImagesBase64([...addImagesBase64].filter((_, idx) => idx !== parseInt(name)))
  }

  const removeStructureImage = e => {
    const { name } = e.target
    const selectedImage = addImages[name]
    console.log(name)
    setInput(prevInfo => ({
      ...prevInfo,
      addImages: [...addImages].filter(({ name }) => name !== selectedImage.name),
    }))
    setTmpStructure([])
  }
  const SlickSettings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  }

  const onFinish = async () => {
    const formData = new FormData()
    for (const [option, value] of Object.entries(input)) {
      if (option === "startTime" || option === "endTime") {
        formData.append(option, `${value[0].toString().padStart(2, "0")}:00:00`)
        continue
      }
      if (Array.isArray(value)) {
        for (let idx = 0; idx < value.length; idx++) {
          formData.append(option, value[idx])
        }
        continue
      }
      formData.append(option, value)
      console.log(option, value)
    }
    try {
      await roofTopControl.patchRooftopDetail(id, formData)
      nav(`/mypage/rooftop/supervise/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <ViewPoint>
        <DetailTop>
          <SliderBox>
            <Slider {...SlickSettings}>
              {rooftopImages &&
                rooftopImages.map(({ fileUrl }, idx) => (
                  <div>
                    <img
                      src={fileUrl}
                      alt="Img"
                      key={idx}
                      name={idx}
                      id="NORMAL"
                      onDoubleClick={removeGivenImage}
                    />
                  </div>
                ))}
              {addImagesBase64 &&
                addImagesBase64.map((base64, idx) => (
                  <div>
                    <img
                      src={base64}
                      alt="Img"
                      key={idx}
                      id="NORMAL"
                      name={idx}
                      onDoubleClick={removeAddedImage}
                    />
                  </div>
                ))}
            </Slider>
          </SliderBox>
          <div>
            <input
              id="imgList"
              type="file"
              onChange={addImage}
              multiple="multiple"
              accept=".png,.jpg"
            />
          </div>
        </DetailTop>
        <InfoLine>
          <div>
            <Icon icon={faArrowsLeftRight} />
            <IconText>3333m2</IconText>
          </div>
          <div>
            <Icon icon={faStar} />
            <IconText>3/5.0</IconText>
          </div>
          <div>
            <Icon icon={faUser} />
            <IconText>
              <Input type="text" name="totalCount" value={totalCount} onChange={onChangeInput} />
              까지
            </IconText>
          </div>
        </InfoLine>
        <DetailBottom>
          <LeftBox>
            <BoxWrapper>
              <InputBox>
                <div className="title">
                  <h5>이용 가능 시간</h5>
                  <p>등록하려는 시설의 이용 가능 시간을 설정하세요.</p>
                </div>
                <OpenModalBtn
                  onClick={() =>
                    openModal(<SetAvailableTimeModal applyInfo={input} changeInfo={setInput} />)
                  }>
                  시간 설정하기
                </OpenModalBtn>
              </InputBox>
              <InputBox>
                <div className="title">
                  <h5>이용 가능 인원</h5>
                  <p>등록하려는 시설의 이용 가능 인원을 설정하세요.</p>
                </div>
                <OpenModalBtn
                  onClick={() =>
                    openModal(<SetAvailablePersonModal applyInfo={input} changeInfo={setInput} />)
                  }>
                  인원 설정하기
                </OpenModalBtn>
              </InputBox>
            </BoxWrapper>
            <BoxWrapper>
              <CalenderContainer>
                <Calendar />
              </CalenderContainer>
            </BoxWrapper>
            <BoxWrapper>
              <Title>배치도</Title>
              {structureImage && (
                <img src={structureImage.fileUrl} id="STRUCTURE" onDoubleClick={removeGivenImage} />
              )}
              {tmpStructure && (
                <img src={tmpStructure} id="STRUCTURE" onDoubleClick={removeStructureImage} />
              )}
              <div>
                <input id="imgList" type="file" onChange={setStruct} accept=".png,.jpg" />
              </div>
            </BoxWrapper>
          </LeftBox>
          <RightBox>
            <ButtonBox>
              <button
                onClick={() => openModal(<FeeChangeModal input={input} setInput={setInput} />)}>
                1일당 가격 변경하기
              </button>
              <button onClick={() => openModal(<PayOptionChangeModal rooftopid={id} />)}>
                결제 추가옵션 변경
              </button>
              <button>기타사항 문의하기</button>
              <button onClick={onFinish}>적용 완료하기</button>
            </ButtonBox>
          </RightBox>
        </DetailBottom>
      </ViewPoint>
    </Wrapper>
  )
}

export default SuperviseDetailRooftop

const OpenModalBtn = styled.div`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 20%;
      padding: ${paddings.sm};
      margin: 0.75vw auto 0.25vw auto;

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
const ViewPoint = styled.div`
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`
const InputBox = styled.div`
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

      input,
      textarea {
        width: 100%;
        padding: ${paddings.sm} 0vw;
        margin: ${margins.xsm} 0vw;

        border: 0;
        background-color: ${colors.main.tertiary}11;
        border-bottom: 1px solid ${colors.main.secondary}44;

        color: ${colors.black.secondary};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: center;
      }
    `
  }}
`

const ButtonBox = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      padding: ${paddings.lg};
    `
  }}
`
const LeftBox = styled.div`
  width: 50%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const RightBox = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 50%;
      background: white;
      display: flex;
      flex-direction: column;
      border-radius: 2rem;
      padding-left: ${paddings.base};
      button {
        width: 100%;
        height: 2rem;
        margin: ${margins.xsm};
        border-radius: 0.3rem;
      }
    `
  }}
`
const BoxWrapper = styled.div`
  ${({ theme }) => {
    const { paddings, margins, colors } = theme
    return css`
      width: 100%;
      background-color:${colors.black.white}
      }
      padding: ${paddings.base};
      margin-top: ${margins.base};
      border-radius: 1rem;
      text-align:center;
    `
  }}
`
const Input = styled.input`
  ${({ theme }) => {
    const { paddings, margins, colors, fonts } = theme
    return css`
      width: 20%;
      padding: ${paddings.sm} 0vw;
      margin: ${margins.xsm} 0vw;

      border: 0;
      background-color: ${colors.main.tertiary}09;
      border-bottom: 1px solid ${colors.main.secondary}44;

      color: ${colors.black.secondary};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};
      text-align: center;
    `
  }}
`
const Title = styled.p`
  ${({ theme }) => {
    const { fonts, margins } = theme
    return css`
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.sm};
      margin-bottom: ${margins.sm};
    `
  }}
`

const DetailTop = styled.div`
  display: flex;
`

const InfoLine = styled.div`
  ${({ theme }) => {
    const { margins, paddings, fonts } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};
      font-size: ${fonts.size.sm}
      border-radius: 1rem;
      margin-bottom: ${margins.base};
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    `
  }}
`
const Wrapper = styled.div`
  width: 50vw;
  height: 80vh;

  margin: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  text-align: center;
`
const Icon = styled(FontAwesomeIcon)`
  color: black;
  display: inline-block;
`
const DetailBottom = styled.div`
  display: flex;
`
const IconText = styled.div`
  display: inline-block;
`
const SliderBox = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      margin: ${margins.lg} auto;
      width: 90%;

      img {
        width: 10vw;
        height: 10vw;
        overflow: hidden;
      }
    `
  }}
`
