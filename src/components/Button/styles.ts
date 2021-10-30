import styled from 'styled-components'

export const Container = styled.div<{primaryColor:boolean}>`
  /* button:disabled,
  button[disabled]{
    border: 1px solid #999999;
    background-color: #cccccc;
    color: #666666;
  } */
  /* button:disabled,
  button[disabled]{
    opacity: 0.6;
    cursor: default;

    :hover {
      opacity: 0.6;
    }
  } */
  .primary{
    background-color:${({primaryColor})=> primaryColor ? ({theme})=> theme.colors.primary :({theme})=> theme.colors.secondary };
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    text-align:center;
    border-radius:0.25rem;
    margin-top:2.5rem;
    padding:0.5rem 2rem;
    transition:.2s;
    cursor:pointer;
    border: 2px solid transparent;
    a{
      text-align:center;
      color:${({theme})=>theme.colors.gray_1000};
      font: ${({theme}) => theme.texts.sub_title};
      text-transform: uppercase;
    }
  }
  .primary:hover{
      background:transparent;
      border: 2px solid ${({primaryColor})=> primaryColor ? ({theme})=> theme.colors.primary :({theme})=> theme.colors.secondary };
      a{
        color:${({primaryColor})=> primaryColor ? ({theme})=> theme.colors.primary :({theme})=> theme.colors.secondary };
      }
    }
  .secondary{
    background:transparent;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    text-align:center;
    border: 2px solid ${({primaryColor})=> primaryColor ? ({theme})=> theme.colors.primary :({theme})=> theme.colors.secondary };
    border-radius:0.25rem;
    padding:0.5rem 2rem;
    margin-top:2.5rem;
    transition:0.2s;

    a{
      text-align:center;
      color:${({primaryColor})=> primaryColor ? ({theme})=> theme.colors.primary :({theme})=> theme.colors.secondary };
      font: ${({theme}) => theme.texts.sub_title};
    }
  }
  .secondary:hover{
    background:${({primaryColor})=> primaryColor ? ({theme})=> theme.colors.primary :({theme})=> theme.colors.secondary };
    opacity:0.7;
    a{
      color:${({primaryColor})=> primaryColor ? ({theme})=> theme.colors.white :({theme})=> theme.colors.white };
    }
  }
  button:disabled,
  button[disabled]{
    opacity: 0.6;
    cursor: default;

    :hover {
      background: transparent;
      color:${({theme})=> theme.colors.primary};
      opacity: 0.6;
      > * {
        color:${({theme})=> theme.colors.primary};
      }
    }
  }
`
