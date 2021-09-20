import styled from 'styled-components';

export const Container = styled.div`
  display:flex;
  flex-direction: column;
  width:100%;
  padding-left: 2rem;

  .registration{
    h3{
      font: ${({theme}) => theme.texts.sub_title};
      text-transform: uppercase;
    }
  }
  .travel{
    margin-top: 1rem;
    h3{
      font: ${({theme}) => theme.texts.sub_title};
      text-transform: uppercase;
    }
    div{
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.5rem;
      div{
        width: 100%;
        margin-top:0;
        margin:0;
        & + :last-child{
          margin-left: 1rem;
        }
      }
    }
  }

  @media screen and (max-width:1024px) {
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
