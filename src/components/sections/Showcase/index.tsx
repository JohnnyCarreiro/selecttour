import React, { useRef } from 'react'
import { ReactNode, HTMLAttributes } from 'react'

import { Container } from './styles'

interface ShowcaseProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export const Showcase: React.FC<ShowcaseProps> = ({ children, ...rest }) => {

  return (
    <Container
      {...rest}
    >
      <video src="assets/showcase.webm" muted loop autoPlay></video>
      <div className="overlay"></div>
      {children}
    </Container>
  )
}
