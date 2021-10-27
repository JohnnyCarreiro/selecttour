import Button from '@/components/Button'
import { ReactNode, HTMLAttributes } from 'react'

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

interface MainPostProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
  contentData: ContentData
}

export const MainPost: React.FC<MainPostProps> = ({contentData, ...rest}) => {
  const { slug, image, categories, tag, author, title, snippet, updatedAt } = contentData
  return (
    <Container {...rest}>
      <div className="main-post-content">
        <a className="main-post-link-image"href={`/blog/${slug}`}>
          <img src={image.url} alt={image.alt} />
        </a>
        <div className="main-post-info">
          <h2 className="main-post-title">
            <a href={`/blog/${slug}`}>{title}</a>
          </h2>
          <div className="main-post-meta">
            <span className="main-post-author"><a href="#" target="_blank" title="Select Tour Viagens">{author}</a></span>
            <span className="main-post-date published" >{updatedAt}</span>
          </div>
          <p className="main-post-snippet">{snippet}</p>

          <div className="jump-link flat-button">
            <Button text="Contiue Lendo" isPrimary={false} primaryColor link={`/blog/${slug}`} />
          </div>
        </div>
      </div>
    </Container>
  )
}
