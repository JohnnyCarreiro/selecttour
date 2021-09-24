import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display:flex;
  flex-direction: column;
  width:100%;
  /* padding-top: 80px; */
  z-index: 9;
  margin-top:-160px;
  margin-bottom: 2rem;
  border-radius: 0.5rem;
  background: ${({theme}) => theme.colors.white};
  margin-bottom: 5rem;
  form {
    position: relative;
    z-index:9;
    color: ${({theme}) => theme.colors.gray_100};
  }
  .travel-tab{
    position: absolute;
    top:0;
    left:0;
    height: 54px;
    max-width: 340px;
    border-radius: 0.5rem 0.5rem 0 0;
    padding: 1rem;
    border: 2px solid ${({theme}) => theme.colors.secondary};
    border-bottom: 2px solid ${({theme}) => theme.colors.white};;

    font: ${({theme}) => theme.texts.sub_title};
    color: ${({theme}) => theme.colors.primary};
    text-transform: uppercase;
  }
  .travel-form {
    margin-top: 52px;
    border-top: 2px solid ${({theme}) => theme.colors.secondary};
    padding: 2rem;
  }

  .travel-inputs {
    display: flex;
    flex-direction: column;
    > div {
      display: flex;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
      & + div {
        display: flex;
        gap: 1rem;
        align-items: end;
      }
    }
  }
  .registration-inputs {
    display: flex;
    margin-top: 2rem;
    align-items: flex-end;
    justify-content: space-between;

    > div {
      width: 100%;
      flex:4;
    }
    > :last-child {
      display: flex;
      align-items: flex-end;
      justify-content: end;
      flex:1;
    }

    .registration-name {
      display: flex;
      gap: 1rem;
      width: 100%;
    }
    .registration-contacts {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      width: 100%;
    }
    .message-field {
      margin-top: 1rem;
    }
  }


  @media screen and (max-width:1024px) {
    margin-bottom: 5rem;
    padding:0;
  }
  @media (max-width: 891px){
    .travel{
      div{
        display: inline-block;
        width: 100%;
        margin-top: 0.5rem;
        div{
          width: 100%;
          margin:0;
          & + :last-child{
            margin-top: 0.5rem;
            margin-left: 0;
          }
        }
      }
    }
  }
`;
