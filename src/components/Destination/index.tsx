import { ReactNode } from 'react'
import { FaStar } from 'react-icons/fa'
import Button from '../Button'

import { Container } from './styles'

interface PackageProps {
  content_data: {
    image: string
    destination: string
    tours: string
    places: string
  }
  children?: ReactNode
}

export const Destination:React.FC<PackageProps> = ({ children, content_data }) => {
  const {
    image,
    destination,
    tours,
    places
   } = content_data
  return (
    <Container className="elevation">
      <div className="img-container">
        <img src={image} alt="Destino" />
      </div>
      <div className="destination-info">
        <div className="destination-header">
          <h3>{destination}</h3>
          <div>
            <p>{tours}</p>
            <p>{places}</p>
          </div>
        </div>
        <div className="ctas">
          <Button text="Saiba mais" primaryColor isPrimary={false} />
          <Button text="Reservar" primaryColor isPrimary />
        </div>
      </div>
    </Container>
  )
}
