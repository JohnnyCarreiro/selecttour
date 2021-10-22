import React, { useRef } from 'react'
import { ReactNode, HTMLAttributes } from 'react'
import { useOnScreen } from '@/utils/useOnScreen'

import { Container } from './styles'

interface ShowcaseProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
}

export const Showcase: React.FC<ShowcaseProps> = ({ children, ...rest }) => {
  const ref: any = useRef<HTMLDivElement>()

  return (
    <Container id="home" ref={ref} {...rest} >
      <video src="assets/showcase.webm" muted loop autoPlay></video>
      <div className="overlay"></div>
      {children}
    </Container>
  )
}
