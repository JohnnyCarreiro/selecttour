import { HTMLAttributes, ReactNode } from 'react'

import { Container } from './styles'

interface ShowcaseProps extends HTMLAttributes<HTMLElement>{
  image: string
  children?: ReactNode
}

export const Hero: React.FC<ShowcaseProps> = ({ children, image, ...rest }) => {
  return (
    <Container image={image} {...rest} >
      <div className="overlay"></div>
      {children}
    </Container>
  )
}
