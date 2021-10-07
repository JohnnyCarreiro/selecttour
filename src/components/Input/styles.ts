import styled, { css, ThemeProps } from 'styled-components'
import { Theme } from 'styles/styled'
import Tooltip from 'components/Tooltip'

interface ContainerProps extends ThemeProps<Theme> {
  isFocused:boolean
  isFilled:boolean
  isErrored: boolean
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: initial;
  width: 100%;
  min-width: 100px;
  /* & + div {
    margin-top:0.5rem;
  } */
  .label {
    display: flex;
    align-items: center;
    margin-left: 0.45rem;
    > label {
      font: ${({theme}) => theme.texts.main_strong};
      color: ${({theme}) => theme.colors.gray_600};
      text-transform: uppercase;
    }
    svg{
      height: 18px;
      width: auto;
      margin-right:0.5rem;
      color:${({theme})=> theme.colors.primary};
    }
  }
`

export const InputContainer = styled.div<ContainerProps>`
  background: '';
  border-radius:.5rem;
  margin-top: .5rem;
  padding:1rem;
  max-width:100%;
  min-width:100px;
  display:flex;
  align-items: center;

  border: 2px solid ${({theme})=>theme.colors.primary};
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
    min-width: 100px;
    background:transparent;
    border:none;
    color:${({theme})=>theme.colors.gray_400};
    font: ${({theme}) => theme.texts.main_text};
    line-height: 1.25rem;
    &::placeholder{
      color:${({theme})=>theme.colors.gray_400};
      font: ${({theme}) => theme.texts.main_text};
    }
  }
  input[type="date"] {
  position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
  color: ${({theme})=>theme.colors.primary};
  width: 22px;
  height: 22px;
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
      color:${({theme})=> theme.colors.primary};
      cursor: pointer;

    }
  `
