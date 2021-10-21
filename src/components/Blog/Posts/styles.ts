import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 0.625rem;
  background-color: #ffffff;
  border: solid 1px ${({theme}) => theme.colors.white};
  padding: 15px;
  position: relative;
  width: 100%;
  margin-top: 0.5rem;
`
