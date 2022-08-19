import styled from "styled-components"
const Button = styled.button``
const Pagination = ({ total, page, setPage }) => {
  const numPages = total - 1
  return (
    <nav>
      <Button onClick={() => setPage(page - 1)} disabled={page === 0}>
        &lt;
      </Button>
      {Array(numPages + 1)
        .fill()
        .map((v, i) => (
          <Button key={i} onClick={() => setPage(i)} aria-current={page === i ? "page" : null}>
            {i + 1}
          </Button>
        ))}
      <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
        &gt;
      </Button>
    </nav>
  )
}

export default Pagination
