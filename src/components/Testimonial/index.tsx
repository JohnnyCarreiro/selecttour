import { ReactNode } from 'react'
import { Container } from './styles'

interface TestimonialProps {
  content_data: {
    image: string
    name: string
    testimonial: string
  }
  children?: ReactNode
}

export const Testimonial:React.FC<TestimonialProps> = ({ children, content_data }) => {
  const { name, image, testimonial } = content_data
  return (
    <Container>
      <div className="image-container">
        <img src={image} alt="" />
      </div>
      <div className="content">
        <h3>{name}</h3>
        <blockquote>{testimonial}</blockquote>
      </div>
    </Container>
  )
}
