import styled from 'styled-components'

interface IBlogProps {
  image: string
}

export const Container = styled.div<IBlogProps>`
  position: relative;
  right: 0;
  width: 100%;
  min-height: 70vh;
  height: 100%;
  /* padding: 100px; */

  display: flex;
  justify-content:space-between;
  align-items: center;
  justify-content:center;

  background-color: ${({theme}) => theme.colors.gray_900};
  color: ${({theme}) => theme.colors.gray_300};
  z-index: 2;

  transition: 0.75px;

  background-image: linear-gradient(135deg, #243E9299, #E9912399),url(${({image})=>image});
  background-size:cover;
  background-position:center;
  background-repeat: no-repeat;

  >img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    z-index:-100;
    padding-top: 4rem;
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

  @media screen and (max-width:1024px){
    > video {

      object-fit: fit;
      object-position: 65% 40%;
      top: 0.25rem;
    }
  }
`
