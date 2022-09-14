import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons"

const Pagination = ({ total, page, setPage }) => {
  const numPages = total - 1
  const movePage = (current, value) => {
    if (current === 0 || current === numPages) {
      return
    }
    setPage(prevPage => ({ ...prevPage, page: current + value }))
  }
  return (
    <Wrapper>
      <div className="btn-list">
        <Arrow icon={faAngleLeft} onClick={() => movePage(page, -1)} disabled={page === 0} />
        {Array(numPages + 1)
          .fill()
          .map((_, idx) => (
            <Button
              key={idx}
              onClick={() => setPage(idx)}
              aria-current={page === idx ? "page" : null}>
              {idx + 1}
            </Button>
          ))}
        <Arrow icon={faAngleRight} onClick={() => movePage(page, 1)} disabled={page === numPages} />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  width: 100%;
  margin: 2rem auto 0rem auto;

  .btn-list {
    width: 12.5%;
    margin: 0vw auto;
    display: flex;
    justify-content: space-between;
  }
`

const Arrow = styled(FontAwesomeIcon)`
  ${({ disabled }) => {
    return css`
      background-color: ${disabled ? "#c7c7c7" : "#005a00"};
      color: white;
      padding: 0.25rem;
    `
  }}
`

const Button = styled.button`
  background-color: transparent;
  color: #005a00;
`

export default Pagination
