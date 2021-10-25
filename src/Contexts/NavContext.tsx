import React, { createContext, createRef, useCallback, useContext, useState } from 'react'

interface NavContextData{
  activeLinkId: string
  // addActiveLink(activeLink: string):void
  setActiveLink(activeLink: string): void
  // setActiveLink: any
}

export const NavContext = createContext<NavContextData>({} as NavContextData)

const NavProvider: React.FC = ({ children }) => {

  const [ activeLinkId, setActiveLink ] = useState('')

  // const addActiveLink = (activeLink: string)=>{

  //   setActiveLink(activeLink)
  // }

  return (
    <NavContext.Provider value={{setActiveLink, activeLinkId}}>
      { children }
    </NavContext.Provider>
  )
}

function useNavContex(): NavContextData{
  const context = useContext(NavContext)

  if(! context){
    throw new Error('useToast must be used within an AuthProvider')
  }
  return context
}

export  { NavProvider, useNavContex }
