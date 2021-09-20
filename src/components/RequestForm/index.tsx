import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import axios from 'axios'

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
interface FormFieldProps {
  form_fields: {
    name_label: string
    name_field: string
    email_label: string
    email_field: string
    phone_label: string
    phone_field: string
    from_label: string
    from_field: string
    to_label: string
    to_field: string
    departure_label: string
    departure_field: string
    returns_label: string
    returns_field: string
    adults_label: string
    adults_field: string
    child_label: string
    child_field: string
    class_label: string
    class_field: string
    accomodatio_label: string
    accomodation_field: string
    observations_label: string
    observations_field: string
    whatsapp_message: string
  }
}

export const RequestForm:React.FC<FormFieldProps> = ({ form_fields }) => {
  const {
    name_label,
    name_field,
    email_label,
    email_field,
    phone_label,
    phone_field,
    from_label,
    from_field,
    to_label,
    to_field,
    departure_label,
    departure_field,
    returns_label,
    returns_field,
    adults_label,
    adults_field,
    child_label,
    child_field,
    class_label,
    class_field,
    accomodatio_label,
    accomodation_field,
    observations_label,
    observations_field,
   } = form_fields
  const formRef = useRef<FormHandles>(null)

  const history = useRouter()
  const { locale } = useRouter()

  const [name, setName] = useState('')
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
    <Container>
     <Form ref={formRef} onSubmit={handleSubmit} >
       <div className="registration">
         <h3>Dados Cadastrais</h3>
          <Input
            name="name"
            type="text"
            label={name_label}
            placeholder={name_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
            value={name}
          />
          <Input
            name="email"
            type="email"
            label={email_label}
            placeholder={email_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}
            value={email}
          />
          <Input
            name="phone"
            type="number"
            label={phone_label}
            placeholder={phone_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setPhone(event.target.value)}}
            value={phone}
          />
       </div>
       <div className="travel">
        <h3>Dados da Viagem</h3>
        <div>
          <Input
            name="from"
            type="text"
            label={from_label}
            placeholder={from_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => { setFrom(event.target.value)}}
            value={from}
          />
            <Input
            name="to"
            type="text"
            label={to_label}
            placeholder={to_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setTo(event.target.value)}}
            value={to}
          />
        </div>
        <div>
          <Input
            name="departure"
            type="text"
            label={departure_label}
            placeholder={departure_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setDeparture(event.target.value)}}
            value={departure}
          />
            <Input
            name="return"
            type="text"
            label={returns_label}
            placeholder={returns_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setReturns(event.target.value)}}
            value={returns}
          />
        </div>
        <div>
          <Input
            name="adults"
            type="text"
            label={adults_label}
            placeholder={adults_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setAdults(event.target.value)}}
            value={adults}
          />
            <Input
            name="childs"
            type="text"
            label={child_label}
            placeholder={child_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setChilds(event.target.value)}}
            value={childs}
          />
        </div>
        <div>
          <Input
            name="class"
            type="text"
            label={class_label}
            placeholder={class_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setFlightClass(event.target.value)}}
            value={flightClass}
          />
            <Input
            name="accomodation"
            type="text"
            label={accomodatio_label}
            placeholder={accomodation_field}
            onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setAccomodation(event.target.value)}}
            value={accomodation}
          />
        </div>
      </div>
        <TextArea
          name="observations"
          type="text"
          label={observations_label}
          placeholder={observations_field}
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setObservations(event.target.value)}}
          value={observations}
        />
        { locale === 'en-us'
          ? (<Button text="Send" isPrimary primaryColor type="submit" />)
          : (<Button text="Enviar" isPrimary primaryColor type="submit" />)
        }

      </Form>
    </Container>
  );
};


