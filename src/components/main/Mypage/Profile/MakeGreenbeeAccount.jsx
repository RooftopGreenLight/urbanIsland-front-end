import React, { useState } from "react"
import styled from "styled-components"
import { mypageControl } from "api/controls/mypageControl"
import SelectBox from "../SelectBox"
import Slider from "react-slick"

const MakeGreenbeeAccount = () => {
  const [rooftopInput, setRooftopInput] = useState({
    officeNumber: "",
    detail: "",
    content: "",
  })
  const [city, setCity] = useState()
  const [district, setDistrict] = useState()
  const { officeNumber, detail, content } = rooftopInput

  const [selectedFiles, setSelectedFiles] = useState([])
  const [img, setImg] = useState([])
  const [files, setFiles] = useState()

  const insertInput = e => {
    const { name, value } = e.target
    setRooftopInput({ ...rooftopInput, [name]: value })
  }

  const handleUpload = e => {
    e.preventDefault()
    setFiles(e.target.files)
  }

  const fileList = []
  const handleImgUpload = e => {
    setImg(e.target.files)
    console.log(img)
    const files = e.target.files
    const fileArray = Array.prototype.slice.call(files)

    fileArray.forEach(file => {
      fileList.push(file)
    })
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))
      //console.log("filesArray: ", filesArray)
      setSelectedFiles(prevImages => prevImages.concat(filesArray))
      Array.from(e.target.files).map(file => URL.revokeObjectURL(file))
    }
  }

  const settings = {
    arrow: false,
    dots: true,
    infinite: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
  }

  const renderPhotos = source => {
    return (
      <StyledSlider {...settings}>
        {source &&
          source.map(photo => {
            return <img src={photo} alt="" key={photo} />
          })}
      </StyledSlider>
    )
  }
  const onFinish = async () => {
    const formData = new FormData()
    Object.values(img).forEach(file => formData.append("normalFile", file))
    formData.append("confirmationFile", files[0])
    formData.append("officeNumber", officeNumber)
    formData.append("content", content)
    formData.append("city", city)
    formData.append("district", district)
    formData.append("detail", detail)
    try {
      await mypageControl.postApplyGreenbees(formData)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <form method="post" encType="multipart/form-data">
        <LeftBox>
          <SliderBox>{renderPhotos(selectedFiles)}</SliderBox>
          <input
            type="file"
            onChange={handleImgUpload}
            multiple="multiple"
            accept=".jpg,.jpeg,.png"
          />
          <p>세부사항: 그린비측 멘트</p>
          <TextBox
            type="text"
            name="content"
            value={content}
            placeholder="Urban Island측에 알려주고 싶은 점을 알려주세용"
            onChange={insertInput}
          />
        </LeftBox>
        <RightBox>
          <p>그린비</p>
          <input type="file" onChange={handleUpload} accept=".jpg,.jpeg,.png" />
          <p>주소지</p>
          <SelectBox setDistrict={setDistrict} setCity={setCity} />
          <InputBox
            type="text"
            placeholder="세부주소를 입력해주세요"
            onChange={insertInput}
            value={detail}
            name="detail"
          />
          <p>연락처</p>
          <InputBox
            type="text"
            placeholder="연락처"
            name="officeNumber"
            onChange={insertInput}
            value={officeNumber}
          />
          <Button type="button" value="upload" onClick={onFinish}>
            업로드
          </Button>
        </RightBox>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  border: 1px solid gray;
  margin: 3rem;
  padding: 3rem;
`
const LeftBox = styled.div`
  display: inline-block;
`
const RightBox = styled.div`
  display: inline-block;
`
const SliderBox = styled.div`
  height: 10%;
`
const InputBox = styled.input`
  margin: 1rem;
  padding: 0.5rem;
`
const TextBox = styled.input`
  height: 200px;
  width: 90%;
`
const StyledSlider = styled(Slider)`
  height: 70%; //슬라이드 컨테이너 영역

  .slick-slide div {
    //슬라이더  컨텐츠
    /* cursor: pointer; */
  }
`
const Button = styled.button`
  margin: 1rem;
  display: block;
`

export default MakeGreenbeeAccount
