import styled from 'styled-components'

export const Container = styled.div`
  .snippet-post-content {
    margin: 2rem 0;
    position: relative;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
    width: 100%;
    max-width: 100%;

    .snippet-post-link-image {
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
    .snippet-post-info {
      flex: 3;
      width: 100%;
      padding: 0;
      .snippet-post-title > a{
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
      .snippet-post-meta {
        color: ${({theme}) => theme.colors.gray_800};
        padding: 0 1px;
        .snippet-post-author {
          display: inline-block;
          margin: 0 10px 0 0;
        }
        .snippet-post-date {
          display: inline-block;
          margin: 0 10px 0 0;
        }
      }
      .snippet-post-snippet {
        line-height: 1.6em;
        position: relative;
        display: block;
        margin: 10px 0 15px;
        font: ${({theme}) => theme.texts.main_text};
        color: ${({theme}) => theme.colors.gray_600};

        background: linear-gradient(${({theme})=> theme.colors.gray_100}, transparent);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .flat-button {
        display: inline-block;
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
    .snippet-post-content {
      flex-direction: column;
    }
  }


`
