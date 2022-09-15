import { useParams, useNavigate } from "react-router-dom"
import { useContext, useState, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import { Title, ServiceList, InputBox } from "components/common/Style/Mypage/CommonStyle"
import {
  RooftopTitle,
  RooftopDetail,
  DetailInfo,
  InformationBox,
} from "components/common/Style/Rooftop/CommonStyle"

import { roofTopControl } from "api/controls/roofTopControl"
import { ModalContext } from "module/Modal"
import DateUtil from "util/DateUtil"
import FeeChangeModal from "components/main/RoofTop/Supervise/Modal/FeeChangeModal"

import PayOptionChangeModal from "components/main/RoofTop/Supervise/Modal/PayOptionChangeModal"
import ApplyAvailableInfo from "../ApplyRoofTop/ApplyAvailableInfo"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faImage, faMap, faStar, faUser } from "@fortawesome/free-solid-svg-icons"

const SuperviseDetailRooftop = () => {
  const { openModal } = useContext(ModalContext)
  const { id } = useParams()
  const nav = useNavigate()
  const [addImagesBase64, setAddImagesBase64] = useState([])
  const [selectedDate, setSeletedDate] = useState(new Date())
  const [bookingDates, setBookingDates] = useState(new Map())

  const [rooftopData, setRooftopData] = useState({
    adultCount: 0,
    kidCount: 0,
    petCount: 0,
    totalCount: 0,
    startTime: 0,
    endTime: 23,
    totalPrice: 0,
    explainContent: "",
    refundContent: "",
    roleContent: "",
    detailInfoNum: [],
    deleteImages: [],
    addImages: [],
    rooftopImages: [],
    structureFile: null,
    rooftopReviews: [],
    width: 0,
    grade: 0,
  })

  useEffect(() => {
    const loadCurrentInfo = async () => {
      try {
        const result = await roofTopControl.getRooftopDetail(id)
        console.log(result)
        const {
          city,
          district,
          detail,
          width,
          grade,
          adultCount,
          kidCount,
          petCount,
          totalCount,
          startTime,
          endTime,
          totalPrice,
          mainImage,
          rooftopImages,
          structureImage: structureFile,
          detailNums: detailInfoNum,
          explainContent,
          refundContent,
          roleContent,
          reservations,
        } = result

        if (reservations) {
          reservations.map(({ id, startDates, endDates }) => {
            const betweenDates = DateUtil.getDatesBetweenTwoDates(
              DateUtil.createDate(startDates),
              DateUtil.createDate(endDates),
            )
            return betweenDates.map(date =>
              setBookingDates(prevData => new Map([...prevData, [date.toDateString(), id]])),
            )
          })
        }

        setRooftopData(prevData => ({
          ...prevData,
          city,
          district,
          detail,
          width,
          grade,
          adultCount,
          kidCount,
          petCount,
          totalCount,
          totalPrice,
          detailInfoNum,
          startTime: startTime[0],
          endTime: endTime[0],
          explainContent,
          refundContent,
          roleContent,
          mainImage,
          rooftopImages,
          structureFile,
        }))
      } catch (err) {
        console.log(err.message)
      }
    }
    loadCurrentInfo()
  }, [])

  const {
    width,
    city,
    district,
    detail,
    grade,
    adultCount,
    kidCount,
    petCount,
    totalPrice,
    rooftopImages,
    deleteImages,
    addImages,
    explainContent,
    roleContent,
    refundContent,
    rooftopReviews,
  } = rooftopData

  const onFinish = async () => {
    const formData = new FormData()
    for (const [option, value] of Object.entries(rooftopData)) {
      if (["startTime", "endTime"].includes(option)) {
        formData.append(option, `${String(value).padStart(2, "0")}:00:00`)
        continue
      }
      if (Array.isArray(value)) {
        for (let idx = 0; idx < value.length; idx++) {
          formData.append(option, value[idx])
        }
        continue
      }
      formData.append(option, value)
    }
    try {
      await roofTopControl.patchRooftopDetail(id, formData)
      nav(`/mypage/rooftop/supervise/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  const changeInput = e => {
    const { name, value } = e.target
    setRooftopData(prevData => ({
      ...prevData,
      [name]: value,
    }))
  }

  // Blob 데이터를 추출하여 이미지를 띄우는 함수.
  const addRooftopImage = e => {
    const fileList = e.target.files
    if (fileList.length > 0 && fileList.length <= 5 - rooftopImages.length) {
      setAddImagesBase64([])
      setRooftopData(prevInfo => ({
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

  const removeRooftopImage = e => {
    const { name } = e.target
    const selectedImage = rooftopImages[name]
    if (selectedImage.rooftopImageType === "NORMAL") {
      setRooftopData(prevInfo => ({
        ...prevInfo,
        deleteImages: [...deleteImages, selectedImage.storeFilename],
        rooftopImages: [...rooftopImages].filter(
          ({ storeFilename }) => storeFilename !== selectedImage.storeFilename,
        ),
      }))
      return
    }
  }

  const removeAddedImage = e => {
    const { name } = e.target
    const selectedImage = addImages[name]
    setRooftopData(prevInfo => ({
      ...prevInfo,
      addImages: [...addImages].filter(({ name }) => name !== selectedImage.name),
    }))
    setAddImagesBase64([...addImagesBase64].filter((_, idx) => idx !== parseInt(name)))
  }

  const totalImgAmount = useMemo(
    () => rooftopImages.length + addImagesBase64.length,
    [rooftopImages, addImagesBase64],
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
      <RooftopInfoBox>
        <RooftopTitle>
          <h5>{`${city} ${district} ${detail}`}</h5>
        </RooftopTitle>
        <RooftopDetail>
          <div className="detail-list">
            <DetailInfo>
              <FontAwesomeIcon icon={faStar} />
              <span>{Number(grade).toFixed(1)} / 5.0</span>
            </DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faMap} />
              <span>
                {`${width?.toLocaleString()} m`}
                <sup style={{ fontSize: "0.5rem" }}>2</sup>
              </span>
            </DetailInfo>
            <DetailInfo>
              <FontAwesomeIcon icon={faUser} />
              <span>
                {`성인 ${adultCount}명, ${
                  kidCount === 0 ? "노 키즈 존" : `유아 ${kidCount}명`
                }, 반려동물 ${petCount === 0 ? "금지" : `${petCount}마리`}`}
              </span>
            </DetailInfo>
          </div>
        </RooftopDetail>
      </RooftopInfoBox>
      <InputBox boxSize="base">
        <div className="title">
          <h5>건물 면적 </h5>
          <p>
            옥상의 면적을 입력해주세요. (단위 : m<sup style={{ fontSize: "0.5rem" }}>2</sup>)
          </p>
        </div>
        <input name="width" value={width} placeholder="넓이" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="base">
        <div className="title">
          <h5>이용 가격</h5>
          <p>옥상의 1일 당 이용 금액을 입력해주세요.</p>
        </div>
        <input name="totalPrice" value={totalPrice} placeholder="가격" onChange={changeInput} />
      </InputBox>
      <InputBox boxSize="lg">
        <div className="title">
          <h5>시설 설명</h5>
          <p>고객에게 옥상 시설을 설명해주세요!</p>
        </div>
        <textarea
          name="explainContent"
          rows="4"
          cols="50"
          value={explainContent}
          placeholder="자유롭게 옥상 설명을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
      <ApplyAvailableInfo applyInfo={rooftopData} changeInfo={setRooftopData} />
      {rooftopReviews && rooftopReviews.length > 0 && (
        <InformationBox>
          <h5>시설 리뷰</h5>
          {rooftopReviews.map(({ content, createTime, grade }) => (
            <ReviewBox key={content}>
              <div className="content">
                <p className="grade">
                  <FontAwesomeIcon icon={faStar} /> {`${parseInt(grade).toFixed(1)} / 5.0`}
                </p>
                <pre> {content}</pre>
              </div>
              <p>{`${createTime[0]}년 ${createTime[1]}월 ${createTime[2]}일`}</p>
            </ReviewBox>
          ))}
        </InformationBox>
      )}
      <InputBox boxSize="lg">
        <div className="title">
          <h5>환불 규정</h5>
          <p>등록하려는 옥상 시설의 환불 규정을 작성해주세요.</p>
        </div>
        <textarea
          name="refundContent"
          rows="4"
          cols="50"
          value={refundContent}
          placeholder="자유롭게 환불 규정을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
      <InputBox boxSize="lg">
        <div className="title">
          <h5>이용 규칙</h5>
          <p>등록하려는 옥상 시설의 이용 규칙을 작성해주세요.</p>
        </div>
        <textarea
          name="roleContent"
          rows="4"
          cols="50"
          value={roleContent}
          placeholder="자유롭게 이용 규칙을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
      <SliderBox>
        <div className="title">
          <h5>옥상 사진</h5>
          <p>등록하려는 옥상 시설의 이미지를 작성해주세요.</p>
        </div>
        <Slider {...SlickSettings}>
          {rooftopImages &&
            rooftopImages.map(({ fileUrl }, idx) => (
              <div key={fileUrl}>
                <img
                  src={fileUrl}
                  alt="Img"
                  key={idx}
                  name={idx}
                  onDoubleClick={removeRooftopImage}
                />
              </div>
            ))}
          {addImagesBase64 &&
            addImagesBase64.map((base64, idx) => (
              <div key={base64}>
                <img src={base64} alt="Img" key={idx} name={idx} onDoubleClick={removeAddedImage} />
              </div>
            ))}
        </Slider>
        {totalImgAmount < 5 && (
          <BtnList>
            <label htmlFor="imgList">
              <FileUploadBtn>
                <FontAwesomeIcon icon={faImage} /> 사진 업로드
              </FileUploadBtn>
            </label>
            <input
              id="imgList"
              type="file"
              onChange={addRooftopImage}
              multiple="multiple"
              accept=".png,.jpg"
            />
          </BtnList>
        )}
      </SliderBox>
      <Button onClick={onFinish}>적용 완료하기</Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  margin: 7.5vh auto;
  padding: 1rem;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const RooftopInfoBox = styled.div`
  width: 100%;
  margin: 5vh 1rem 3.5vh 1rem;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: left;
`

const SliderBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 40vw;
      padding: ${paddings.base};

      img {
        width: 13vw;
        height: 13vw;
        overflow: hidden;
      }

      .title {
        margin-bottom: ${margins.base};
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
    `
  }}
`

const BtnList = styled.div`
  display: flex;
  margin: 2rem auto 0rem auto;

  label {
    width: 50%;
    margin: auto;

    display: flex;
    justify-content: space-between;
  }

  #imgList {
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

const Button = styled.div`
  ${({ theme }) => {
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 50%;
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

export default SuperviseDetailRooftop
