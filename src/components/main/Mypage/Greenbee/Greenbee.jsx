import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import { Wrapper, Title, ServiceList, ServiceBox } from "components/common/Style/Mypage/CommonStyle"
import FindMyRooftopOwner from "components/main/Mypage/Greenbee/Modal/FindMyRooftopOwner"

const Greenbee = () => {
  const { openModal } = useContext(ModalContext)
  const navigate = useNavigate()
  return (
    <Wrapper>
      <ServiceList>
        <Title>
          <h5>그린비 사무소 관리하기</h5>
        </Title>
        <ServiceBox onClick={() => openModal(<FindMyRooftopOwner />)}>
          <div className="introduce">
            <h5>본인을 선택한 옥상 확인하기</h5>
            <p>옥상 녹화 작업을 의뢰한 옥상 목록을 확인합니다.</p>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
        <ServiceBox>
          <Link to="/mypage/greenbee/info">
            <div className="introduce">
              <h5>내 그린비 페이지</h5>
              <p>나의 그린비 페이지를 확인하고, 이를 수정합니다.</p>
            </div>
          </Link>
          <button onClick={() => navigate("/mypage/greenbee/edit")}>수정</button>
        </ServiceBox>
      </ServiceList>
      <ServiceList>
        <Title>
          <h5>녹화 작업 진행하기</h5>
        </Title>
        <ServiceBox>
          <Link to="/mypage/greenbee/required-greening">
            <div className="introduce">
              <h5>녹화가 필요한 옥상 찾기</h5>
              <p>옥상 녹화 작업이 필요한 옥상 목록을 확인합니다.</p>
            </div>
          </Link>
          <FontAwesomeIcon icon={faAngleRight} />
        </ServiceBox>
      </ServiceList>
    </Wrapper>
  )
}

export default Greenbee
