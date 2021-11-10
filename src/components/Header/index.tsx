import React, { AnchorHTMLAttributes, useCallback, useContext, useEffect, useState} from 'react'
import Router, { useRouter } from 'next/router'
import { FaFacebookSquare, FaInstagramSquare, FaLinkedinIn, FaTimes, FaBars } from 'react-icons/fa'
import Logo from '../../assets/imgs/LOGO.svg'
import { NavContext } from '../../Contexts/NavContext'

import { BottomNavBar, Container, NavContainer } from './styles'
import { useContactsContesxt } from '@/Hooks/Home/useContacts'

interface IContactsProps {
  contacts:{
    whatsapp_number: string
    whatsapp_message: string
    phone_number: string
    email: string
    facebook: string
    instagram: string
    linkedin: string
  }
}

interface IHeaderProps {
  hasBlogPosts: boolean
}

export const Header: React.FC<IHeaderProps> = ({hasBlogPosts}) => {

  const { pathname } = useRouter()
  const currentPage = pathname.replace('/', '').split('/')[0]

  const { useContacts } = useContactsContesxt()

  const [contacts, setContacts] = useState<IContactsProps['contacts']>(useContacts as IContactsProps['contacts'])
  const [phone, setPhone] = useState('')


  const {
    phone_number,
    email,
    facebook,
    instagram,
    linkedin
  } = contacts
  // const phone = phone_number.replace('-', '').replace(' ', '')
  const [ display, setDisplay ] = useState(false)
  const handleShowingMenu = () => {
    setDisplay(!display)
  }
  const closeMobileMenu = () => {
    setDisplay(false)
  }
  const navLinks = [
    {navLinkName: 'Inicio', navLinkId: 'Home', scrollToId: 'home'},
    {navLinkName: 'Sobre', navLinkId: 'About', scrollToId: 'about'},
    {navLinkName: 'Pacote', navLinkId: 'Top-packages', scrollToId: 'top-packages'},
    {navLinkName: 'Como Atuamos', navLinkId: 'How-we-work', scrollToId: 'how-we-work'},
    {navLinkName: 'Destinos', navLinkId: 'Top-destinations', scrollToId: 'top-destinations'},
    {navLinkName: 'Contatos', navLinkId: 'Contacts', scrollToId: 'contacts'},
  ]

  if(hasBlogPosts) {
    console.log('Temposts')
    // navLinks = [...navLinks, {navLinkName: 'Blog', navLinkId: 'Blog', scrollToId: 'Blog'},]
  }

  interface NavLinkProps extends AnchorHTMLAttributes<HTMLElement> {
    navLinkName: string
    navLinkId: string
    scrollToId: string
  }
  const [_document, setDocument] = useState<Document>({} as Document)

  useEffect(() => {
    setDocument(document)
    if(!!contacts){
      setContacts(useContacts)
      setPhone(phone_number?.replace('-', '').replace(' ', ''))
    }
  })

  const NavLink = ({navLinkName, navLinkId, scrollToId, ...rest}: NavLinkProps) => {
    const { activeLinkId, setActiveLink } = useContext(NavContext)
    const handleClick = useCallback(() => {
      setActiveLink(navLinkId)
      Router.events.on('routeChangeComplete', () => {
        // setDocument(document)
        _document.getElementById(scrollToId)!.scrollIntoView({behavior: 'smooth'})
      })
      _document.getElementById(scrollToId)!.scrollIntoView({behavior: 'smooth'})
      closeMobileMenu()
    },[])

    return (
      <li className={activeLinkId === navLinkId ? 'menuItem active' : 'menuItem'} >
        {
          currentPage?.toString() === 'blog' ?
          (
            <a
              id={navLinkId}
              className={activeLinkId === navLinkId ? 'active' : ''}
              href={`/#${scrollToId}`}
              onClick={closeMobileMenu}
              {...rest}
            >
              {navLinkName}
            </a>
          ): navLinkName !== 'Blog' ?
          (
            <a
              id={navLinkId}
              className={activeLinkId === navLinkId ? 'active' : ''}
              onClick={handleClick}
              {...rest}
            >
              {navLinkName}
            </a>
          ):(
            <a
              id={navLinkId}
              className={activeLinkId === navLinkId ? 'active' : ''}
              onClick={closeMobileMenu}
              {...rest}
            >
              {navLinkName}
            </a>
          )
        }
      </li>
    );
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
              {navLinks.map(
                ({navLinkId, scrollToId, navLinkName}) =>
                  <NavLink
                    key={navLinkId}
                    navLinkName={navLinkName}
                    navLinkId={navLinkId}
                    scrollToId={scrollToId}
                  />
              )}
              {hasBlogPosts && (
                <NavLink
                  navLinkName={'Blog'}
                  navLinkId={'Blog'}
                  scrollToId={''}
                  href={'/blog'}
                />
              )}
              </ul>
              {/* <ul>
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
                 <li className={current?.current?.id === 'blog' ? 'menuItem active' : 'menuItem'} >
                  <a className={current?.current?.id === 'blog' ? 'active' : ''} onClick={closeMobileMenu} href="/blog">Blog</a>
                </li>
              </ul> */}
            </nav>
            <div className="menuIcon" onClick={handleShowingMenu}>
              { display ? <FaTimes /> : <FaBars /> }
            </div>
          </NavContainer>
        </BottomNavBar>
      </Container>
  )
}
