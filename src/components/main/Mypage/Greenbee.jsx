import React from "react"
import styled from "styled-components"
import MypageList from "./MypageList"
const Wrapper = styled.div`
  background-color: ;
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
`

const Greenbee = () => {
  const listInput = [
    "본인을 선택한 옥상 확인하기",
    "녹화가 필요한 옥상 찾기",
    "그린비 페이지 확인/수정",
  ]
  return (
    <Wrapper>
      <MypageList props={listInput} />
    </Wrapper>
  )
}
export default Greenbee
