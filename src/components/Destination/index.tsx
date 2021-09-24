import { ReactNode } from 'react'
import { FaStar } from 'react-icons/fa'
import Button from '../Button'

import { Container } from './styles'

interface PackageProps {
  children?: ReactNode
}

export const Destination:React.FC<PackageProps> = ({ children }) => {
  return (
    <Container className="elevation">
      <div className="img-container">
        <img src="assets/images/travel.png" alt="Destino" />
      </div>
      <div className="destination-info">
        <div className="destination-header">
          <h3>Japão</h3>
          <div>
            <p>20 tours</p>
            <p>15 lugares</p>
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
