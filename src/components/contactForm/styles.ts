import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  max-width: 1140px;

  form {
    div {
      padding-top: 1rem;
    }
  }

  @media screen and (max-width:1024px) {
    padding:0 2rem;
  }
`;
