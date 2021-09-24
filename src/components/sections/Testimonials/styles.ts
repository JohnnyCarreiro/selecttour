import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.colors.gray_600};
  padding: 5rem 0 2rem;
  margin:0 auto;
  max-width:1140px;
  margin-bottom:4rem;

  .testimonial {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > h2{
      text-transform: uppercase;
      margin-bottom:2rem;
    }
    > h3 {
      text-align: center;
    }
  }
  .testimonials-container {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin: 0 auto;
    width: 100%;
    align-items: flex-start;
    justify-content: center;
  }
`
