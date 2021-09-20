import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  text:string
  link?:string
  isPrimary:boolean
  primaryColor?:boolean
}

const Button: React.FC<ButtonProps> = ({text, link, isPrimary, primaryColor, ...rest}) => {
  return (
    <Container primaryColor={primaryColor ? primaryColor : false}>
      <button {...isPrimary ? {className:'primary'} : {className:'secondary'}} >
        <a href={link} {...rest} > {text} </a>
      </button>
    </Container>
  );
};

export default Button;
