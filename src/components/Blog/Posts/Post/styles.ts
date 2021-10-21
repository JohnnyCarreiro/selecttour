import styled from 'styled-components'

export const Container = styled.div`
  .post-content {
    margin: 2rem 0;
    position: relative;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;

    .post-link-image {
      flex: 1;
      position: relative;
      width: 100%;
      z-index: 0;
      margin: 0 0 30px;
      border-radius: 0.5rem;
      display: flex;
      img {
        overflow: hidden;
        border-radius: 0.5rem;
        opacity: 1;
        width: 100%;
        position: relative;
        object-fit: cover;
        z-index: 1;
        transition: opacity .17s ease-in-out,transform .17s ease-in-out;
      }
      :hover{
        opacity: 0.8;
        transform: scale(0.96);
      }
    }
    > .post-info {
      flex: 3;
      width: 100%;
      padding: 0;
      .post-title > a{
        opacity:1;
        font-size: 28px;
        line-height: 1.3em;
        font-weight: 600;
        margin: 0 0 15px;
        transition: opacity .2s ease-in-out;
        :hover {
          opacity: 0.8;
        }
      }
      .post-meta {
        color: ${({theme}) => theme.colors.gray_800};
        padding: 0 1px;
        .post-author {
          display: inline-block;
          margin: 0 10px 0 0;
        }
        .post-date {
          float: none;
          display: inline-block;
          margin: 0 10px 0 0;
        }
      }
      .post-snippet {
        line-height: 1.6em;
        position: relative;
        display: block;
        margin: 10px 0 15px;
        font: ${({theme}) => theme.texts.main_text};
        color: ${({theme}) => theme.colors.gray_600};
      }
      .flat-button {
        display: inline-block;
        /* height: 35px; */
        background-color: ${({theme}) => theme.colors.main};
        font-size: 14px;
        color: #ffffff;
        font-weight: 500;
        line-height: 35px;
        box-sizing: border-box;
        padding: 0 15px;
        margin: 15px 0 0;
        transition: background .17s ease;
        padding: .5rem 2rem;
        border: none;
        border-radius: 0.5rem;
      }
    }
  }
  .divider {
    opacity: 0;
    border-bottom: 1px solid ${({theme}) => theme.colors.gray_1000};
    width: 100%;
    margin-bottom: 1rem;
  }
  &+div {
    margin-top: 3rem;
    .divider {
      opacity: 1;
    }
  }
  @media (max-width:1024px){
    .post-content {
      flex-direction: column;
    }
  }


`
