import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  right: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  /* padding: 100px; */

  display: flex;
  justify-content:space-between;
  align-items: center;

  background-color: ${({theme}) => theme.colors.gray_900};
  color: ${({theme}) => theme.colors.gray_300};
  z-index: 2;

  transition: 0.75px;

  > video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index:-100;
    /* opacity: 0.8; */
  }
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #FAA94399;
    mix-blend-mode: multiply;
    opacity: 0.4;
  }
  :nth-child() {
    z-index: 10;
  }
`
