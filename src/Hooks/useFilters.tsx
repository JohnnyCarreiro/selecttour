import React, { createContext, useCallback, useContext, useState } from "react"

interface FilterContextData{
  setCategory(category: string):void
  setTag(tag: string):void
  filteredCategory: string
  filteredTag: string
}

const FiltersContext = createContext<FilterContextData>({} as FilterContextData)

const  FiltersProvider: React.FC = ({ children }) => {
  const [filteredCategory, setFilteredCategory] = useState('')
  const [filteredTag, setFilteredTag] = useState('')

  const setCategory = useCallback((category: string) => {
    setFilteredCategory(category)
    setFilteredTag('')
  }, [filteredCategory])
  const setTag = useCallback((tag: string) => {
    setFilteredTag(tag)
    setFilteredCategory('')
  }, [filteredTag])
  return (
    <FiltersContext.Provider value={{setCategory,setTag, filteredCategory, filteredTag}}>
      { children }
    </FiltersContext.Provider>
  )
}


function useFilters(){
  const context = useContext(FiltersContext)

  if(! context){
    throw new Error('useToast must be used within an AuthProvider')
  }
  return context
}
export { FiltersProvider, useFilters}

