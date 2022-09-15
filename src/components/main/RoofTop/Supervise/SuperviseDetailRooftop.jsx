import { useParams, useNavigate } from "react-router-dom"
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
import moment from "moment/moment"
import DateUtil from "util/DateUtil"
import { reservationControl } from "api/controls/reservationControl"
const SuperviseDetailRooftop = () => {
  const { openModal } = useContext(ModalContext)
  const { id } = useParams()
  const nav = useNavigate()
  const [addImagesBase64, setAddImagesBase64] = useState([])
  const [tmpStructure, setTmpStructure] = useState([])
  const [selectedDate, setSeletedDate] = useState(new Date())
  const [bookingDates, setBookingDates] = useState(new Map())
  //const [reservationDetail, setReservationDetail] = useState()
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
    structureImage: null,
    rooftopReviews: [],
    width: 0,
    grade: 0,
  })
  const onChangeInput = e => {
    const { name, value } = e.target
    setInput({
      ...input,
      [name]: value,
    })
  }

  useEffect(() => {
    const loadCurrentInfo = async () => {
      try {
        const result = await roofTopControl.getRooftopDetail(id)

        const { reservations } = result

        setInput({
          ...result,
        })
        reservations.map(({ id, startDates, endDates }) => {
          const betweenDates = DateUtil.getDatesBetweenTwoDates(
            DateUtil.createDate(startDates),
            DateUtil.createDate(endDates),
          )
          betweenDates.map(date => {
            setBookingDates(
              prevBookingDates => new Map([...prevBookingDates, [date.toDateString(), id]]),
            )
          })
        })
      } catch (err) {
        console.log(err.message)
      }
    }
    loadCurrentInfo()
  }, [])

  // useEffect(() => {
  //   const clickDate = async () => {
  //     try {
  //       const result = await reservationControl.getReservationInfoById(
  //         bookingDates.get(moment(selectedDate).format("ddd MMM DD YYYY")),
  //       )
  //       setReservationDetail(result)
  //     } catch (err) {
  //       console.log(err.message)
  //     }
  //   }
  //   clickDate()
  // }, [selectedDate])

  useEffect(() => {
    console.log(input)
  }, [input])
  const {
    totalCount,
    width,
    deleteImages,
    addImages,
    rooftopImages,
    structureImage,
    rooftopReviews,
    grade,
  } = input

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
    infinite: false,
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
            {addImagesBase64 && rooftopImages ? null : <p>이미지가 없습니다</p>}
          </Slider>
        </SliderBox>
        <div>
          <label htmlFor="imgList">
            <FileUploadBtn>사진 업로드</FileUploadBtn>
          </label>
          <input
            id="imgList"
            type="file"
            onChange={addImage}
            multiple="multiple"
            accept=".png,.jpg"
            style={{ visibility: "hidden" }}
          />
        </div>
        <InfoLine>
          <div>
            <Icon icon={faArrowsLeftRight} />
            <IconText>{width}m2</IconText>
          </div>
          <div>
            <Icon icon={faStar} />
            <IconText>{grade}/5.0</IconText>
          </div>
          <div>
            <Icon icon={faUser} />
            <IconText>
              <Input type="text" name="totalCount" value={totalCount} onChange={onChangeInput} />
              까지
            </IconText>
          </div>
        </InfoLine>
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
            <Calendar
              formatDay={(_, date) => moment(date).format("DD")}
              navigationLabel={null}
              onChange={setSeletedDate}
              value={selectedDate}
              tileContent={({ date }) => {
                let html = []
                if (bookingDates.has(date.toDateString())) {
                  html.push(<BookingDot key={date} />)
                }
                return <>{html}</>
              }}
            />
          </CalenderContainer>
        </BoxWrapper>
        <BoxWrapper>
          <Title>리뷰</Title>
          {rooftopReviews ? (
            rooftopReviews.map(({ content, createTime, grade }) => (
              <ReviewBox key={content}>
                <div className="content">
                  <p className="grade">
                    <FontAwesomeIcon icon={faStar} /> {`${parseInt(grade).toFixed(1)} / 5.0`}
                  </p>
                  <pre> {content}</pre>
                </div>
                <p>{`${createTime[0]}년 ${createTime[1]}월 ${createTime[2]}일`}</p>
              </ReviewBox>
            ))
          ) : (
            <p>아직 리뷰가 없습니다</p>
          )}
        </BoxWrapper>
        <BoxWrapper>
          <Title>배치도</Title>
          {structureImage ? (
            <img src={structureImage.fileUrl} id="STRUCTURE" onDoubleClick={removeGivenImage} />
          ) : (
            <p>배치도가 없습니다</p>
          )}
          {tmpStructure && structureImage ? null : (
            <img src={tmpStructure} id="STRUCTURE" onDoubleClick={removeStructureImage} />
          )}

          <div>
            <label htmlFor="structureimg">
              <FileUploadBtn>사진 업로드</FileUploadBtn>
            </label>
            <input
              id="structureimg"
              type="file"
              onChange={setStruct}
              accept=".png,.jpg"
              style={{ visibility: "hidden" }}
            />
          </div>
        </BoxWrapper>
        <ButtonBox>
          <Button
            type="fee"
            onClick={() => openModal(<FeeChangeModal input={input} setInput={setInput} />)}>
            1일당 가격 변경하기
          </Button>
          <Button type="fee" onClick={() => openModal(<PayOptionChangeModal rooftopid={id} />)}>
            결제 추가옵션 변경
          </Button>
          <Button type="fee">기타사항 문의하기</Button>
          <Button onClick={onFinish}>적용 완료하기</Button>
        </ButtonBox>
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
const ReviewBox = styled.div`
  ${({ theme }) => {
    const { colors, paddings, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} 0vw 0vw 0vw;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      svg {
        margin: auto ${margins.xsm} auto 0vw;
        color: ${colors.white};
      }

      .content {
        display: flex;
        width: 70%;
      }

      .grade {
        margin-right: ${margins.sm};
        padding: ${paddings.xsm} ${paddings.sm};

        background-color: ${colors.main.tertiary};
        border-radius: 2rem;
        color: ${colors.white};

        font-weight: 500;
      }

      pre {
        padding: ${paddings.xsm} 0vw;
        color: ${colors.black.tertiary};
        font-weight: 300;
      }

      p {
        padding: ${paddings.xsm} 0vw;
      }
    `
  }}
