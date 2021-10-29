import Button from '@/components/Button'
import React from 'react'

import { Container } from './styles'

type ContentData = {
  [params:string]: any
  slug: string
  image: {
    url: string
    alt: string
  }
  categories: Array<string>
  tags: Array<string>
  author: string
  title: string
  snippet: string
  updatedAt: string
}

interface PostProps {
  post: ContentData
}

export const Post: React.FC<PostProps> = ({post}) => {
  const { slug, image, categories, tag, author, title, snippet, updatedAt } = post

  return (
    <>
    <Container>
      <div className="divider" />
      <div className="snippet-post-content">
        <a className="snippet-post-link-image" href={`/blog/${slug}`}>
          <img src={image.url} alt={image.alt} />
        </a>
        <div className="snippet-post-info">
          <h2 className="snippet-post-title">
            <a href={`/blog/${slug}`}>{title}</a>
          </h2>
          <div className="snippet-post-meta">
            <span className="snippet-post-author"><a href="#" target="_blank" title="Select Tour Viagens">{author}</a></span>
            <span className="snippet-post-date published" >{updatedAt}</span>
          </div>
          <div className="snippet-post-snippet" >
            <p>{snippet}</p>
          </div>
          <div className="jump-link flat-button">
            <Button text="Contiue Lendo" isPrimary={false} primaryColor link={`/blog/${slug}`} />
          </div>
        </div>
      </div>
    </Container>
    </>
  )
}
