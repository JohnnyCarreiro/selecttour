import styled from 'styled-components'

export const Container = styled.div`
    padding: 5rem 0 2rem;
    color: ${({theme})=>theme.colors.gray_600};
    .header{
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

  .container{
    display:flex;
    align-items:flex-start;
    margin:0 auto;
    max-width:1140px;
    height:100%;
    width:100%;
    }
    .imageContainer{
      flex: 1;
      object-fit: cover;
      min-height: 212px;
      max-height: 212px;
      padding-right: 2rem;
      > img {
        height: 100%;
        width: 100%;
      }
      .team {
        border-radius: 50%;
        object-fit: cover;
        display: block;
        min-height: 212px;
        max-height: 212px;
        height: 100%;
        width: auto;
        > img {
          height: 100%;
          width: auto;
        }
      }
    }
    .mainContent{
      flex:3;
      height:100%;
      width:100%;
      color: ${({theme})=>theme.colors.gray_200};
      margin-bottom: 3rem;
      padding: 0.5rem;

      div {
        height:100%;
        width:100%;
      }
    }
    @media screen and (max-width:1024px){
      .header {
        padding: 0 2rem;
      }
      .container{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        padding:0 2rem;
        max-width:1140px;

        & + div{
          margin-top: 2rem;
        }
        .imageContainer{
          margin-bottom: 2rem;
          .team {
            border-radius: 50%;
          }
        }
      }
    }
`
