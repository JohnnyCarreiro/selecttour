import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 360px;
  width: 100%;
  height: 100%;
  border:none;
  border-radius: 1rem;
  background: ${({theme}) => theme.colors.white};
  .blog-tag {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background: ${({theme}) => theme.colors.white};
    border-radius: .5rem .5rem 0 0;
    padding: 1rem;
  }
  .img-container {
    overflow: hidden;
    width: 100%;
    min-height: 290px;
    max-height: 290px;
    img {
      display: block;
      margin: auto;

      height: 100%;
      max-height: 100%;

      width: 100%;
      max-width: 100%;
      border-radius: 1rem;
    }
  }
  .latest-info {
    height: 100%;
    width: 100%;

    background: ${({theme}) => theme.colors.white};
    border-radius: 0.5rem;
    margin-top: -2rem;
    padding: 1rem;

    > h3 {
      margin-bottom: 1rem;
    }
    .read-more {
      margin-top: 1rem;
      color: ${({theme}) => theme.colors.primary};
      font: ${({theme}) => theme.texts.main_strong};
    }
  }

`
