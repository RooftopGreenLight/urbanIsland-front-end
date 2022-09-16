import styled from "styled-components"
import { useState } from "react"

import { InputBox } from "components/common/Style/Mypage/CommonStyle"

const ApplyBaseInfo = ({ applyInfo, changeInfo }) => {
  const [applyBaseInfo, setApplyBaseInfo] = useState(applyInfo)
  const { phoneNumber, width, widthPrice, totalPrice, ownerContent, rooftopType } = applyBaseInfo

  const changeInput = e => {
    const { name, value } = e.target
    setApplyBaseInfo({ ...applyBaseInfo, [name]: value })
    changeInfo({ ...applyInfo, [name]: value })
  }

  return (
    <Wrapper>
      {rooftopType === "G" ? (
        <InputBox boxSize="lg">
          <div className="title">
            <h5>연락처</h5>
            <p>옥상 소유자의 연락처를 입력해주세요.</p>
          </div>
          <input
            name="phoneNumber"
            value={phoneNumber}
            placeholder="연락처"
            onChange={changeInput}
          />
        </InputBox>
      ) : (
        <>
          <InputBox boxSize="base">
            <div className="title">
              <h5>연락처</h5>
              <p>옥상 소유자의 연락처를 입력해주세요.</p>
            </div>
            <input
              name="phoneNumber"
              value={phoneNumber}
              placeholder="연락처"
              onChange={changeInput}
            />
          </InputBox>
          <InputBox boxSize="base">
            <div className="title">
              <h5>시공 가격 </h5>
              <p>
                희망 시공 가격을 입력해주세요. (단위 : m<sup style={{ fontSize: "0.5rem" }}>2</sup>/
                KRW)
              </p>
            </div>
            <input
              name="widthPrice"
              value={widthPrice}
              placeholder="시공 가격"
              onChange={changeInput}
            />
          </InputBox>
        </>
      )}
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
          <h5>{rooftopType === "G" ? "옥상지기 측 멘트" : "그린비에게 보내는 멘트"}</h5>
          <p>등록하시려는 옥상 시설에 대한 소개글을 작성해주세요.</p>
        </div>
        <textarea
          rows="4"
          cols="50"
          name="ownerContent"
          value={ownerContent}
          placeholder="이곳에 자유롭게 소개글을 작성해주세요."
          onChange={changeInput}
        />
      </InputBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

export default ApplyBaseInfo
