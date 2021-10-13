import { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import * as Yup from 'yup'
import axios from 'axios'
import { FaEnvelope, FaMobile, FaScroll, FaTag, FaUser } from 'react-icons/fa'

import { Container } from './styles'
import { Input } from 'components/Input'
import getValidationErrors from 'utils/getValidationErrors'
import Button from 'components/Button'
import { TextArea } from 'components/TextArea'

interface ContactFormData {
  name: string
  email:string
  phone:number
  subject:string
  message:string
}

export const ContactForm:React.FC = () => {

  const formRef = useRef<FormHandles>(null)

  const history = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const requestSource = 'Contato'

  const handleSubmit = useCallback( async (data: ContactFormData) =>{
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
        name:Yup.string()
          .min(3, String('O Nome deve ter mais que 3 caracteres.'))
          .required(String('Nome obrigatório')),
        email:Yup.string()
          .required(String('E-mail obrigatório'))
          .email(String('Insira um e-mail válido')),
        phone:Yup.string()
          .required(String('Telefone obrigatório')),
        subject:Yup.string()
          .required(String('Assunto obrigatório')),
        message:Yup.string()
          .required(String('Messagem obrigatório')),

      })
      await schema.validate(data, {
        abortEarly:false
      })
      const newData = {...data, requestSource}
      const response = await axios.post('/api/submit', newData)
      if(response.status === 200 ){
        setName('')
        setEmail('')
        setPhone('')
        setSubject('')
        setMessage('')
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
        <Input
          name="name"
          type="text"
          label="Nome"
          icon={FaUser}
          placeholder="Nome"
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setName(event.target.value)}}
          value={name}
        />
        <Input
          name="email"
          type="email"
          label="E-mail"
          icon={FaEnvelope}
          placeholder="E-mail"
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setEmail(event.target.value)}}
          value={email}
        />
        <Input
          name="phone"
          type="text"
          label="Telefone"
          icon={FaMobile}
          placeholder="Telefone"
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setPhone(event.target.value)}}
          value={phone}
        />
        <Input
          name="subject"
          type="text"
          label="Assunto"
          icon={FaTag}
          placeholder="Assunto"
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setSubject(event.target.value)}}
          value={subject}
        />
        <TextArea
          name="message"
          type="text"
          label="Mensagem"
          icon={FaScroll}
          placeholder="Deixe sua mensagem"
          onChange={(event:React.ChangeEvent<HTMLInputElement>) => {setMessage(event.target.value)}}
          value={message}
        />
        <Button text="Enviar" isPrimary primaryColor type="submit" />

      </Form>
    </Container>
  );
};


