import { ContactForm } from '@/components/contactForm'
import { ReactNode } from 'react'

import { Container } from './styles'

interface LatestsProps {
  content_data:{
    title: string
    subtitle: string
    email: string
    phone: string
  }
}

export const  Contact: React.FC<LatestsProps> =({ content_data }) => {
  const {
    title,
    subtitle,
    email,
    phone
   } = content_data
  return (
    <Container>
      <div className="latests">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <div className="content">
        <ContactForm />
      </div>
    </Container>
  )
}
