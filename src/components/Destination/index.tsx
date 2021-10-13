import { ReactNode, useState } from 'react'
import { Dispatch, SetStateAction } from 'hoist-non-react-statics/node_modules/@types/react'

import KnowMoreModal from '../modals/KnowMoreModal'

import Button from '../Button'
import { Container } from './styles'

interface PackageProps {
  content_data: {
    image: string
    destination: string
    tours: string
    places: string
  }
  openModal: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
}

export const Destination:React.FC<PackageProps> = ({ children, content_data, openModal }) => {
  const [isOpenModal, setModalState] = useState(false)

  const {
    image,
    destination,
    tours,
    places
   } = content_data
  return (
    <>
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
            <Button
              className="open-modal-btn"
              text="Saiba mais"
              primaryColor
              isPrimary={false}
              // onClick={() => openModal(true)}
              onClick={() => setModalState(true)}
            />
          </div>
        </div>
      </Container>
      {isOpenModal
        && <KnowMoreModal
              isPackage={false}
              title={destination}
              closeModal={setModalState}
              requestSource="Destinos Tops"
            />}
    </>
  )
}
