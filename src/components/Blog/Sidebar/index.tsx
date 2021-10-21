import React, { HTMLAttributes } from 'react'

import { Container } from './styles'

interface SidebarProps extends HTMLAttributes<HTMLElement>{
}

export const Sidebar: React.FC<SidebarProps> = ({...rest}) => {
  return (
    <Container {...rest}>
      <div className="sidebar-wrapper">
        <h2>Confira as Postagens</h2>
        <div className="filter-content">
          <h3  className="filter-title" >Por Assuntos</h3>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor.</p>
        </div>
        <div className="filter-content">
          <h3  className="filter-title" >Por Lugares</h3>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor.</p>
        </div>
        <div className="filter-content">
          <h3  className="filter-title" >Por Autores</h3>
          <p>Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor.</p>
        </div>
      </div>
    </Container>
  )
}
