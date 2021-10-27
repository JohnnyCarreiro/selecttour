import { HTMLAttributes, ReactNode } from 'react'

import { Container } from './styles'

interface ShowcaseProps extends HTMLAttributes<HTMLElement>{
  image: string
  children?: ReactNode
}

export const Hero: React.FC<ShowcaseProps> = ({ children, image, ...rest }) => {
  return (
    <Container image={image} {...rest} >
      {/* <video src="assets/showcase.webm" muted loop autoPlay></video> */}
      {/* <img src="https://images.prismic.io/selecttour/4a8c29d7-1559-4c96-8e2f-863c65040f39_foto-abre-pgalinhas011.jpg" alt="" /> */}
      <div className="overlay"></div>
      {children}
    </Container>
  )
}
