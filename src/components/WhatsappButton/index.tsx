import { ReactNode } from 'react'
import { FaWhatsapp } from 'react-icons/fa'

import { Container } from './styles'

interface WhatsappButtonProps {
  children?: ReactNode
  content: {
    whatsapp_number: string;
    whatsapp_message: string;
  }
}

function WhatsappButton({ children, content }: WhatsappButtonProps) {

  const { whatsapp_number, whatsapp_message } = content

  const encodedWhatsappMessage = encodeURI(whatsapp_message)
  const encodedWhatsappUri = encodeURI(`https://api.whatsapp.com/send?phone=${whatsapp_number}&text=${whatsapp_message}`)
  console.log(encodedWhatsappMessage, encodedWhatsappUri)
  console.log(content)
  return (
    <Container>
      <a
        href={encodedWhatsappUri}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={'54px'} />
      </a>
      {children}
    </Container>
  )
}

export default WhatsappButton
