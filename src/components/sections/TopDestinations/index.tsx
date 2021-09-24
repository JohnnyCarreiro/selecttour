import { ReactNode } from 'react'

import { Container } from './styles'

interface TopPackagesProps {
  children?: ReactNode
}

export const TopDestinations: React.FC<TopPackagesProps> = ({ children }) => {
  return (
    <Container>
      <div className="destinations">
        <h2>Conheça estes destinos em Alta</h2>
        <h3>Selecionamos lugares especias que valem muito a pena conhecer, consulte-nos para mais informações</h3>
      </div>
      <div className="dest-container">
        {children}
      </div>
    </Container>
  )
}
