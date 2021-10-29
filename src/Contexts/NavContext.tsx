import React, { createContext, useCallback, useState } from 'react'

interface NavContextData{
  activeLinkId: string
  setActiveLink(activeLink: string): void
}

export const NavContext = createContext<NavContextData>({} as NavContextData)

const NavProvider: React.FC = ({ children }) => {

  const [ activeLinkId, setActiveLink ] = useState('')

  return (
    <NavContext.Provider value={{setActiveLink, activeLinkId}}>
      { children }
    </NavContext.Provider>
  )
}

export  { NavProvider }
