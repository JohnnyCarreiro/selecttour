import styled from 'styled-components'

export const Container = styled.div`
    /* background: ${({theme})=>theme.colors.gray_500}; */
    padding: 5rem 0 2rem;
    color: ${({theme})=>theme.colors.gray_600};
    .about{
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
    }
    .imageContainer{
      flex:1;
      height:100%;
      width:100%;
      padding-right: 2rem;
    }
    .mainContent{
      flex:2;
      color: ${({theme})=>theme.colors.gray_200};
      h2{
        color: ${({theme})=>theme.colors.gray_600};
        margin-bottom: 1rem;
      }

      div{
        & + div{
          margin-top: 2rem;
        }
      }
    }
    @media screen and (max-width:1024px){
      .container{
        display:flex;
        flex-direction:column;
        align-items:flex-start;
        margin:0 2rem;
        max-width:1140px;

        & + div{
          margin-top: 2rem;
        }
        .imageContainer{
          margin-bottom: 2rem;
        }
      }
    }
`
