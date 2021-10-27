import styled from 'styled-components'

export const Container = styled.div `
  background: ${({theme}) => theme.colors.white};
  margin: 0 auto;
  width: 100%;
  padding: 0;
  position: relative;
  h1 {
    font: ${({theme}) => theme.texts.main_title};
    color: ${({theme}) => theme.colors.gray_500};
  }
  h2 {
    font: ${({theme}) => theme.texts.title};
    color: ${({theme}) => theme.colors.gray_500};
  }
  h3 {
    font: ${({theme}) => theme.texts.sub_title};
    color: ${({theme}) => theme.colors.gray_500};
  }
  strong {
    font-weight: 700;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 70rem;
    margin: 0 auto;
  }
  .hero-content {
    text-align: center;
    h1 {
      margin-top: 2rem;
      font: ${({theme}) => theme.texts.main_title};
      color: ${({theme}) => theme.colors.main};
    }
    h2 {
      margin: 1rem;
      font: ${({theme}) => theme.texts.title};
      color: ${({theme}) => theme.colors.main};
    }
  }
  .section-bg {
    background-color: ${({theme}) => theme.colors.white};
  }

  .main-section {
    position: relative;
    display: flex;
    align-items: flex-start;
    height: auto;
    margin: 0 auto;
    width: 100%;
    .posts {
      position: relative;
      flex: 3;
      width: 100%;
      height: 100%;
      margin-bottom: 2.5rem;
      padding: 1rem;
      .header {
        padding: 0 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5rem;
        > h2 {
          margin-bottom: 2rem;
        }
      }
      .widget-content {
        display: flex;
        flex-direction: column;
        padding-top: 3rem;
        position: relative;
        float: left;
        width: 100%;
        .post-content {
          border-radius: 0.625rem;
          background-color: #ffffff;
          border: solid 1px ${({theme}) => theme.colors.white};
          padding: 15px;
          position: relative;
          width: 100%;
          margin-top: 0.5rem;
          h2 {
            margin: 2rem 0 1rem;
          }
          p {
            color: ${({theme}) => theme.colors.gray_800};
          }
          /* > div > * {
            padding-top: 1rem;
          } */
          > div {
            position: relative;
            width: 100%;
            overflow: hidden;

            text-align: left;
            img {
              margin-top: 1em;
              padding: 0 1em;
              max-width: inherit;
              width: 100%;
              height: auto;
              border-radius: 5%;
            }
            *:nth-child(n) {
                padding-top: 1rem;
              }
              *:first-child {
                padding-top: 0;
              }
          }
        }
      }
    }
    .sidebar {
      position: sticky;
      flex: 1;
      display: flex;
      top: 40px;
      flex: 1;
      padding-top: 4rem;
      flex-grow: 1;
    }
  }



  .elevation {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 12px 32px rgba(0, 0, 0, 0.25));
  }
  @media (max-width:1024px){
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    padding: 0;
    .main-section {
      position: relative;
      display: inline-block;
      flex-direction: column;
      align-items: center;
      justify-content:center;
      margin: 0 auto;
      padding: 0;
      .posts {
        min-width: 100%;
      }
      .posts {
        position: relative;
        /* min-width: 425px; */
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
      }
      .sidebar {
        padding: 1rem;
      }
    }
  }
  @media (max-width:375px){
    .main-section {
      display: inline-block;
      flex-direction: column;
      align-items: center;
      justify-content:center;
      margin: 0 auto;
      padding: 0;
      .posts {
        min-width: 100%;
      }
    }
    .wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
  }
`
