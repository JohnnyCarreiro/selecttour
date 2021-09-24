import styled from 'styled-components'

export const Container = styled.div`
  padding: 5rem 0 2rem;
  color: ${({theme})=>theme.colors.gray_600};

  .latests {
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin:0 auto;
    max-width:1140px;
    margin-bottom:4rem;
    > h2{
      text-transform: uppercase;
      margin-bottom:2rem;
    }
    > h3 {
      text-align: center;
    }
  }
  .content {
    display:flex;
    align-items:flex-start;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin:0 auto;
    max-width:1140px;
    width: 100%;
  }
`
