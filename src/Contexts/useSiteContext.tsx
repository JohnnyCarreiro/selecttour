import { IHome } from "@/interfaces/IHome"
import React, { createContext, useCallback, useContext, useEffect, useState } from "react"
import { useHomeContent } from "../Hooks/Home/useHome"

interface FilterContextData{
  setContacts(contacts: IHome['site_contacts_section']):void
  useContacts: IHome['site_contacts_section']
}

const SiteContext = createContext<FilterContextData>({} as FilterContextData)
const STALE_TIME = 10 * 1000

const  SiteProvider: React.FC = ({ children }) => {
  const [useContacts, setUseContacts] = useState<IHome['site_contacts_section']>({} as IHome['site_contacts_section'])

  const { data, isLoading, isFetching, error } = useHomeContent(STALE_TIME)

  useEffect(() => {
    if(data){
      setUseContacts(data.content.site_contacts_section)
    }
  },[data])

  const setContacts = useCallback((contacts: IHome['site_contacts_section']) => {
    setUseContacts(contacts)
  },[])
  return (
    <SiteContext.Provider value={{setContacts , useContacts}}>
      { children }
    </SiteContext.Provider>
  )
}


function useSiteContexts(){
  const context = useContext(SiteContext)

  if(! context){
    throw new Error('useHomeContexts must be used within an AuthProvider')
  }
  return context
}
export { SiteProvider, useSiteContexts }

