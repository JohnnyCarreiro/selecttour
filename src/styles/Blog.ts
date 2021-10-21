import styled from 'styled-components'

export const Container = styled.div `
  background: ${({theme}) => theme.colors.white};
  margin: 0 auto;
  width: 100%;
  padding: 0;
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
    /* position: static; */
    display: flex;
    align-items: flex-start;
    height: auto;
    flex-wrap: wrap;
    flex-grow: 1;
    flex-shrink: 0;
    margin: 0 auto;
    width: 100%;
    .posts {
      flex: 3;
      width: 100%;
      height: 100%;
      margin-bottom: 2.5rem;
      padding: 1rem;
      .header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 5rem;
        > h2 {
          margin-bottom: 2rem;
        }
      }
      .widget-content {
        padding-top: 3rem;
        position: relative;
        float: left;
        width: 100%;
      }
    }
    .sidebar {
      display: flex;
      position: sticky;
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
    .posts {
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
