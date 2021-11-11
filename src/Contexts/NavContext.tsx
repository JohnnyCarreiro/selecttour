import React, { createContext, useState } from 'react'
import { SiteProvider } from './useSiteContext'

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
      <SiteProvider>
        { children }
      </SiteProvider>
    </NavContext.Provider>
  )
}

export  { NavProvider }
