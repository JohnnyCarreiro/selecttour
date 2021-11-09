import React, { HTMLAttributes, useEffect, useState } from 'react'

import { BlogPostProvider, useBlogPost } from '@/Contexts/BlogPostContext'

import { Container } from './styles'
import { usePosts } from '@/Hooks/usePosts'

interface SidebarProps extends HTMLAttributes<HTMLElement>{
  categories?: Array<{
    category: string
  }>
  filteredCategory?: string
  filteredTag?: string
  tags?: Array<string>
}

export function Sidebar({filteredCategory, filteredTag,  ...rest}: SidebarProps) {
  const { data, isLoading, isFetching, error } = usePosts()

  const [tags, setTags] = useState([''])
  const [categories, setCategories] = useState([''])

  useEffect(() => {
    if(data) {
      setTags(data.tags)
      setCategories(data.categories)
      return
    }
  }, [data])
  console.log('Sidebar: ', data)
  return (
    <Container {...rest}>
      <div className="sidebar-wrapper">
        <h2>Confira as Postagens</h2>
        <div className="filter-content">
          <h3  className="filter-title" >Principais Categorias</h3>
          <div className="filters">
            {isFetching && (
              <p>Atualizando Lista de categorias...</p>
            )}
            {isLoading && (
              <p>Carregando Lista de categorias...</p>
            )}
            {data && categories.map((content) => (
              <div
                key={content}
                className={filteredCategory === String(content.toLocaleLowerCase()) ? 'active-filter': ''}
                onClick={() => console.warn('Click')}
              >
                <a>{content}</a>
              </div>
            ))
            }
            {error && (
              <p>Algum erro acontenceu em nosso Servidor, volte mais tarde ou entre em contato para nos notificar sobre o erro</p>
            )}
          </div>
        </div>
        <div className="filter-content">
          <h3  className="filter-title" >Outras Categorias</h3>
          <div className="filters">
            {isFetching && (
              <p>Atualizando Lista de categorias...</p>
            )}
            {isLoading && (
              <p>Carregando Lista de categorias...</p>
            )}
            {data && tags.map((content: string) => (
              <div key={content} className={filteredTag == String(content.toLocaleLowerCase()) ? 'active-filter': ''}>
                <a>{content}</a>
              </div>
            ))
            }
            {error && (
              <p>Algum erro acontenceu em nosso Servidor, volte mais tarde ou entre em contato para nos notificar sobre o erro</p>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

Sidebar.Provider = BlogPostProvider
