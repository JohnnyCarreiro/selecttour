import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import axios from 'axios'
import { FaChild, FaEnvelope, FaHotel, FaPlaneArrival, FaPlaneDeparture, FaScroll, FaUser, FaWhatsapp } from 'react-icons/fa'
import { MdEvent, MdEventSeat } from 'react-icons/md'

import { Container } from './styles'
import { Input } from 'components/Input'
import getValidationErrors from 'utils/getValidationErrors'
import Button from 'components/Button'
import { TextArea } from 'components/TextArea'

interface SignInFormData {
  name: string
  surname: string
  email: string
  phone: string
  observations: string
  from: string
  to: string
  departure: string
  returns: string
  adults: string
  childs: string
  childrenAge: string
  flightClass: string
  accomodation: string
}

interface RequestFormData {
  current?:  Promise<React.RefObject<HTMLDivElement>>
}

export const RequestTravel:React.FC<RequestFormData> = ({current}) => {

  const formRef = useRef<FormHandles>(null)

  const history = useRouter()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [departure, setDeparture] = useState('')
  const [returns, setReturns] = useState('')
  const [adults, setAdults] = useState('')
  const [childs, setChilds] = useState('')
  const [childrenAge, setChildrenAge] = useState('')
  const [flightClass, setFlightClass] = useState('')
  const [accomodation, setAccomodation] = useState('')

  const [observations, setObservations] = useState('')

  const requestSource = 'Solicite um Pacote'

  console.log('length: ',childs.length)
  const handleSubmit = useCallback( async (data: SignInFormData) =>{
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        from:Yup.string()
          .required(String('Local de partida é obrigatório')),
        to:Yup.string()
          .required(String('Destino é obrigatório')),
        departure:Yup.string()
          .required(String('Data de partida é obrigatória')),
        returns:Yup.string()
          .required(String('Data de retorno é obrigatória')),
        adults:Yup.string()
          .required(String('Quantidade de Adultos é obrigatória')),
        childs: Yup.string().when('childrenAge', {
          is: (childrenAge:string) => childrenAge === '',
          then: Yup.string(),
          otherwise: Yup.string().required(String('Informe a quantidade e crianças')),
        }),
        childrenAge: Yup.string().when('childs', {
          is: (childs: string) => childs === '',
          then: Yup.string(),
          otherwise: Yup.string().required(String('Informe a idade das crianças')),
        }),
        flightClass:Yup.string()
          .required(String('Classe obrigatória')),

        name:Yup.string()
          .min(3, String('O Nome deve ter mais que 3 caracteres.'))
          .required(String('Nome obrigatório')),
        surname:Yup.string()
          .min(3, String('O Sobrenome deve ter mais que 3 caracteres.'))
          .required(String('Sobrenome obrigatório')),
        email:Yup.string()
          .required(String('E-mail obrigatório'))
          .email(String('Insira um e-mail válido')),
        phone:Yup.number()
          .required(String('Telefone obrigatório')),
        observations:Yup.string()
          .required(String('Messagem obrigatório')),

      }, [['childrenAge', 'childs']])
      await schema.validate(data, {
        abortEarly:false
      })
      const newData = {...data, requestSource}
      const response = await axios.post('/api/submit', newData)
      if(response.status === 200 ){
        setName('')
        setEmail('')
        setPhone('')
        setFrom('')
        setTo('')
        setDeparture('')
        setReturns('')
        setAdults('')
        setChilds('')
        setFlightClass('')
        setAccomodation('')
        setObservations('')
        history.push('/')
      }

    } catch (err){
      if(err instanceof Yup.ValidationError){
        const errors = getValidationErrors(err)
        formRef.current?.setErrors(errors)

        return
      }
    }
  },[history])

  return (
    <Container className="elevation">
     <Form ref={formRef} onSubmit={handleSubmit} >
       <div className="travel-tab">
         <h3>Viagens e Pacotes</h3>
       </div>
       <div className="travel-form">
         <div className="travel-chec"></div>
         <div className="travel-inputs">
          <div>
            <Input
              name="from"
              type="text"
              icon={FaPlaneDeparture}
              label={"Origem"}
              placeholder={"Origem da viagem"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setFrom(event.target.value)}}
              value={from}
            />
            <Input
              name="to"
              type="text"
              icon={FaPlaneArrival}
              label={"Destino"}
              placeholder={"Destino da viagem"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setTo(event.target.value)}}
              value={to}
            />
            <Input
              name="flightClass"
              type="text"
              icon={MdEventSeat}
              label={"Classe"}
              placeholder={"Selectione a classe"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setFlightClass(event.target.value)}}
              value={flightClass}
            />
            <Input
              name="accomodation"
              type="text"
              icon={FaHotel}
              label={"Acomodações"}
              placeholder={"Acomodações da hospedagem"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setAccomodation(event.target.value)}}
              value={accomodation}
            />
          </div>
          <div>
            <Input
              name="departure"
              type="date"
              icon={MdEvent}
              label={"Partida"}
              placeholder={"01/jan/2021"}
              data-date-format="DD MM YYYY"
              data-date="DD/MM/AAAA"
              data-date-label="DD/MM/AAAA"
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setDeparture(event.target.value)}}
              value={departure}
            />
            <Input
              name="returns"
              type="date"
              icon={MdEvent}
              label={"Retorno"}
              placeholder={"01/jan/2021"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setReturns(event.target.value)}}
              value={returns}
            />
            <Input
              name="adults"
              type="text"
              icon={FaUser}
              label={"Adultos"}
              placeholder={"01"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setAdults(event.target.value)}}
              value={adults}
            />
            <Input
              name="childs"
              type="text"
              icon={FaChild}
              label={"Crianças"}
              placeholder={"00"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setChilds(String(event.target.value))}}
              value={childs}
            />
            <Input
              name="childrenAge"
              type="text"
              icon={FaChild}
              label={"Idade das Crianças"}
              placeholder={"00"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setChildrenAge(String(event.target.value))}}
              value={childrenAge}
            />
          </div>
         </div>
         <div className="registration-inputs">
           <div>
            <div className="registration-name">
              <Input
                name="name"
                type="text"
                icon={FaUser}
                label={"Nome"}
                placeholder={"Nome"}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
                value={name}
              />
              <Input
                name="surname"
                type="text"
                icon={FaUser}
                label={"Sobrenome"}
                placeholder={"Sobrenome"}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setSurname(event.target.value)}}
                value={surname}
              />
            </div>
            <div className="registration-contacts">
              <Input
                name="phone"
                type="text"
                icon={FaWhatsapp}
                label={"Telefone"}
                placeholder={"Telefone"}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setPhone(event.target.value)}}
                value={phone}
              />
              <Input
                name="email"
                type="text"
                icon={FaEnvelope}
                label={"E-mail"}
                placeholder={"E-mail"}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}
                value={email}
              />
            </div>
            <div className="message-field">
              <TextArea
                name="observations"
                type="text"
                icon={FaScroll}
                label={"Message"}
                placeholder={"Descreva quais experiências você gostaria de incluir no seu pacote"}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setObservations(event.target.value)}}
                value={observations}
              />
            </div>
           </div>
           <Button text="Enviar" isPrimary primaryColor type="submit" />
         </div>
       </div>
      </Form>
    </Container>
  );
};


