import styled from "styled-components"
import { useState } from "react"

import { InputBox } from "components/common/Style/Mypage/CommonStyle"

const ApplyDetailInfo = ({ applyInfo, changeInfo }) => {
  const [applyDetailInfo, setApplyDetailInfo] = useState(applyInfo)
  const { roleContent, refundContent } = applyDetailInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyDetailInfo({ ...applyDetailInfo, [name]: value })
    changeInfo({ ...applyInfo, [name]: value })
  }

  return (
    <Wrapper>
      <InputBox>
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
      <InputBox>
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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;
`

export default ApplyDetailInfo
