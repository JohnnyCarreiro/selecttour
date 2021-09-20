import styled from 'styled-components'

export const Container = styled.div `
  .wrapper {
    display: flex;
    flex-direction: column;
    max-width: 1140px;
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
`
