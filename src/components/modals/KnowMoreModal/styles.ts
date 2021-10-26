import styled, { css, ThemeProps } from 'styled-components'
import { Theme } from 'styles/styled'

interface ContainerProps extends ThemeProps<Theme> {
  isPackage: boolean
}

export const ModalBackground = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
  padding: 120px 1rem 1rem 0;

  .modal-container {
    width: 500px;
    /* height: ${(props) => props.isPackage ? '500px' : '700px'}; */
    height: 90%;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    padding: 25px;
    overflow-y:auto;
    max-height: 90%;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .modal-container::-webkit-scrollbar {
    display: none;
  }

  .modal-container .title {
    display: inline-block;
    text-align: center;
    margin-top: 10px;
  }

  .close-btn {
    display: flex;
    justify-content: flex-end;
  }

  .close-btn button {
    background-color: transparent;
    border: none;
    font-size: 25px;
    cursor: pointer;
  }

  .modal-container .body {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    font-size: 1.7rem;
    text-align: center;
    margin-top: 2rem;

    > div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      text-align: left;
    }
  }

  .modal-container .footer > div {
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .registration-inputs {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    .registration-name {
      width: 100%;
      > div {
        &+div{
          margin-top: 1rem;
        }
      }
    }
    .registration-contacts {
      margin-top: 1rem;
      width: 100%;
      > div {
        &+div{
          margin-top: 1rem;
        }
      }
    }
    .message-field {
      margin-top: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 0.5rem 0 0.5rem;
    .modal-container {
      position: relative;
      top: 0;
      left: 0;
      width: 90%;
      height: 90%;
      /* height: ${(props) => props.isPackage ? '300px' : '80%'}; */
      padding: 25px;
    }
  }
`
