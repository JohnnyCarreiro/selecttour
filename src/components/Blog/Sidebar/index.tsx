import React, { HTMLAttributes } from 'react'

import { BlogPostProvider, useBlogPost } from '@/Contexts/BlogPostContext'

import { Container } from './styles'

interface SidebarProps extends HTMLAttributes<HTMLElement>{
  categories?: Array<{
    category: string
  }>
  tags?: Array<string>
}

export function Sidebar({...rest}: SidebarProps) {
  const activeCategory = 'Dicas'
  const activeTag = 'Dicas'
  const { tags, categories } = useBlogPost()

  return (
    <Container {...rest}>
      <div className="sidebar-wrapper">
        <h2>Confira as Postagens</h2>
        <div className="filter-content">
          <h3  className="filter-title" >Principais Categorias</h3>
          <div className="filters">
            {categories && categories.map((content) => (
              <div key={content} className={activeCategory === content ? 'active-filter': ''}>
                <a>{content}</a>
              </div>
            ))
            }
          </div>
        </div>
        <div className="filter-content">
          <h3  className="filter-title" >Outras Categorias</h3>
          <div className="filters">
            {tags && tags.map((content: string) => (
              <div key={content} className={activeTag === content ? 'active-filter': ''}>
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

Sidebar.Provider = BlogPostProvider
