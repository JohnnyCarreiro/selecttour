import { createGlobalStyle } from 'styled-components'

import { ThemeType } from './theme'

interface Props {
    theme: ThemeType
}
export const GlobalStyle = createGlobalStyle<Props>`
  *, *::after, *::before {
    box-sizing:border-box;
    margin: 0;
    outline:none;
    padding:0;
  }

  html{
    @media (max-width: 1080px){
      font-size:93.75%;
    }
    @media (max-width: 720px){
      font-size:87.5%;
    }
    background-color: ${({theme}) => theme.colors.gray_900};
  }

  body{
    background: ${({theme}) => theme.colors.gray_900};
    color: ${({theme}) => theme.colors.gray_1000};
  }

  body, input, textarea, select, button{
    font: ${({theme}) => theme.texts.main_text};
  }
  h1{
    font: ${({theme}) => theme.texts.main_title};
  }
  h2{
    font: ${({theme}) => theme.texts.title};
  }
  h3{
    font: ${({theme}) => theme.texts.sub_title};
  }
  button{
    cursor:pointer;
  }
  p, a, textarea, input{
    font: ${({theme}) => theme.texts.main_text};
  }

  a{
    color:inherit;
    text-decoration: none;
  }

  li{
    list-style: none;
  }

`
