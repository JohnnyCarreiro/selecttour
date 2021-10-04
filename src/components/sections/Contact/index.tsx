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
        <h2>Entre em contato</h2>
        <h3>Tire suas dúvidas e planeje viagens incríveis e sem preocupações</h3>
      </div>
      <div className="content">
        <ContactForm />
      </div>
    </Container>
  )
}
