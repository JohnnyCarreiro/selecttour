import { ReactNode } from 'react'
import { Container } from './styles'

interface TestimonialProps {
  testimonial: {
    name: string
    imageUrl: string
    text: string
  }
  children?: ReactNode
}

export const Testimonial:React.FC<TestimonialProps> = ({ children, testimonial }) => {
  const { name, imageUrl, text } = testimonial
  return (
    <Container>
      <div className="image-container">
        <img src={imageUrl} alt="" />
      </div>
      <div className="content">
        <h3>{name}</h3>
        <blockquote>{text}</blockquote>
      </div>
    </Container>
  )
}
