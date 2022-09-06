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
import Tooltip from "components/common/Tooltip"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons"
import FeeChangeModal from "./FeeChangeModal"
import PayOptionChangeModal from "./PayOptionChangeModal"
import Calendar from "react-calendar"
import { CalenderContainer } from "styles/calender"
const SuperviseDetailRooftop = () => {
  const { openModal } = useContext(ModalContext)
  const { id } = useParams()
  const [addImagesBase64, setAddImagesBase64] = useState([])
  const [tmpStructure, setTmpStructure] = useState([])
  const [input, setInput] = useState({
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    totalCount: 0,
    startTime: "",
    endTime: "",
    totalPrice: 0,
    deleteImages: [],
    addImages: [],
    rooftopImages: [],
    structureImage: [],
  })

  const {
    adultCount,
    kidCount,
    petCount,
    totalCount,
    startTime,
    endTime,
    totalPrice,
    deleteImages,
    addImages,
    rooftopImages,
    structureImage,
  } = input

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
      if (Array.isArray(value)) {
        for (let idx = 0; idx < value.length; idx++) {
          formData.append(option, value[idx])
        }
        continue
      }
      // 시간의 경우 LocalTime 형식에 맞게 이를 수정하여 보내야 함
      if (option === "startTime" || option === "endTime") {
        formData.append(option, `${value.padStart(2, "0")}:00:00`)
        continue
      }
      // 배열이 아닌 경우에는 그냥 값을 추가해주면 됨.
      formData.append(option, value)
      console.log(option, value)
    }
    try {
      await roofTopControl.patchRooftopDetail(id, formData)
    } catch (err) {
      console.log(err)
    }
  }

  const clickHandler = e => {
    const { id } = e.target
    setInput({
      ...input,
      [id]: 0,
    })
  }
  return (
    <Wrapper>
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
          <Tooltip message="0건">
            <Icon icon={faStar} />
            <IconText>3/5.0</IconText>
          </Tooltip>
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
            <Title>이용 가능 시간</Title>
            <Line>
              시작시간:
              <Input type="text" name="startTime" value={startTime} onChange={onChangeInput} />
              :00
            </Line>
            <Line>
              종료시간:
              <Input type="text" name="endTime" value={endTime} onChange={onChangeInput} />
              :00
            </Line>
          </BoxWrapper>
          <BoxWrapper>
            <Title>이용 가능 인원</Title>
            <Line>
              <div>성인</div>
              <div>
                {adultCount === 0 ? (
                  <Icons icon={faMinus} style={{ color: "gray" }} />
                ) : (
                  <Icons
                    icon={faMinus}
                    value={adultCount}
                    onClick={() => setInput({ ...input, adultCount: adultCount - 1 })}
                  />
                )}
                {adultCount}
                {adultCount === totalCount ? (
                  <Icons icon={faPlus} style={{ color: "gray" }} />
                ) : (
                  <Icons
                    icon={faPlus}
                    value={adultCount}
                    onClick={() => setInput({ ...input, adultCount: adultCount + 1 })}
                  />
                )}
              </div>
              <label htmlFor="adultCount">
                출입금지
                <input type="checkbox" id="adultCount" onChange={clickHandler} />
              </label>
            </Line>
            <Line>
              <div>유아</div>
              <div>
                {kidCount === 0 ? (
                  <Icons icon={faMinus} style={{ color: "gray" }} />
                ) : (
                  <Icons
                    icon={faMinus}
                    value={kidCount}
                    onClick={() => setInput({ ...input, kidCount: kidCount - 1 })}
                  />
                )}
                {kidCount}
                {kidCount === totalCount ? (
                  <Icons icon={faPlus} style={{ color: "gray" }} />
                ) : (
                  <Icons
                    icon={faPlus}
                    value={petCount}
                    onClick={() => setInput({ ...input, kidCount: kidCount + 1 })}
                  />
                )}{" "}
              </div>
              <label htmlFor="kidCount">
                출입금지
                <input type="checkbox" id="kidCount" onChange={clickHandler} />
              </label>
            </Line>
            <Line>
              <div>반려동물</div>
              <div>
                {petCount === 0 ? (
                  <Icons icon={faMinus} style={{ color: "gray" }} />
                ) : (
                  <Icons
                    icon={faMinus}
                    value={petCount}
                    onClick={() => setInput({ ...input, petCount: petCount - 1 })}
                  />
                )}
                {petCount}
                {petCount === totalCount ? (
                  <Icons icon={faPlus} style={{ color: "gray" }} />
                ) : (
                  <Icons
                    icon={faPlus}
                    value={petCount}
                    onClick={() => setInput({ ...input, petCount: petCount + 1 })}
                  />
                )}
              </div>
              <label htmlFor="petCount">
                출입금지
                <input type="checkbox" id="petCount" onChange={clickHandler} />
              </label>
            </Line>
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
            <button onClick={() => openModal(<FeeChangeModal input={input} setInput={setInput} />)}>
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
    </Wrapper>
  )
}

export default SuperviseDetailRooftop

const ButtonBox = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      padding: ${paddings.lg};
      .pay {
        background-color: black;
        color: white;
      }
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
      border: 2px solid ${colors.main.tertiary};
      padding: ${paddings.base};
      margin-top: ${margins.base};
      border-radius: 1rem;
      text-align:center;
    `
  }}
`
const Line = styled.div`
  ${({ theme }) => {
    const { fonts, margins, colors } = theme
    return css`
      font-weight: ${fonts.weight.bold};
      font-size: ${fonts.size.xsm};
      margin-bottom: ${margins.sm};
      display: flex;
      align-items: center;
      justify-content: center;

      input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        background: ${colors.main.quaternary}88;
        border-radius: 4px;

        width: 16px;
        height: 16px;
        margin: auto 0vw;

        &::after {
          border: solid #fff;
          border-width: 0 2px 2px 0;
          content: "";
          display: none;

          width: 15%;
          height: 40%;

          position: relative;
          left: 37.5%;
          top: 20%;
          transform: rotate(45deg);
        }

        &:checked {
          background: ${colors.main.tertiary};
          &::after {
            display: block;
          }
        }
      }
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
  max-height: 80vh;
  overflow: auto;

  ::-webkit-scrollbar {
    display: none;
  }
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
const Icons = styled(FontAwesomeIcon)`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      padding: 0 ${paddings.xsm};
    `
  }}
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
