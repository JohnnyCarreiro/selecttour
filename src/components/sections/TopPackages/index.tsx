import { ReactNode } from 'react'

import { Container } from './styles'

interface TopPackagesProps {
  children?: ReactNode
}

export const TopPackages: React.FC<TopPackagesProps> = ({ children }) => {
  return (
    <Container>
      <div className="packages">
        <h2>Pacotes Especiais</h2>
        <h3>Selecionamos pacotes especias para maximizar suas experiência e conforto</h3>
      </div>
      <div className="container">
        {children}
      </div>
    </Container>
  )
}
