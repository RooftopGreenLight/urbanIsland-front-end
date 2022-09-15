import styled, { css } from "styled-components"
import { useContext, useState, useEffect } from "react"

import { greenbeeControl } from "api/controls/greenbeeControl"
import { roofTopControl } from "api/controls/roofTopControl"
import { useNavigate } from "react-router-dom"
import { ModalContext } from "module/Modal"

import RequiredGreeningFilter from "../Modal/RequiredGreeningFilter"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleXmark, faFilter, faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons"

const RequiredGreeningList = () => {
  const navigate = useNavigate()
  const { openModal } = useContext(ModalContext)
  const [rooftopList, setRooftopList] = useState([])
  const [appliedFilter, setAppliedFilter] = useState(null)
  useEffect(() => {
    const loadRequiredList = async () => {
      let reqList
      try {
        if (appliedFilter) {
          reqList = await roofTopControl.getRooftopSearch(appliedFilter)
        } else {
          reqList = await greenbeeControl.getRequiredGreen()
        }
        setRooftopList(reqList)
      } catch (err) {
        console.log(err)
      }
    }
    loadRequiredList()
  }, [appliedFilter])

  return (
    <Wrapper>
      <Title>
        <h5>옥상 녹화 필요 시설 목록</h5>
        <RooftopFilterBtn
          isApplied={appliedFilter ? true : false}
          onClick={() =>
            !appliedFilter
              ? openModal(
                  <RequiredGreeningFilter
                    appliedFilter={appliedFilter}
                    setAppliedFilter={setAppliedFilter}
                  />,
                )
              : setAppliedFilter(null)
          }>
          <FontAwesomeIcon icon={appliedFilter ? faFilter : faFilterCircleXmark} />
          필터 {appliedFilter ? "ON" : "OFF"}
        </RooftopFilterBtn>
      </Title>
      <GridRoofTopList>
        {rooftopList.map(({ city, detail, district, mainImage, id }, idx) => (
          <RoofTopInfo
            fileUrl={mainImage.fileUrl}
            key={idx}
            onClick={() => navigate(`/mypage/greenbee/required-greening/${id}`)}>
            <div className="rooftop-info">
              <h5>{`${city} ${district}`}</h5>
              <p>{detail}</p>
            </div>
          </RoofTopInfo>
        ))}
        {rooftopList.length < 9 &&
          [...Array(9 - rooftopList.length).keys()].map(_ => (
            <EmptyRooftop>
              <FontAwesomeIcon icon={faCircleXmark} />
              <h5>항목 없음</h5>
              <p>옥상 정보가 없습니다.</p>
            </EmptyRooftop>
          ))}
      </GridRoofTopList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  margin: 7.5vh auto auto auto;

  display: flex;
  flex-direction: column;

  text-align: center;
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

const RooftopFilterBtn = styled.button`
  ${({ theme, isApplied }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 17.5%;
      height: 90%;
      padding: ${paddings.xsm};
      margin: auto;

      border-radius: ${fonts.size.xsm};
      background-color: ${!isApplied ? colors.main.secondary : colors.main.tertiary};

      color: ${colors.white};
      font-size: ${fonts.size.xsm};
      font-weight: ${fonts.weight.light};

      svg {
        margin: auto ${margins.xsm} auto 0vw;
      }

      &:hover {
        font-weight: ${fonts.weight.bold};
      }
    `
  }}
`

const GridRoofTopList = styled.div`
  ${({ theme }) => {
    const { paddings, margins } = theme
    return css`
      width: 35vw;
      height: 35vw;
      padding: 0vw ${paddings.base};
      margin-top: ${margins.lg};

      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
      grid-gap: 10px 10px;
    `
  }}
`

const RoofTopInfo = styled.div`
  ${({ theme, fileUrl }) => {
    const { colors, fonts, paddings } = theme
    return css`
      width: 100%;
      height: 100%;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      cursor: pointer;
      overflow: hidden;
      background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.25)), url(${fileUrl});
      background-size: cover;

      color: ${colors.white};
      text-align: left;

      .rooftop-info {
        padding: ${paddings.sm};
        h5 {
          font-size: ${fonts.size.sm};
        }

        p {
          font-size: ${fonts.size.xsm};
          font-weight: ${fonts.weight.light};
        }
      }
    `
  }}
`

const EmptyRooftop = styled.div`
  ${({ theme, fileUrl }) => {
    const { colors, fonts, margins } = theme
    return css`
      width: 100%;
      height: 100%;

      background-color: #efefef;
      box-shadow: inset 0 1px 1px 1px ${colors.black.primary}15;
      color: ${colors.black.quinary};

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      h5 {
        font-size: ${fonts.size.sm};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: ${fonts.weight.light};
      }

      svg {
        margin-bottom: ${margins.sm};
        font-size: ${fonts.size.xl};
      }
    `
  }}
`

export default RequiredGreeningList
