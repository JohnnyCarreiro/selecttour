import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import { FaEnvelope, FaScroll, FaUser, FaWhatsapp } from 'react-icons/fa'
import * as Yup from 'yup'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import axios from 'axios'
import { useRouter } from 'next/router'

import { TextArea } from '@/components/TextArea'
import { Input } from '@/components/Input'
import Button  from '@/components/Button'
import getValidationErrors from 'utils/getValidationErrors'



import { ModalBackground } from './styles'

interface KnowMoreModalProps {
  closeModal: Dispatch<SetStateAction<boolean>>
  // openForm: Dispatch<SetStateAction<boolean>>
  title?: string
  informations?: string
  isPackage: boolean
  requestSource?: string
}

interface SignInFormData {
  name: string
  email:string
  phone:number
  company:string
  subject:string
  message:string
}

function KnowMoreModal({ closeModal, title, isPackage, requestSource }: KnowMoreModalProps) {

  const formRef = useRef<FormHandles>(null)
  const history = useRouter()

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [observations, setObservations] = useState('')

  const handleSubmit = useCallback( async (data: SignInFormData) =>{
    try {
      formRef.current?.setErrors({})

      const schema = Yup.object().shape({
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
      const newData = {...data, destination:title, requestSource}
      const response = await axios.post('/api/submit', newData)
      if(response.status === 200 ){
        setName('')
        setSurname('')
        setEmail('')
        setPhone('')
        setObservations('')
        closeModal(false)
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
    <ModalBackground  isPackage={isPackage} onClick={() => {}} >
      <div className={`modal-container ${isPackage ? 'package' : 'destination'}`}>
        <div className="close-btn">
          <button onClick={() => {closeModal(false)}} >X</button>
        </div>
        <div className="title">
          <h2>Mais Informações do Destino {title}</h2>
        </div>
        <div className="body">
          <p>
            Mussum Ipsum, cacilds vidis litro abertis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Per aumento de cachacis, eu reclamis. Paisis, filhis, espiritis santis. Cevadis im ampola pa arma uma pindureta.
          </p>
        </div>
        <div className="footer">
          {!isPackage &&
            <Form ref={formRef} onSubmit={handleSubmit} >
              <div className="registration-inputs">
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
              <Button text="Solicitar" isPrimary primaryColor type="submit" />
            </Form>
          }
        </div>
      </div>
    </ModalBackground>
  );
};

export default KnowMoreModal;
