import React, { createContext, HTMLAttributes, ReactNode, useCallback, useContext, useEffect, useState } from 'react'
import { setCookie, parseCookies } from 'nookies'

type CategoryContent = { category:string }

interface IBlogPostContextData {
  tags: Array<string>
  categories: Array<string>

}

interface BlogPostProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  props?: any
}

export const BlogPostContext = createContext<IBlogPostContextData>({} as IBlogPostContextData)

const BlogPostProvider:React.FC<BlogPostProps> = ({props, children}) => {
  const [ categories, setCategories ] = useState<Array<string>>([] as Array<string>)
  const [ tags, setTags ] = useState<Array<string>>([] as Array<string>)

  useEffect(()=>{
    const { 'selecttour.blog.tags':tags, 'selecttour.blog.categories':categories } = parseCookies()
    if(tags && categories){
      setTags(tags.split(','))
      setCategories(categories.split(','))
    }
  },[])

  return (
    <BlogPostContext.Provider value={{categories, tags }} >
      {children}
    </BlogPostContext.Provider>
  )
}

function useBlogPost() {
  const context = useContext(BlogPostContext)

  if(! context){
    throw new Error('useToast must be used within an AuthProvider')
  }
  return context
}

export  { BlogPostProvider, useBlogPost }
