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
      width: 100%;
      height: 100%;
      padding-right: 2rem;
      > img {
        height: 100%;
        width: 100%;
      }
      .team {
        border-radius: 50%;
        min-height: 212px;
        max-height: 212px;
        height: 100%;
        width: auto;
        > img {
          object-fit: cover;
          height: 100%;
          width: 100%;
        }
      }
    }
    .mainContent{
      flex:3;
      height:100%;
      width:100%;
      color: ${({theme})=>theme.colors.gray_200};
      margin-bottom: 3rem;
      p:nth-child(n) {
        padding-top: 1rem;
      }
      p:first-child {
        padding-top: 0;
      }
    }
    @media screen and (max-width:1024px){
      .header {
        padding: 0 2rem;
      }
      .container{
        /* display: flex;
        flex-direction:column; */
        flex-wrap: wrap;
        gap: 1rem;
        flex-shrink: initial;
        align-items: flex-start;
        justify-content: center;
        padding:0 2rem;
        & + div{
          margin-top: 4rem;
        }
        .imageContainer{
          display:flex;
          flex-direction:column;
          align-items: center;
          padding: 0;
          margin: 0 auto;
          &+img {
            object-fit: cover;
          }
          .team {
            display:flex;
            flex-direction:column;
            align-items: center;
            padding: 0;
            margin: 0 auto;
            border-radius: 50%;
          }
        }
        .mainContent {
          padding: 0;
        }
      }
    }
    @media screen and (max-width:720px){
      width: 100%;
      height: 100%;
      .header {
        padding: 0 2rem;
        margin-bottom: 2rem;
      }
      .container{
        display: flex;
        flex-direction:column;
        align-items: center;
        justify-content: center;
        padding:0 2rem;

        .imageContainer{
          /* display:flex;
          justify-content: center;
          align-items: center; */
          width: 369px;
          height: 212px;
          &+img {
            object-fit: cover;
            width: 369px;
            height: auto;
          }
          .team {
            display:flex;
            flex-direction:column;
            align-items: center;
            padding: 0;
            margin: 0 auto;
            border-radius: 50%;
          }
        }
        .mainContent {
          margin-top: 2rem;
        }
      }
    }
`
