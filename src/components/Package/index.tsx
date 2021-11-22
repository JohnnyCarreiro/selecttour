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
    know_more_infos: string
    reservation: string
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
    qualification,
    reservation,
    know_more_infos
  } = package_data
  const stars = [1,2,3,4,5]
  return (
    <>
      <Container className="elevation">
        <div className="img-container">
          <img loading={"lazy"} src={image} alt="Destino" />
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
                {
                  stars.map((_, index) => {
                    const keyIndex = destination + (index++)
                    while (index <= Number(qualification)-1) {
                      return (
                        <FaStar
                          key={keyIndex}
                          className='active'
                        />
                      )
                    }
                    return <FaStar key={keyIndex} />
                  })
                }
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
      {isOpenModal
        && <KnowMoreModal
            title={destination}
            isPackage={true}
            closeModal={setModalState}
            know_more_infos={know_more_infos}
          />
      }
      {isOpenRequestModal
        && <RequestFormModal
              title={destination}
              isPackage={true}
              closeModal={setRequestModalState}
              requestSource="Pacotes Especiais"
              reservation={reservation}
            />}
    </>
  )
}
