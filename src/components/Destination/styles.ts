import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  min-height: 548px;
  width: 100%;
  height: auto;
  border:none;
  border-radius: 1rem;
  background: ${({theme}) => theme.colors.white};

  margin-bottom: 0;

  .img-container {
    overflow: hidden;
    width: 100%;
    min-height: 312px;
    max-height: 312px;
    img {
      object-fit: cover;
      min-height: 312px;
      max-height: 312px;
      height: 100%;
      width: 100%;
      border-radius: 1rem;
    }
  }
  .destination-info {
    flex-grow: initial;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: auto;
    background: ${({theme}) => theme.colors.white};
    border-radius: 0.5rem;
    margin-top: -2rem;
    padding: 1rem;

    .destination-header {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 1rem 0;
      text-transform: uppercase;
    }

      .ctas {
        display:flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        height: 100%;
        padding-bottom: 0;
      }
  }

`
