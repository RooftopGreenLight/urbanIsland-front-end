import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"

import { ModalContext } from "module/Modal"
import AdminGreenbeeModal from "./Modal/AdminGreenbeeModal"
import AdminRooftopModal from "./Modal/AdminRooftopModal"
import AdminGreenedRooftopModal from "./Modal/AdminGreenedRooftopModal"
import { adminControl } from "api/controls/adminControl"
import Pagination from "../Pagination"

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
      // const { ownerPageLimit, ownerList } = await adminControl.getAdminOwner(ownerPage)
      const { rooftopPageLimit, rooftopList } = await adminControl.getAdminGreenedRooftop(
        rooftopPage,
      )
      setGreenbeeInfo({
        ...greenbeeInfo,
        greenbeePageLimit,
        greenbeeList,
      })
      // setOwnerInfo({
      //   ...ownerInfo,
      //   ownerPageLimit,
      //   ownerList,
      // })
      setRooftopInfo({
        ...rooftopInfo,
        rooftopPageLimit,
        rooftopList,
      })
    }

    getAdminInformation()
  }, [rooftopList, ownerList, greenbeeList])

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

  console.log(rooftopList)

  return (
    <Wrapper>
      <ListBox>
        <h1>대기중인 그린비</h1>
        {greenbeeList ? (
          <div>
            {greenbeeList.map(({ memberId, officeNumber, confirmationImage, content }, index) => (
              <Box
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
                {memberId}
              </Box>
            ))}
          </div>
        ) : (
          <p>대기중인 그린비 없음</p>
        )}
        {greenbeePageLimit !== 0 && (
          <Pagination total={greenbeePageLimit} page={greenbeePage} setPage={setGreenbeeInfo} />
        )}
      </ListBox>
      <ListBox>
        <h1>대기중인 옥상지기</h1>
        {ownerList ? (
          <div>
            {ownerList.map(({ memberId, confirmationImage }, index) => (
              <Box
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
                {memberId}
              </Box>
            ))}
          </div>
        ) : (
          <p>대기중인 옥상지기 없음</p>
        )}
        {ownerPageLimit !== 0 && (
          <Pagination total={ownerPageLimit} page={ownerPage} setPage={setOwnerInfo} />
        )}
      </ListBox>
      <ListBox>
        <h1>이미 녹화된 옥상 승인</h1>
        {rooftopList ? (
          <div>
            {rooftopList.map(({ id, ownerContent, phoneNumber, structureImage }) => (
              <Box
                onClick={() => {
                  openModal(
                    <AdminGreenedRooftopModal
                      id={id}
                      photo={structureImage.fileUrl}
                      phoneNum={phoneNumber}
                      ment={ownerContent}
                      approve={AdminGreenedRooftopApprove}
                      disapprove={AdminGreenedRooftopDisapprove}
                    />,
                  )
                }}>
                {id}
              </Box>
            ))}
          </div>
        ) : (
          <p>대기중인 이미 녹화된 옥상 없음</p>
        )}
        {rooftopPageLimit !== 0 && (
          <Pagination total={rooftopPageLimit} page={rooftopPage} setPage={setRooftopInfo} />
        )}
      </ListBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  margin-left: 10vw;
`
const Box = styled.div`
  padding: 0.4rem;
  border-top: 1px solid gray;
  display: flex;
  justify-content: space-between;
`
const ListBox = styled.div`
  margin: 2rem 0;
  border-bottom: 1px solid gray;
  width: 65%;
`

export default Admin
