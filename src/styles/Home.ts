import styled, { keyframes } from 'styled-components'

export const Container = styled.div `
  background: ${({theme}) => theme.colors.gray_1000};
  .wrapper {
    display: flex;
    flex-direction: column;
    max-width: 70rem;
    margin: 0 auto;
  }
  .sowcase-content {
    text-align: center;
    h1 {
      margin-top: 2rem;
      font: ${({theme}) => theme.texts.main_title};
      color: ${({theme}) => theme.colors.main};
    }
    h2 {
      margin: 1rem;
      font: ${({theme}) => theme.texts.title};
      color: ${({theme}) => theme.colors.main};
    }
  }
  .section-bg {
    background-color: ${({theme}) => theme.colors.white};
  }

  .elevation {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 12px 32px rgba(0, 0, 0, 0.25)) drop-shadow(-2px 0px 12px rgba(0, 0, 0, 0.25)) drop-shadow(2px 0px 12px rgba(0, 0, 0, 0.25));
  }
  @media (max-width:1024px){
    .sowcase-content {
      margin: 0 2rem;
    }
  }
`
