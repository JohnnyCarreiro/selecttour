import { set } from 'lodash'
import { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { FaStar } from 'react-icons/fa'
import Button from '../Button'
import KnowMoreModal from '../modals/KnowMoreModal'
import { RequestFormModal } from '../modals/RequestFormModal'

import { Container } from './styles'

interface PackageProps {
  package_data: {
    image: string
    destination: string
    value: string
    time_amount: string
    hotel_classification: string
    transportations: string
    meal_options: string
    qualification: string
  }
  openModal?: Dispatch<SetStateAction<boolean>>
  requestTravel?: Dispatch<SetStateAction<boolean>>
  children?: ReactNode
}

export const Package:React.FC<PackageProps> = ({ children, package_data, openModal }) => {
  const [isOpenModal, setModalState] = useState(false)
  const [isOpenRequestModal, setRequestModalState] = useState(false)
  const {
    image,
    destination,
    value,
    time_amount,
    hotel_classification,
    transportations,
    meal_options,
    qualification
  } = package_data
  return (
    <>
      <Container className="elevation">
        <div className="img-container">
          <img src={image} alt="Destino" />
        </div>
        <div className="destination-info">
          <div className="destination-header">
            <h3>{ destination }</h3>
            <h3>{ value }</h3>
          </div>
          <div className="divider"/>
          <div className="characteristics">
            <div>
              <p>{ time_amount }</p>
              <p>{ hotel_classification }</p>
            </div>
            <div>
              <p>{transportations}</p>
              <p>{meal_options}</p>
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
              <Button
                text="Saiba mais"
                primaryColor
                isPrimary={false}
                onClick={() => setModalState(true)}
              />
              <Button
                text="Reservar"
                primaryColor
                isPrimary
                onClick={() => setRequestModalState(true)}
              />
            </div>
          </div>
        </div>
      </Container>
      {isOpenModal && <KnowMoreModal title={destination} isPackage={true} closeModal={setModalState} />}
      {isOpenRequestModal && <RequestFormModal isPackage={true} closeModal={setRequestModalState} />}
    </>
  )
}
