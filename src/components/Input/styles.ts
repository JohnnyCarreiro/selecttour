import styled, { css, ThemeProps } from 'styled-components'
import { Theme } from 'styles/styled'
import Tooltip from 'components/Tooltip'

interface ContainerProps extends ThemeProps<Theme> {
  isFocused:boolean
  isFilled:boolean
  isErrored: boolean
}

export const Container = styled.div`
  & + div {
    margin-top:0.5rem;
  }
  > label {
    display: none;
    font: ${({theme}) => theme.texts.sub_title};
    text-transform: uppercase;
    font-size:  1.5rem;
    padding-left:0.25rem;
  }
`

export const InputContainer = styled.div<ContainerProps>`
  background: '';
  border-radius:.5rem;
  margin-top: .5rem;
  padding:1rem;
  width:100%;
  display:flex;
  align-items: center;

  border: 2px solid ${({theme})=>theme.colors.gray_1000};
  color: ${({theme})=>theme.colors.gray_400};

  ${props=>props.isErrored && css`
    border-color:#c53030;
  `}
  ${props=>props.isFocused && css`
    color:${({theme})=>theme.colors.secondary};
    border-color:${({theme})=>theme.colors.secondary};
  `}
  ${props=>props.isFilled && css`
    color:${({theme})=>theme.colors.secondary};
  `}
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus,
  select:-webkit-autofill,
  select:-webkit-autofill:hover,
  select:-webkit-autofill:focus {
    border: none;
    -webkit-text-fill-color: ${({theme})=>theme.colors.secondary};
    -webkit-box-shadow: 0 0 0px 1000px #EDF5FF inset;
    box-shadow:0 0 0px 1000px #EDF5FF inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  input{
    flex:1;
    background:transparent;
    border:none;
    color:${({theme})=>theme.colors.gray_1000};
    font: ${({theme}) => theme.texts.main_text};
    &::placeholder{
      color:${({theme})=>theme.colors.gray_1000};
      font: ${({theme}) => theme.texts.main_text};
    }
  }
  svg{
    margin-right:1rem;
    color:${({theme})=> theme.colors.gray_1000};
  }
`
export const Error = styled(Tooltip)`
  height:1.25rem;
  margin-left:1rem;
  svg{
    margin:0;
  }
  span{
    background:#c53030;
    color: #fff;

    &::before{
      border-color:#c53030 transparent;
    }
  }
  `
  export const PassIcon = styled.div`
    height:1.25rem;
    margin-left:1rem;
    svg{
      margin:0;
      color:${({theme})=> theme.colors.gray_1000};
      cursor: pointer;

    }
  `
