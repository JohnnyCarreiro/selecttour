import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import axios from 'axios'
import { FaChild, FaEnvelope, FaHotel, FaPlaneArrival, FaPlaneDeparture, FaUser, FaWhatsapp } from 'react-icons/fa'
import { MdEvent, MdEventSeat } from 'react-icons/md'

import { Container } from './styles'
import { Input } from 'components/Input'
import getValidationErrors from 'utils/getValidationErrors'
import Button from 'components/Button'
import { TextArea } from 'components/TextArea'

interface SignInFormData {
  name: string
  email:string
  phone:number
  company:string
  subject:string
  message:string
}


export const RequestTravel:React.FC = () => {

  const formRef = useRef<FormHandles>(null)

  const history = useRouter()
  const { locale } = useRouter()

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
  const [flightClass, setFlightClass] = useState('')
  const [accomodation, setAccomodation] = useState('')

  const [observations, setObservations] = useState('')


  const handleSubmit = useCallback( async (data: SignInFormData) =>{
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name:Yup.string()
          .min(3, String(locale === 'en-us'
            ? 'The name should have at least 3 characters'
            : 'O Nome deve ter mais que 3 caracteres.'
          ))
          .required(String(locale === 'en-us'
            ? 'Name is mandatory'
            : 'Nome obrigatório'
          )),
        email:Yup.string()
          .required(String(locale === 'en-us'
            ? 'Email is mandatory'
            : 'E-mail obrigatório'
          ))
          .email(String(locale === 'en-us'
            ? 'Insert a valid email address'
            : 'Insira um e-mail válido'
          )),
        phone:Yup.number()
          .required(String(locale === 'en-us'
            ? 'Phone number is mandatory'
            : 'Telefone obrigatório'
          )),
        company:Yup.string()
          .optional(),
        subject:Yup.string()
          .required(String(locale === 'en-us'
            ? 'Subject is mandatory'
            : 'Assunto obrigatório'
          )),
        message:Yup.string()
          .required(String(locale === 'en-us'
            ? 'Message is mandatory'
            : 'Messagem obrigatório'
          )),

      })
      await schema.validate(data, {
        abortEarly:false
      })
      const response = await axios.post('/api/submit', data)
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
              name="class"
              type="text"
              icon={MdEventSeat}
              label={"Classe"}
              placeholder={"Selectione a classe"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
              value={flightClass}
            />
            <Input
              name="accomodation"
              type="text"
              icon={FaHotel}
              label={"Acomodações"}
              placeholder={"Acomodações da hospedagem"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
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
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setDeparture(event.target.value)}}
              value={departure}
            />
            <Input
              name="retunrs"
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
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
              value={adults}
            />
            <Input
              name="childs"
              type="text"
              icon={FaChild}
              label={"Crianças"}
              placeholder={"00"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
              value={childs}
            />
            <Input
              name="childsAge"
              type="text"
              icon={FaChild}
              label={"Idade das Crianças"}
              placeholder={"00"}
              onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
              value={childs}
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
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
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
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
                value={phone}
              />
              <Input
                name="email"
                type="text"
                icon={FaEnvelope}
                label={"E-mail"}
                placeholder={"E-mail"}
                onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
                value={email}
              />
            </div>
            <div className="message-field">
              <TextArea
                name="observations"
                type="text"
                label={"Message"}
                placeholder={"Leave a message to us"}
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


