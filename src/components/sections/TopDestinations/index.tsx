import { Destination } from '@/components/Destination'
import { ReactNode } from 'react'

import { Container } from './styles'

interface TopPackagesProps {
  content_data: {
    title: string
    subtitle: string
    destinations: Array<{
      image: string
      destination: string
      tours: string
      places: string
    }>
  }
  children?: ReactNode
}

export const TopDestinations: React.FC<TopPackagesProps> = ({ children, content_data }) => {
  const {
    title,
    subtitle,
    destinations,
  } = content_data
  return (
    <Container>
      <div className="destinations">
        <h2>{ title }</h2>
        <h3>{ subtitle }</h3>
      </div>
      <div className="dest-container">
        {destinations.map(destination =>
          <Destination key={destination.destination} content_data={destination} />
        )}
      </div>
    </Container>
  )
}
