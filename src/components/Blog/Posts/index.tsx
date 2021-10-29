import { ReactNode, HTMLAttributes, useEffect, useState } from 'react'
import { Post } from './Post'

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
  contentData: Array<ContentData>
}

export const Posts: React.FC<MainPostProps> = ({contentData, ...rest}) => {

  const [posts, setPosts] =useState<Array<ContentData>>([] as Array<ContentData>)

  useEffect(() => {
    if(contentData.length > 1) {
      setPosts(contentData.slice(1, contentData.length) as Array<ContentData>)
    }
  },[contentData])
  return (
    <Container {...rest}>
      {posts && posts.map(post => (
        <Post key={post.slug} post={post} />
      ))}
      {/* <Post />
      <Post />
      <Post />
      <Post /> */}
    </Container>
  )
}
