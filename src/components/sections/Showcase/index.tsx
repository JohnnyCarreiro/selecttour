import React from 'react'
import { ReactNode, HTMLAttributes } from 'react'

import { Container } from './styles'

interface ShowcaseProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export const config = { amp: true }

export const Showcase: React.FC<ShowcaseProps> = ({ children, ...rest }) => {

  return (
    <Container
      {...rest}
    >
      <video
        // preload="none"
        src="assets/showcase.webm"
        muted
        loop
        autoPlay
        playsInline
      />
      <div className="overlay"></div>
      {children}
    </Container>
  )
}
