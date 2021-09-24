import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5rem;
  max-width: 320px;
  min-height: 320px;
  .image-container {
    max-height: 100px;
    height: 100%;
    width: auto;
    border-radius: 50%;
    > img {
      max-height: 100px;
      width: auto;
      height: 100%;
      border-radius: 50%;
    }
  }
  .content {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > h3 {
      margin-bottom: 1rem;
    }
    > blockquote {
      text-align: center;
    }
  }
`;
