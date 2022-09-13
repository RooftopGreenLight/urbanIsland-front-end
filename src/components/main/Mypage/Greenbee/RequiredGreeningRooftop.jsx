import styled, { css } from "styled-components"
import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"

import { greenbeeControl } from "api/controls/greenbeeControl"
import { RequestDeadLineDate } from "constants/RequestDeadLineDate"
import { RequiredRoofTopOption } from "constants/RequiredRoofTopOption"
import { useRef } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSeedling } from "@fortawesome/free-solid-svg-icons"

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
          <RooftopInfoBox>
            <Title>
              <h5>옥상 기본 정보</h5>
            </Title>
            <RooftopInfoLine>
              <div className="info">
                <span>옥상 위치</span>
                <p>{`${city} ${district} ${detail}`}</p>
              </div>
            </RooftopInfoLine>
            <RooftopInfoLine>
              <div className="info">
                <span>옥상 소유주 번호</span>
                <p>{phoneNumber}</p>
              </div>
            </RooftopInfoLine>
            <RooftopInfoLine>
              <div className="info">
                <span>옥상 시설 소개</span>
                <pre>{ownerContent}</pre>
              </div>
            </RooftopInfoLine>
          </RooftopInfoBox>
          <RooftopInfoBox>
            <Title>
              <h5>시공 관련 정보</h5>
            </Title>
            <RooftopInfoLine>
              <div className="info">
                <span>요구 시공 일정</span>
                <p>{RequestDeadLineDate[requiredTermType]}</p>
              </div>
            </RooftopInfoLine>
            <RooftopInfoLine width={45}>
              <div className="info">
                <span>옥상 시설 면적</span>
                <p>{`${width && width.toLocaleString()} m2`}</p>
              </div>
            </RooftopInfoLine>
            <RooftopInfoLine width={45}>
              <div className="info">
                <span>희망 시공 가격</span>
                <p>{`${widthPrice && widthPrice.toLocaleString()} 원 / m2`}</p>
              </div>
            </RooftopInfoLine>
          </RooftopInfoBox>
          <RooftopInfoBox>
            <Title>
              <h5>희망 세부 옵션</h5>
            </Title>
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
          </RooftopInfoBox>
          <RooftopInfoBox>
            <Title>
              <h5>시설 이미지</h5>
            </Title>
            <img src={structureImage?.fileUrl} alt="Loading" />
            <ApplyFeedback ref={feedbackMsg}></ApplyFeedback>
            <ApplyBtn onClick={applyRooftopGreening}>
              <FontAwesomeIcon icon={faSeedling} /> 시공 신청하기
            </ApplyBtn>
          </RooftopInfoBox>
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
  text-align: center;
`

const ViewPoint = styled.div`
  width: 100%;
  max-height: 100%;
  overflow: auto;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    padding-left: 1rem;
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: #ced4da;
    &:hover {
      background-color: #adb5bd;
    }
  }
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

const RooftopInfoBox = styled.div`
  width: 100%;
  margin-bottom: 5vh;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  text-align: left;

  img {
    width: 80%;
    margin: 2vw auto;
  }
`

const RooftopInfoLine = styled.div`
  ${({ theme, width = 100 }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: ${width}%;
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};

      .info {
        width: 90%;
      }

      span {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      p,
      pre {
        margin: ${margins.xsm} 0vw;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      button {
        width: 10%;
        height: 75%;
        margin: auto;

        border-radius: ${fonts.size.xsm};
        background-color: ${colors.main.secondary};

        color: ${colors.white};
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};

        &:hover {
          background-color: ${colors.main.tertiary};
          font-weight: ${fonts.weight.bold};
        }
      }
    `
  }}
`

const DetailOptionList = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 90%;
      padding: ${paddings.base};

      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .option {
        width: 40%;
        margin: ${margins.sm} 0vw;

        display: flex;
        justify-content: space-between;

        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
        text-align: left;
      }

      input[type="checkbox"] {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;

        background: ${colors.main.quaternary}88;
        border-radius: 4px;

        width: 16px;
        height: 16px;

        &::after {
          border: solid #fff;
          border-width: 0 2px 2px 0;
          content: "";
          display: none;

          width: 15%;
          height: 40%;

          position: relative;
          left: 35%;
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
    const { colors, fonts, margins, paddings } = theme
    return css`
      width: 90%;
      padding: ${paddings.sm} ${paddings.base};
      margin: ${margins.lg} auto;

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

export default RequiredGreeningRooftop
