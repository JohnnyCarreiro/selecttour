import { ReactNode, HTMLAttributes } from 'react'
import { Post } from './Post'

import { Container } from './styles'

interface MainPostProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}

export const Posts: React.FC<MainPostProps> = ({...rest}) => {
  return (
    <Container {...rest}>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  )
}
