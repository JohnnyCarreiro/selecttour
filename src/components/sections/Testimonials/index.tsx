import { Testimonial } from '@/components/Testimonial'
import { ReactNode } from 'react'

import { Container } from './styles'

interface TestimonialsProps {
  testimonials: {
    main_title: string;
    subtitle: string
  }
  children?: ReactNode
}

export const Testimonials: React.FC<TestimonialsProps> = ({ children, testimonials }) => {
  const { main_title, subtitle } = testimonials
  return (
    <Container>
      <div className="testimonial">
        <h2>{main_title}</h2>
        <h3>{subtitle}</h3>
      </div>
      <div className="testimonials-container">
        <Testimonial testimonial={{name: "John Doe", imageUrl: "assets/images/avatar.jpg",text: "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor."}} />
        <Testimonial testimonial={{name: "John Doe", imageUrl: "assets/images/avatar.jpg",text: "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor."}} />
        <Testimonial testimonial={{name: "John Doe", imageUrl: "assets/images/avatar.jpg",text: "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor."}} />
      </div>
    </Container>
  )
}

export default Testimonials
