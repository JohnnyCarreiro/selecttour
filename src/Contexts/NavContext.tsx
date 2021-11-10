import { ContactsProvider } from '@/Hooks/Home/useContacts'
import React, { createContext, useCallback, useState } from 'react'

interface NavContextData{
  activeLinkId: string
  // addActiveLink(activeLink: string):void
  setActiveLink(activeLink: string): void
}

export const NavContext = createContext<NavContextData>({} as NavContextData)

const NavProvider: React.FC = ({ children }) => {

  const [ activeLinkId, setActiveLink ] = useState('')

  // const addActiveLink = useCallback((activeLink: string)=>{

  //   setActiveLink(activeLink)
  // },[])

  return (
    <NavContext.Provider value={{setActiveLink, activeLinkId}}>
      <ContactsProvider>
        { children }
      </ContactsProvider>
    </NavContext.Provider>
  )
}

export  { NavProvider }
