import React, { createContext, useContext, useState } from 'react'

type CategoryContent = { category:string }

interface IBlogPostContextData {
  tags: string[]
  setTags(tag: Array<string>): void
  categories: Array<CategoryContent>
  setCategories(categories: Array<CategoryContent>): void
}

export const BlogPostContext = createContext<IBlogPostContextData>({} as IBlogPostContextData)

const BlogPostProvider:React.FC = ({ children}) => {
  const [ categories, setCategories ] = useState<Array<CategoryContent>>([] as Array<CategoryContent>)
  const [ tags, setTags ] = useState([''])

  return (
    <BlogPostContext.Provider value={{categories, setCategories, tags, setTags}} >
      {children}
    </BlogPostContext.Provider>
  )
}
function useBlogPost() {
  return useContext(BlogPostContext);
}
export  { BlogPostProvider, useBlogPost }
