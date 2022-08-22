import { useContext } from "react"
import styled from "styled-components"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"

import { ModalContext } from "module/Modal"
import FindMyRooftopOwner from "components/main/Mypage/Greenbee/Modal/FindMyRooftopOwner"

const Greenbee = () => {
  const { openModal } = useContext(ModalContext)
  return (
    <Wrapper>
      <ListBox>
        <Box onClick={() => openModal(<FindMyRooftopOwner />)}>
          <span>본인을 선택한 옥상 확인하기</span> <FontAwesomeIcon icon={faAngleRight} />
        </Box>
        <Box>
          <span>녹화가 필요한 옥상 찾기</span> <FontAwesomeIcon icon={faAngleRight} />
        </Box>
        <Box>
          <span>그린비 페이지 확인/수정</span> <FontAwesomeIcon icon={faAngleRight} />
        </Box>
      </ListBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ;
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
`
const Box = styled.div`
  padding: 0.6rem;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
`
const ListBox = styled.div`
  margin-top: 2rem;
  border-top: 1px solid gray;
  width: 65%;
`

export default Greenbee
