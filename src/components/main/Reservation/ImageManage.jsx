import { useState } from "react"
import styled, { css } from "styled-components"
const Wrapper = styled.div`
  position: relative;
  height: ${props => props.height};
  width: ${props => props.width};
`
const Image = styled.img`
  height: ${props => props.height};
  width: ${props => props.width};
`
const Box = styled.div`
  ${({
    showMagnifier,
    magnifierHeight,
    magnifieWidth,
    x,
    y,
    imgWidth,
    imgHeight,
    zoomLevel,
    src,
  }) => {
    return css`
      display: ${showMagnifier ? "" : "none"};
      position: absolute;
      pointer-events: none;
      height: ${magnifierHeight}px;
      width: ${magnifieWidth}px;
      top: ${y - magnifierHeight / 2}px;
      left: ${x - magnifieWidth / 2}px;
      opacity: 1;
      border: 1px solid lightgray;
      background-color: white;
      background-image: url(${src});
      background-repeat: no-repeat;
      background-size: ${imgWidth * zoomLevel}px ${imgHeight * zoomLevel}px;
      background-position-x: ${-x * zoomLevel + magnifieWidth / 2}px;
      background-position-y: ${-y * zoomLevel + magnifierHeight / 2}px;
    `
  }}
`
const ImageManage = ({
  src,
  width,
  height,
  magnifierHeight = 100,
  magnifieWidth = 100,
  zoomLevel = 1.5,
}) => {
  const [[x, y], setXY] = useState([0, 0])
  const [[imgWidth, imgHeight], setSize] = useState([0, 0])
  const [showMagnifier, setShowMagnifier] = useState(false)
  return (
    <Wrapper>
      <Image
        width={width}
        height={height}
        src={src}
        onMouseEnter={e => {
          const elem = e.currentTarget
          const { width, height } = elem.getBoundingClientRect()
          setSize([width, height])
          setShowMagnifier(true)
        }}
        onMouseMove={e => {
          const elem = e.currentTarget
          const { top, left } = elem.getBoundingClientRect()
          const x = e.pageX - left - window.pageXOffset
          const y = e.pageY - top - window.pageYOffset
          setXY([x, y])
        }}
        onMouseLeave={() => {
          setShowMagnifier(false)
        }}
      />

      <Box
        showMagnifier={showMagnifier}
        magnifierHeight={magnifierHeight}
        magnifieWidth={magnifieWidth}
        x={x}
        y={y}
        imgWidth={imgWidth}
        imgHeight={imgHeight}
        zoomLevel={zoomLevel}
        src={src}></Box>
    </Wrapper>
  )
}
export default ImageManage
