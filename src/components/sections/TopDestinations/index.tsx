import { ReactNode, useState } from 'react'
import { Destination } from '@/components/Destination'
import KnowMoreModal from '@/components/modals/KnowMoreModal'


import { Container } from './styles'

interface TopPackagesProps {
  content_data: {
    title: string
    subtitle: string
    destinations: Array<{
      image: string
      destination: string
      highlights: string
      know_more_infos: string
    }>
  }
}

export const config = { amp: true }

export const TopDestinations: React.FC<TopPackagesProps> = ({ content_data }) => {
  const [isOpenModal, setModalState] = useState(false)
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
        {destinations.map((destination, index) =>
          <Destination key={destination.image+index} openModal={setModalState} content_data={destination} />
        )}
      </div>
    </Container>
  )
}