`
const BookingDot = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      height: ${fonts.size.xxsm};
      width: ${fonts.size.xxsm};
      margin: ${margins.xsm} auto 0vw auto;

      position: relative;
      bottom: 0;

      background-color: ${colors.main.tertiary};
      border-radius: 50%;
    `
  }}
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

const Button = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.lg} auto;

      cursor: pointer;
      border-radius: ${fonts.size.sm};
      background-color: ${props =>
        props.type === "fee" ? colors.main.tertiary : colors.main.primary};

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
const ButtonBox = styled.div`
  ${({ theme }) => {
    const { paddings } = theme
    return css`
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
      padding: ${paddings.lg};
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
      img {
        width: 100%;
        height: 40vh;
        object-fit: cover;
        margin: ${margins.lg} auto 0vw auto;
      }

    `
  }}
`
const FileUploadBtn = styled.div`
  ${({ theme }) => {
    const { colors, paddings } = theme
    return css`
      width: 100%;
      padding: ${paddings.sm};

      border: 1px solid ${colors.main.primary};
      border-radius: 2.5vw;
      background: ${colors.white};
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
const Title = styled.h5`
  ${({ theme }) => {
    const { fonts, colors, paddings, margins } = theme
    return css`
      width: 100%;
      padding-bottom: ${paddings.xsm};
      border-bottom: 1px solid ${colors.main.primary}55;
      margin-bottom: ${margins.base};
      color: ${colors.main.secondary};
      font-size: ${fonts.size.base};
    `
  }}
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
      div{
        display: flex;
        align-items: center;
        
      }
    `
  }}
`
const Wrapper = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  width: 35vw;
  height: 80vh;
  margin: 0vh auto;
`
const Icon = styled(FontAwesomeIcon)`
  color: black;
  display: inline-block;
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
