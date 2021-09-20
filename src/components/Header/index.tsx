import React, { useState } from 'react'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedinIn, FaTimes, FaBars } from 'react-icons/fa'
import Logo from '../../assets/imgs/LOGO.svg'

import { BottomNavBar, Container, NavContainer } from './styles'
interface NavProps{
  current:string
}
export const Header: React.FC<NavProps> = ({current}) => {
  const [ display, setDisplay ] = useState(false)

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
                <li><a href="#"><FaFacebookSquare/></a></li>
                <li><a href="#"><FaInstagramSquare/></a></li>
                <li><a href="#"><FaLinkedinIn/></a></li>
                <a href=""></a>
              </ul>
            </div>
            <div className="mainContacts">
              <ul>
                <li><a href="tel:+5511998253434">11 99825-3434</a></li>
                <li><a href="mailto:contato@selecttour.com.br">contato@selecttour.com.br</a></li>
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
                <li className={current === 'Inicio' ? 'menuItem active' : 'menuItem'} >
                  <a className={current === 'Inicio' ? 'active' : ''} onClick={closeMobileMenu} href="/">Inicio</a>
                </li>
                <li className={current === 'Sobre' ? 'menuItem active' : 'menuItem'} >
                  <a className={current === 'Sobre' ? 'active' : ''} onClick={closeMobileMenu} href="/sobre">Sobre</a>
                </li>
                <li className={current === 'Produtos' ? 'menuItem active' : 'menuItem'} >
                  <a className={current === 'Produtos' ? 'active' : ''} onClick={closeMobileMenu} href="/produtos">Produtos</a>
                </li>
                <li className={current === 'Serviços' ? 'menuItem active' : 'menuItem'} >
                  <a className={current === 'Serviços' ? 'active' : ''} onClick={closeMobileMenu} href="/servicos">Serviços</a>
                </li>
                <li className={current === 'Contato' ? 'menuItem active' : 'menuItem'} >
                  <a className={current === 'Contato' ? 'active' : ''} onClick={closeMobileMenu} href="/contato">Contato</a>
                </li>
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
