import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleRight } from "@fortawesome/free-solid-svg-icons"
const Box = styled.div`
  padding: 0.6rem;
  border-bottom: 1px solid gray;
  display: flex;
  justify-content: space-between;
`
const ListBox = styled.ul`
  margin-top: 2rem;
  border-top: 1px solid gray;
  width: 65%;
`
const MypageList = ({ props }) => {
  return (
    <ListBox>
      {props.map(d => (
        <li>
          <Box>
            <span>{d}</span>
            <FontAwesomeIcon icon={faAngleRight} />
          </Box>
        </li>
      ))}
    </ListBox>
  )
}
export default MypageList
