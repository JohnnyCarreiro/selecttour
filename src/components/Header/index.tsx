import React, { useState } from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedinIn, FaTimes, FaBars } from 'react-icons/fa'
import Logo from '../../assets/imgs/LOGO.svg'

import { BottomNavBar, Container, NavContainer } from './styles'
interface NavProps {
  contacts:{
    whatsapp_number: string
    whatsapp_message: string
    phone_number: string
    email: string
    facebook: string
    instagram: string
    linkedin: string
  }
  // current:string
  current?:  React.RefObject<HTMLDivElement>
}
export const Header: React.FC<NavProps> = ({current, contacts}) => {
  const {
    whatsapp_number,
    whatsapp_message,
    phone_number,
    email,
    facebook,
    instagram,
    linkedin
  } = contacts
  const phone = phone_number.replace('-', '').replace(' ', '')
  const [ display, setDisplay ] = useState(false)
  console.log('Header', current)

  const handleShowingMenu = () => {
    setDisplay(!display)
  }
  const closeMobileMenu = () => {
    setDisplay(false)
  }

  return (
      <Container>
        <div className="topNavbar">
          <div className="contactsContainer">
            <div className="socialMedia">
              <ul>
                <li><a href={facebook ? facebook : "#"}><FaFacebookSquare/></a></li>
                <li><a href={instagram ? instagram : "#"}><FaInstagramSquare/></a></li>
                <li><a href={linkedin ? linkedin : "#"}><FaLinkedinIn/></a></li>
                <a href=""></a>
              </ul>
            </div>
            <div className="mainContacts">
              <ul>
                <li><a href={`tel:+55${phone}`}>{phone_number}</a></li>
                <li><a href={`mailto:${email}`}>{email}</a></li>
              </ul>
            </div>
          </div>
        </div>
        <BottomNavBar>
          <NavContainer >
            <div className="logoPlaceHolder" >
              <a href="/"><Logo/></a>
            </div>
            <nav className={display ? 'showMenu' : ''}>
              <ul>
                <li className={current?.current?.id === 'home' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'home' ? 'active' : ''} onClick={closeMobileMenu} href="#home">Inicio</a>
                </li>
                <li className={current?.current?.id === 'about' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'about' ? 'active' : ''} onClick={closeMobileMenu} href="#about">Sobre</a>
                </li>
                <li className={current?.current?.id === 'top-packages' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'top-packages' ? 'active' : ''} onClick={closeMobileMenu} href="#top-packages">Pacotes</a>
                </li>
                <li className={current?.current?.id === 'how-we-work' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'how-we-work' ? 'active' : ''} onClick={closeMobileMenu} href="#how-we-work">Como Atuamos</a>
                </li>
                <li className={current?.current?.id === 'top-destinations' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'top-destinations' ? 'active' : ''} onClick={closeMobileMenu} href="#top-destinations">Destinos</a>
                </li>
                <li className={current?.current?.id === 'Contato' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'Contato' ? 'active' : ''} onClick={closeMobileMenu} href="#contact">Contato</a>
                </li>
                {/* <li className={current?.current?.id === 'blog' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'blog' ? 'active' : ''} onClick={closeMobileMenu} href="/blog">Blog</a>
                </li> */}
              </ul>
            </nav>
            <div className="menuIcon" onClick={handleShowingMenu}>
              { display ? <FaTimes /> : <FaBars /> }
            </div>
          </NavContainer>
        </BottomNavBar>
      </Container>
  )
}
