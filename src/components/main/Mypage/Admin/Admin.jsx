import React, { useContext, useEffect, useState } from "react"
import styled, { css } from "styled-components"

import { ModalContext } from "module/Modal"
import AdminGreenbeeModal from "./Modal/AdminGreenbeeModal"
import AdminRooftopModal from "./Modal/AdminRooftopModal"
import AdminGreenedRooftopModal from "./Modal/AdminGreenedRooftopModal"
import { adminControl } from "api/controls/adminControl"
import Pagination from "components/common/Pagination"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBuilding, faSeedling, faUser } from "@fortawesome/free-solid-svg-icons"

const Admin = () => {
  const { openModal } = useContext(ModalContext)
  const [greenbeeInfo, setGreenbeeInfo] = useState({
    greenbeeList: [],
    greenbeePage: 0,
    greenbeePageLimit: 0,
  })
  const [ownerInfo, setOwnerInfo] = useState({
    ownerList: [],
    ownerPage: 0,
    ownerPageLimit: 0,
  })
  const [rooftopInfo, setRooftopInfo] = useState({
    rooftopList: [],
    rooftopPage: 0,
    rooftopPageLimit: 0,
  })

  const { greenbeeList, greenbeePage, greenbeePageLimit } = greenbeeInfo
  const { ownerList, ownerPage, ownerPageLimit } = ownerInfo
  const { rooftopList, rooftopPage, rooftopPageLimit } = rooftopInfo

  useEffect(() => {
    const getAdminInformation = async () => {
      const { greenbeePageLimit, greenbeeList } = await adminControl.getAdminGreenbee(greenbeePage)
      const { ownerPageLimit, ownerList } = await adminControl.getAdminOwner(ownerPage)
      const { rooftopPageLimit, rooftopList } = await adminControl.getAdminGreenedRooftop(
        rooftopPage,
      )
      setGreenbeeInfo({
        ...greenbeeInfo,
        greenbeePageLimit,
        greenbeeList,
      })
      setOwnerInfo({
        ...ownerInfo,
        ownerPageLimit,
        ownerList,
      })
      setRooftopInfo({
        ...rooftopInfo,
        rooftopPageLimit,
        rooftopList,
      })
    }

    getAdminInformation()
  }, [])

  const applyGreenbeeApprove = async id => {
    try {
      await adminControl.postGreenbeeApprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const applyGreenbeeDisapprove = async id => {
    try {
      await adminControl.deleteGreenbeeDisapprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const applyRooftopApprove = async id => {
    try {
      await adminControl.postOwnerApprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const applyRooftopDisapprove = async id => {
    try {
      await adminControl.deleteOwnerDisapprove(id)
    } catch (err) {
      console.log(err)
    }
  }

  const AdminGreenedRooftopApprove = async id => {
    try {
      await adminControl.postAdminGreenedRooftopApprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const AdminGreenedRooftopDisapprove = async id => {
    try {
      await adminControl.deleteAdminGreenedRooftopDisapprove(id)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Wrapper>
      <ListBox>
        <Title>
          <h5>대기중인 그린비 신청</h5>
        </Title>
        {greenbeeList.length > 0 ? (
          greenbeeList.map(({ memberId, officeNumber, confirmationImage, content }) => (
            <Box
              key={memberId}
              onClick={() => {
                openModal(
                  <AdminGreenbeeModal
                    id={memberId}
                    phone={officeNumber}
                    photo={confirmationImage.fileUrl}
                    content={content}
                    approve={applyGreenbeeApprove}
                    disapprove={applyGreenbeeDisapprove}
                  />,
                )
              }}>
              {`memberId ${memberId} 번 : 그린비 승인 대기 중`}
            </Box>
          ))
        ) : (
          <NoticeEmptyIcon>
            <FontAwesomeIcon icon={faSeedling} />
            <h5>그린비 신청자 목록 없음</h5>
            <p>승인 대기 중인 그린비 신청자가 없습니다.</p>
          </NoticeEmptyIcon>
        )}
        {greenbeePageLimit !== 0 && (
          <Pagination total={greenbeePageLimit} page={greenbeePage} setPage={setGreenbeeInfo} />
        )}
      </ListBox>
      <ListBox>
        <Title>
          <h5>대기중인 옥상지기 신청</h5>
        </Title>
        {ownerList.length > 0 ? (
          ownerList.map(({ memberId, confirmationImage }) => (
            <Box
              key={memberId}
              onClick={() => {
                openModal(
                  <AdminRooftopModal
                    id={memberId}
                    photo={confirmationImage.fileUrl}
                    approve={applyRooftopApprove}
                    disapprove={applyRooftopDisapprove}
                  />,
                )
              }}>
              {`memberId ${memberId} 번 : 옥상지기 승인 대기 중`}
            </Box>
          ))
        ) : (
          <NoticeEmptyIcon>
            <FontAwesomeIcon icon={faUser} />
            <h5>옥상지기 신청자 목록 없음</h5>
            <p>승인 대기 중인 옥상지기 신청자가 없습니다.</p>
          </NoticeEmptyIcon>
        )}
        {ownerPageLimit !== 0 && (
          <Pagination total={ownerPageLimit} page={ownerPage} setPage={setOwnerInfo} />
        )}
      </ListBox>
      <ListBox>
        <Title>
          <h5>승인 대기 중인 옥상 신청</h5>
        </Title>
        {rooftopList.length > 0 ? (
          rooftopList.map(({ id: rooftopId, ownerContent, phoneNumber, structureImage }) => (
            <Box
              key={rooftopId}
              onClick={() => {
                openModal(
                  <AdminGreenedRooftopModal
                    id={rooftopId}
                    photo={structureImage.fileUrl}
                    phoneNum={phoneNumber}
                    ment={ownerContent}
                    approve={AdminGreenedRooftopApprove}
                    disapprove={AdminGreenedRooftopDisapprove}
                  />,
                )
              }}>
              {`rooftopId ${rooftopId} 번 : 승인 대기 중`}
            </Box>
          ))
        ) : (
          <NoticeEmptyIcon>
            <FontAwesomeIcon icon={faBuilding} />
            <h5>등록된 옥상 없음</h5>
            <p>아직 승인 대기 중인 옥상이 없습니다.</p>
          </NoticeEmptyIcon>
        )}
        {rooftopPageLimit !== 0 && (
          <Pagination total={rooftopPageLimit} page={rooftopPage} setPage={setRooftopInfo} />
        )}
      </ListBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 35vw;
  margin: 7.5vh auto;
  display: flex;
  flex-direction: column;
`
const Box = styled.p`
  ${({ theme }) => {
    const { fonts, paddings } = theme
    return css`
      padding: ${paddings.sm};
      display: flex;
      justify-content: space-between;

      font-weight: 200;
      font-size: ${fonts.size.xsm};
    `
  }}
`
const ListBox = styled.div`
  ${({ theme }) => {
    const { colors, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.base} 0;

      color: ${colors.main.primary};
    `
  }}
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

const NoticeEmptyIcon = styled.div`
  ${({ theme }) => {
    const { colors, fonts, paddings, margins } = theme
    return css`
      width: 100%;
      margin: ${margins.lg} auto;

      color: ${colors.main.primary};
      text-align: center;

      h5 {
        font-size: ${fonts.size.base};
        margin-bottom: ${margins.sm};
      }

      p {
        font-size: ${fonts.size.xsm};
        font-weight: 100;
      }

      svg {
        margin-bottom: ${margins.base};
        padding: ${paddings.lg};

        background-color: ${colors.main.secondary};
        border-radius: 20vw;

        color: ${colors.white};
        font-size: ${fonts.size.xl};
      }
    `
  }}
`

export default Admin
