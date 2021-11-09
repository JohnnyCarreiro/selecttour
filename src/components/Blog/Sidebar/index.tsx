import React, { HTMLAttributes, useEffect, useState } from 'react'

import { BlogPostProvider, useBlogPost } from '@/Contexts/BlogPostContext'

import { Container } from './styles'
import { usePosts } from '@/Hooks/usePosts'
import { useFilters } from '@/Hooks/useFilters'
import { useRouter } from 'next/router'

interface SidebarProps extends HTMLAttributes<HTMLElement>{
  categories?: Array<{
    category: string
  }>
  filteredCategory?: string
  filteredTag?: string
  tags?: Array<string>
  ifNotHome?: boolean
}

export function Sidebar({filteredCategory, filteredTag, ifNotHome, ...rest}: SidebarProps) {
  const [page, setPage] =useState<number>(1)
  const STALE_TIME = 10 * 1000
  const { data, isLoading, isFetching, error } = usePosts(STALE_TIME, page, filteredTag, filteredCategory)
  const router = useRouter()

  const [tags, setTags] = useState([''])
  const [categories, setCategories] = useState([''])

  const { setCategory, setTag } = useFilters()

  useEffect(() => {
    if(data) {
      setTags(data.tags)
      setCategories(data.categories)
      return
    }
  }, [data])
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
                onClick={() => {
                  setCategory(String(content).toLocaleLowerCase())
                  if(ifNotHome){
                    router.push('/blog')
                  }
                }}
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
              <div
                key={content}
                className={filteredTag == String(content) ? 'active-filter': ''}
                onClick={() => {
                  setTag(String(content))
                  if(ifNotHome){
                    router.push('/blog')
                  }
                }}
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
          <div className="filters">
            <div
              onClick={() => {setTag(''), setCategory('')}}
            >
              <a>Limpar filtros</a>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

Sidebar.Provider = BlogPostProvider
