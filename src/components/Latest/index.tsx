import { ReactNode } from 'react'
import { FaStar } from 'react-icons/fa'
import Button from '../Button'

import { Container } from './styles'

interface PackageProps {
  children?: ReactNode
}

export const Latest:React.FC<PackageProps> = ({ children }) => {
  return (
    <Container className="elevation">
      <div className="blog-tag">
        <p>Lugares para visitar</p>
        <p>01/01/2021</p>
      </div>
      <div className="img-container">
        <img src="assets/images/travel.png" alt="Destino" />
      </div>
      <div className="latest-info">
        <h3>Titulo do post</h3>
        <p>Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Per aumento de cachacis, eu reclamis. Paisis, filhis, espiritis santis. Cevadis im ampola pa arma uma pindureta.</p>

        <div className="read-more">
          <a href=""> Leia Mais </a>
        </div>
      </div>
    </Container>
  )
}
