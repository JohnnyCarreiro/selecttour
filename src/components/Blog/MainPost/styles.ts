import styled from 'styled-components'

export const Container = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  border: solid 1px ${({theme}) => theme.colors.white};
  padding: 15px;
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;

  .main-post-content {
    text-align: center;
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    .main-post-link-image {
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
      :hover {
        opacity: 0.8;
        transform: scale(0.96);
      }
    }
    .main-post-info {
      flex: 1;
      width: 100%;
      padding: 0;
      .main-post-title > a{
        font: ${({theme}) => theme.texts.title};
        transition: opacity .17s ease-in-out;
        :hover {
          opacity:0.8;
        }
      }
      .main-post-meta {
        margin-top: 1rem;
        color: ${({theme}) => theme.colors.gray_800};
        padding: 0 1px;
        .main-post-author {
          display: inline-block;
          margin: 0 10px 0 0;
        }
        .main-post-date {
          float: none;
          display: inline-block;
          margin: 0 10px 0 0;
        }
      }
      .main-post-snippet {
        line-height: 1.6em;
        position: relative;
        display: block;
        margin: 10px 0 15px;
        font: ${({theme}) => theme.texts.main_text};
        color: ${({theme}) => theme.colors.gray_600};
      }
      .flat-button {
        display: inline-block;
      }
    }
  }
`
