import { Testimonial } from '@/components/Testimonial'
import { ReactNode } from 'react'

import { Container } from './styles'

interface TestimonialsProps {
  content_data: {
    title: string
    subtitle: string
    testimonials: Array<{
      image: string
      name: string
      testimonial: string
    }>
  }
  children?: ReactNode
}

export const config = { amp: true }

export const Testimonials: React.FC<TestimonialsProps> = ({ children, content_data }) => {
  const { title, subtitle, testimonials } = content_data
  return (
    <Container>
      <div className="testimonial">
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <div className="testimonials-container">
        { testimonials.map(testimonial =>
          <Testimonial key={testimonial.name} content_data={testimonial} />
        ) }
      </div>
    </Container>
  )
}

export default Testimonials
