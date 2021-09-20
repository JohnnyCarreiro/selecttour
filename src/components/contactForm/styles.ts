import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  padding-left: 1rem;

  @media screen and (max-width:1024px) {
    padding:0;
  }
`;
