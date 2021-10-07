import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  width: 100%;
  height: 100%;
  border:none;
  border-radius: 1rem;
  background: ${({theme}) => theme.colors.white};
  .img-container {
    overflow: hidden;
    width: 100%;
    min-height: 312px;
    max-height: 312px;
    img {
      object-fit: cover;
      display: block;
      min-height: 312px;
      max-height: 312px;
      height: 100%;
      width: 100%;
      border-radius: 1rem;
    }
  }
  .destination-info {
    height: 100%;
    width: 100%;

    background: ${({theme}) => theme.colors.white};
    border-radius: 0.5rem;
    margin-top: -2rem;
    padding: 1rem;

    .destination-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 0;
    }
    .divider {
      border-bottom: 1px solid ${({theme}) => theme.colors.gray_900};
      width: 100%;
      margin-bottom: 1rem;
    }
    .characteristics {
      > div {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        width: 100%;

        > p {
          padding: 1rem 0;
          width: 100%;
          flex: 1;
          &+:last-child {
            text-align: end;
          }
        }
      }

      .google-reviews {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .reviews {
          flex: 1;
          display: flex;
          align-items: center;
          > svg {
            margin-left: 0.25rem;
          }
          & + :first-child {
            margin-left: 0;
          }
        }
        > p {
          text-align: end;
        }
      }
      .ctas {
        display:flex;
        align-items: center;
        justify-content: space-between;
      }
    }

  }

`
