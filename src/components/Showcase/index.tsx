import { ReactNode } from 'react'

import { Container } from './styles'

interface ShowcaseProps {
  children: ReactNode
}

export const Showcase: React.FC<ShowcaseProps> = ({ children }) => {
  return (
    <Container>
      <video src="assets/showcase.webm" muted loop autoPlay></video>
      <div className="overlay"></div>
      {children}
    </Container>
  )
}
