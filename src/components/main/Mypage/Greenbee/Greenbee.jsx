import { useContext } from "react"
import styled, { css } from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import FindMyRooftopOwner from "components/main/Mypage/Greenbee/Modal/FindMyRooftopOwner"
import { Link, useNavigate } from "react-router-dom"

const Greenbee = () => {
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()
  return (
    <Wrapper>
      <ServiceList>
        <Title>
          <h5>서비스 등록하기</h5>
        </Title>
        <ServiceBox onClick={() => openModal(<FindMyRooftopOwner />)}>
          <div className="introduce">
            <h5>본인을 선택한 옥상 확인하기</h5>
            <p>옥상 녹화 작업을 의뢰한 옥상 목록을 확인합니다.</p>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
        <Link to="/mypage/greenbee/required-greening">
          <ServiceBox>
            <div className="introduce">
              <h5>녹화가 필요한 옥상 찾기</h5>
              <p>옥상 녹화 작업이 필요한 옥상 목록을 확인합니다.</p>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </ServiceBox>
        </Link>
        <Link to="/mypage/greenbee/info">
          <ServiceBox>
            <div className="introduce">
              <h5>내 그린비 페이지</h5>
              <p>나의 그린비 페이지를 확인하고, 이를 수정합니다..</p>
            </div>
            <button onClick={() => openModal(() => navigate("/mypage/greenbee/info"))}>변경</button>
          </ServiceBox>
        </Link>
      </ServiceList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  height: 75vh;
  margin: auto;

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

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const ServiceBox = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      display: flex;
      justify-content: space-between;
      padding: ${paddings.base};
      border-bottom: 1px solid ${colors.main.primary}55;

      p {
        color: ${colors.black.quinary};
        font-weight: ${fonts.weight.light};
      }

      h5 {
        margin-bottom: 0.25rem;
        color: ${colors.black.secondary};
        font-size: ${fonts.size.sm};
      }

      svg {
        margin: auto 0vw;
        color: ${colors.main.primary};
      }

      button {
        width: 10%;
        padding: ${paddings.sm} 0vw;
        margin: auto 0vw auto auto;

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

export default Greenbee
