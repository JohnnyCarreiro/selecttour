import { ContactForm } from '@/components/contactForm'
import { ReactNode } from 'react'

import { Container } from './styles'

interface LatestsProps {
  children?: ReactNode
}

export const  Contact: React.FC<LatestsProps> =({ children }) => {
  return (
    <Container>
      <div className="latests">
        <h2>Ultimas do blog</h2>
        <h3>Confira nossa ultimas postagens e tenha inspirações incriveis para suas príximas férias</h3>
      </div>
      <div className="content">
        <ContactForm />
      </div>
    </Container>
  )
}
