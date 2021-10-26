import { useBlogPost } from '@/Contexts/BlogPostContext'
import React, { HTMLAttributes, useEffect, useState } from 'react'

import { Container } from './styles'

interface SidebarProps extends HTMLAttributes<HTMLElement>{
  categories?: Array<{
    category: string
  }>
  tags?: Array<string>
}

export const Sidebar: React.FC<SidebarProps> = ({...rest}) => {
  const activeTag = 'Dicas'
  const { tags, categories } = useBlogPost()
  const [ newCategories,setCategories ] = useState([] as Array<{category:string}>)
  useEffect(() => {
    // setCategories(JSON.parse(JSON.stringify(categories)).map((content: {category:string}) => content.category))
    setCategories(categories)
  })
  return (
    <Container {...rest}>
      <div className="sidebar-wrapper">
        <h2>Confira as Postagens</h2>
        <div className="filter-content">
          <h3  className="filter-title" >Principais Categorias</h3>
          <div className="filters">
            {categories && categories.map((content) => (
              <div className={activeTag === content.category ? 'active-filter': ''}>
                <a>{content.category}</a>
              </div>
            ))
            }
          </div>
        </div>
        <div className="filter-content">
          <h3  className="filter-title" >Outras Categorias</h3>
          <div className="filters">
            {tags && tags.map((content) => (
              <div className={activeTag === content ? 'active-filter': ''}>
                <a>{content}</a>
              </div>
            ))
            }
          </div>
        </div>
      </div>
    </Container>
  )
}
