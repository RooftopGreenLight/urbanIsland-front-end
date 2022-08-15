import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalContext } from "module/Modal"
import AdminGreenbeeModal from "./Modal/AdminGreenbeeModal"
import AdminRooftopModal from "./Modal/AdminRooftopModal"
import AdminGreenedRooftopModal from "./Modal/AdminGreenedRooftopModal"
import { adminControl } from "api/adminControl"
import Pagination from "../Pagination"
const Wrapper = styled.div`
  background-color: ;
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
const Admin = () => {
  const { openModal } = useContext(ModalContext)
  const [gList, setGList] = useState([])
  const [rList, setRList] = useState([])
  const [gPage, setGpage] = useState(0)
  const [gPageLimit, setGpageLimit] = useState(0)
  const [rPageLimit, setRpageLimit] = useState(0)
  const [grtPageLimit, setGRTpageLimit] = useState(0)
  const [rPage, setRpage] = useState(0)
  const [grtList, setGRTList] = useState([])
  const [grtPage, setGRTpage] = useState(0)

  const applyGreenbeeApprove = async id => {
    try {
      const result = adminControl.postGreenbeeApprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const applyGreenbeeDisapprove = async id => {
    try {
      const result = adminControl.deleteGreenbeeDisapprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const applyRooftopApprove = async id => {
    try {
      const result = adminControl.postOwnerApprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const applyRooftopDisapprove = async id => {
    try {
      const result = adminControl.deleteOwnerDisapprove(id)
    } catch (err) {
      console.log(err)
    }
  }

  const AdminGreenedRooftopApprove = async id => {
    try {
      const result = adminControl.postAdminGreenedRooftopApprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  const AdminGreenedRooftopDisapprove = async id => {
    try {
      const result = adminControl.deleteAdminGreenedRooftopDisapprove(id)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    const getAdminGreenbee = async event => {
      const data = await adminControl.getAdminGreenbee(gPage)
      setGList(data.greenBeeInfoResponses)
      setGpageLimit(data.totalPages)
    }
    getAdminGreenbee()

    const getAdminRooftop = async event => {
      const data = await adminControl.getAdminOwner(rPage)
      setRList(data.ownerInfoResponses)
      setRpageLimit(data.totalPages)
    }
    getAdminRooftop()

    const getAdminGreenedRooftop = async event => {
      const data = await adminControl.getAdminGreenedRooftop(grtPage)
      setGRTList(data)
      setGRTpageLimit(data.totalPages)
    }
    getAdminGreenedRooftop()
  }, [rPage, gPage, grtList])

  return (
    <Wrapper>
      <ListBox>
        <h1>대기중인 그린비</h1>
        {gList.length != 0 ? (
          <div>
            {gList.map((d, index) => (
              <Box
                onClick={() => {
                  openModal(
                    <AdminGreenbeeModal
                      id={d.memberId}
                      phone={d.officeNumber}
                      photo={d.confirmationImage.fileUrl}
                      content={d.content}
                      approve={applyGreenbeeApprove}
                      disapprove={applyGreenbeeDisapprove}
                    />,
                  )
                }}>
                {d.memberId}
              </Box>
            ))}
          </div>
        ) : (
          <p>대기중인 그린비 없음</p>
        )}{" "}
        <Pagination total={gPageLimit} page={gPage} setPage={setGpage} />
      </ListBox>
      <ListBox>
        <h1>대기중인 옥상지기</h1>
        {rList.length != 0 ? (
          <div>
            {rList.map((d, index) => (
              <Box
                onClick={() => {
                  openModal(
                    <AdminRooftopModal
                      id={d.memberId}
                      photo={d.confirmationImage.fileUrl}
                      approve={applyRooftopApprove}
                      disapprove={applyRooftopDisapprove}
                    />,
                  )
                }}>
                {d.memberId}
              </Box>
            ))}
          </div>
        ) : (
          <p>대기중인 옥상지기 없음</p>
        )}{" "}
        {rPageLimit != 0 && <Pagination total={rPageLimit} page={rPage} setPage={setRpage} />}
      </ListBox>
      <ListBox>
        <h1>이미 녹화된 옥상 승인</h1>
        {grtList.length != 0 ? (
          <div>
            {grtList.map((d, index) => (
              <Box
                onClick={() => {
                  openModal(
                    <AdminGreenedRooftopModal
                      id={d.memberId}
                      photo={d.파일URL}
                      ment={d.파일멘트}
                      approve={AdminGreenedRooftopApprove}
                      disapprove={AdminGreenedRooftopDisapprove}
                    />,
                  )
                }}>
                {d.memberId}
              </Box>
            ))}
          </div>
        ) : (
          <p>대기중인 이미 녹화된 옥상 없음</p>
        )}{" "}
        {grtPageLimit != 0 && (
          <Pagination total={grtPageLimit} page={grtPage} setPage={setGRTpage} />
        )}
      </ListBox>
    </Wrapper>
  )
}
export default Admin
