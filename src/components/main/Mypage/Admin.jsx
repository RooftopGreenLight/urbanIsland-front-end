import React, { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { ModalContext } from "module/Modal"
import AdminGreenbeeModal from "./Modals/AdminGreenbeeModal"
import AdminRooftopModal from "./Modals/AdminRooftopModal"
import axios from "axios"
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
  const [rPage, setRpage] = useState(0)

  const applyGreenbeeApprove = async id => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/green-bees/accept`, {
        params: {
          memberId: id,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    } catch (err) {
      console.log(err)
    }
  }
  const applyGreenbeeDisapprove = async id => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/green-bees/reject`, {
        params: {
          memberId: id,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    } catch (err) {
      console.log(err)
    }
  }
  const applyRooftopApprove = async id => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/green-bees/accept`, {
        params: {
          memberId: id,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    } catch (err) {
      console.log(err)
    }
  }
  const applyRooftopDisapprove = async id => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_BASE_URL_ADMIN}/green-bees/reject`, {
        params: {
          memberId: id,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    } catch (err) {
      console.log(err)
    }
  }

  const accessToken = JSON.parse(localStorage.getItem("access_token"))

  useEffect(() => {
    const getAdminGreenbee = async event => {
      const data = await axios.get(`${process.env.REACT_APP_BASE_URL_ADMIN}/green-bees/waits`, {
        params: {
          page: gPage,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      setGList(data.data.data.greenBeeInfoResponses)
    }
    getAdminGreenbee()

    const getAdminRooftop = async event => {
      const data = await axios.get(`${process.env.REACT_APP_BASE_URL_ADMIN}/owner/waits`, {
        params: {
          page: rPage,
        },
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      setRList(data.data.data.ownerInfoResponses)
    }
    getAdminRooftop()
  }, [rPage, gPage])

  return (
    <Wrapper>
      <ListBox>
        <h1>대기중인 그린비</h1>
        {gList == [] ? (
          <div>
            {gList.map((d, index) => (
              <Box
                onClick={() => {
                  openModal(
                    <AdminGreenbeeModal
                      id={d.memberId}
                      phone={d.officeNumber}
                      photo={d.confirmationImage.fileUrl}
                      approve={applyGreenbeeApprove}
                      disapprove={applyGreenbeeDisapprove}
                    />,
                  )
                }}>
                {d.memberId}
              </Box>
            ))}
            <button onClick={() => setGpage(gPage + 1)}>다음페이지</button>
          </div>
        ) : (
          <p>대기중인 그린비 없음</p>
        )}
      </ListBox>
      <ListBox>
        <h1>대기중인 옥상지기</h1>
        {rList == [] ? (
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
            <button onClick={() => setRpage(rPage + 1)}>다음페이지</button>
          </div>
        ) : (
          <p>대기중인 옥상지기 없음</p>
        )}{" "}
      </ListBox>
    </Wrapper>
  )
}
export default Admin
