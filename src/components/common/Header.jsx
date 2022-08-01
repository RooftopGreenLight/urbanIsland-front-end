import styled from "styled-components"
import Navbar from "components/common/Navbar"

const Header = () => {
  return (
    <Wrapper>
      <Navbar />
    </Wrapper>
  )
}

const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 1;
`

export default Header
