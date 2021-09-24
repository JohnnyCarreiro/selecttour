import { ReactNode } from 'react'
import { FaStar } from 'react-icons/fa'
import Button from '../Button'

import { Container } from './styles'

interface PackageProps {
  children?: ReactNode
}

export const Package:React.FC<PackageProps> = ({ children }) => {
  return (
    <Container className="elevation">
      <div className="img-container">
        <img src="assets/images/travel.png" alt="Destino" />
      </div>
      <div className="destination-info">
        <div className="destination-header">
          <h3>Destino Top</h3>
          <h3>R$ 10.000,00</h3>
        </div>
        <div className="divider"/>
        <div className="characteristics">
          <div>
            <p>Acomodações 5 dias e 6 noites</p>
            <p> 5 estrelas</p>
          </div>
          <div>
            <p>Transporte</p>
            <p>Próximo de Restaurantes</p>
          </div>
          <div className="google-reviews">
            <div className="reviews">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
            <p>Reviews do Google</p>
          </div>
          <div className="ctas">
            <Button text="Saiba mais" primaryColor isPrimary={false} />
            <Button text="Reservar" primaryColor isPrimary />
          </div>
        </div>
      </div>
    </Container>
  )
}
