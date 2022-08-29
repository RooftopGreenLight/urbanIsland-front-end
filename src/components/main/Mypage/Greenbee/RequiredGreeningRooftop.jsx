import styled, { css } from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { greenbeeControl } from "api/controls/greenbeeControl"
import { RequestDeadLineDate } from "constants/RequestDeadLineDate"
import { RequiredRoofTopOption } from "constants/RequiredRoofTopOption"
import { useRef } from "react"

const RequiredGreeningRooftop = () => {
  const { rooftopId } = useParams()
  const navigate = useNavigate()
  const feedbackMsg = useRef()

  const [rooftopInfo, setRooftopInfo] = useState([])
  useEffect(() => {
    const loadRooftopInfo = async () => {
      try {
        const loadedRooftopInfo = await greenbeeControl.getRequiredGreenRooftop(rooftopId)
        console.log(loadedRooftopInfo)
        setRooftopInfo(loadedRooftopInfo)
      } catch (err) {
        console.log(err)
      }
    }
    loadRooftopInfo()
  }, [])

  const applyRooftopGreening = async () => {
    try {
      await greenbeeControl.getSelectGreeningRooftop(rooftopId)
      alert("옥상 녹화 신청이 완료되었습니다.")
      navigate("/mypage/greenbee")
    } catch (err) {
      feedbackMsg.current.innerText = err.message
      console.log(err)
    }
  }

  const {
    city,
    district,
    detail,
    detailNums,
    ownerContent,
    phoneNumber,
    requiredTermType,
    structureImage,
    width,
    widthPrice,
  } = rooftopInfo

  return (
    <Wrapper>
      {rooftopInfo && (
        <ViewPoint>
          <OptionBox boxSize="lg">
            <h5>옥상 시설 위치</h5>
            <p>해당 시설의 위치 정보입니다.</p>
            <span>{`${city} ${district}`}</span>
            <span>{detail}</span>
          </OptionBox>
          <OptionBox boxSize="base">
            <h5>옥상 시설 이미지</h5>
            <p>해당 시설의 이미지입니다.</p>
            <img src={structureImage?.fileUrl} alt="Loading" />
          </OptionBox>
          <OptionBox boxSize="base">
            <h5>옥상 시설 소개</h5>
            <p>해당 시설의 소개 정보입니다.</p>
            <span>{ownerContent}</span>
          </OptionBox>
          <OptionBox boxSize="base">
            <h5>옥상 시설 번호</h5>
            <p>해당 시설 소유주의 전화 번호입니다.</p>
            <span>{phoneNumber}</span>
          </OptionBox>
          <OptionBox boxSize="base">
            <h5>옥상 시설 시공 일정</h5>
            <p>시설 소유주가 요구하는 시공 일정입니다.</p>
            <span>{RequestDeadLineDate[requiredTermType]}</span>
          </OptionBox>
          <OptionBox boxSize="base">
            <h5>옥상 시설 면적</h5>
            <p>옥상 시설의 면적입니다.</p>
            <span>{`${width} m2`}</span>
          </OptionBox>
          <OptionBox boxSize="base">
            <h5>옥상 시설 면적 당 시공가</h5>
            <p>옥상 시설의 면적 당 시공가입니다.</p>
            <span>{`${widthPrice} 원 / m2`}</span>
          </OptionBox>
          <OptionBox boxSize="lg">
            <h5>시공 시 필요 시설</h5>
            <p>시설 시공 시 필요 시설 목록입니다.</p>
            <DetailOptionList>
              {detailNums &&
                RequiredRoofTopOption.map((elm, idx) => (
                  <div key={idx} className="option">
                    <span>{elm}</span>
                    <input
                      type="checkbox"
                      checked={detailNums.includes(idx)}
                      onChange={e => e.preventDefault()}
                    />
                  </div>
                ))}
            </DetailOptionList>
          </OptionBox>
          <ApplyFeedback ref={feedbackMsg}></ApplyFeedback>
          <ApplyBtn onClick={applyRooftopGreening}>시공 신청하기</ApplyBtn>
        </ViewPoint>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50vw;
  height: 80vh;

  margin: auto;
  padding: 1rem;

  background-color: #d3d3d3;
  text-align: center;
`

const ViewPoint = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`

const OptionBox = styled.div`
  ${({ theme, boxSize }) => {
    const boxWidth = new Map([
      ["sm", "20%"],
      ["base", "45%"],
      ["lg", "95%"],
    ])
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: ${boxWidth.get(boxSize)};
      margin: 0.5vw auto;
      background-color: ${colors.white};
      padding: ${paddings.base};

      h5 {
        font-size: ${fonts.size.base};
      }

      p {
        margin-bottom: ${margins.sm};
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      span {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      img {
        width: 50%;

        background-size: cover;
        object-fit: cover;

        padding: ${paddings.sm};
        margin: ${margins.sm} 0vw;
      }
    `
  }}
`

const DetailOptionList = styled.div`
  ${({ theme }) => {
    const { margins } = theme
    return css`
      width: 70%;
      margin: ${margins.base} auto;

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .option {
        width: 40%;
        margin: ${margins.sm} 0vw;

        display: flex;
        justify-content: space-between;
        text-align: left;
      }
    `
  }}
`

const ApplyFeedback = styled.p`
  ${({ theme }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.sm} 0vw;

      text-align: center;
      color: ${colors.black.secondary};
      font-size: ${fonts.size.xsm};
      font-weight: 100;
    `
  }}
`

const ApplyBtn = styled.button`
  ${({ theme }) => {
    const { colors, margins, paddings } = theme
    return css`
      width: 30%;
      padding: ${paddings.sm};
      margin: ${margins.sm} auto;

      border: 1px solid ${colors.black.secondary};
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

export default RequiredGreeningRooftop
