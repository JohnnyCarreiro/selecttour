import Button from '@/components/Button'
import React from 'react'

import { Container } from './styles'

interface PostProps {

}

export const Post: React.FC<PostProps> = () => {
  return (
    <>
    <Container>
      <div className="divider" />
      <div className="post-content">
        <a className="post-link-image" href="">
          <img src="https://1.bp.blogspot.com/-KZiJxzoP6H4/YKPQVj8czMI/AAAAAAAAHJw/XZFJbYvHXJca6k4zNoeDhJiTYhO-WQoKgCLcBGAsYHQ/w763-h350-p-k-no-nu/s11%2B%25281%2529.jpg" alt="" />
        </a>
        <div className="post-info">
          <h2 className="post-title">
            <a href="https://polar-way2themes.blogspot.com/2016/03/easiest-ice-cream-youll-ever-make-no.html">Easiest Ice Cream You’ll Ever Make. No Ice-cream Maker</a>
          </h2>
          <div className="post-meta">
            <span className="post-author"><a href="https://www.blogger.com/profile/01328071054793393011" target="_blank" title="Sora Blogging Tips">Sora Blogging Tips</a></span>
            <span className="post-date published" >March 17, 2016</span>
          </div>
          <p className="post-snippet">Lorem Ipsum is simply dummy text of the printing and typesetting  industry. Lorem Ipsum has been the industry's standard dummy text ever  since the 1500s, when an unknown printer took a galley of type and  scrambled it to make a type specimen bo…</p>
            <Button text="Contiue Lendo" isPrimary={false} primaryColor link="/" />
          {/* <div className="jump-link flat-button">
            < a href="https://polar-way2themes.blogspot.com/2016/03/easiest-ice-cream-youll-ever-make-no.html#more" title="Easiest Ice Cream You’ll Ever Make. No Ice-cream Maker">
              Continue Reading
            </a>
          </div> */}
        </div>
      </div>
    </Container>
    </>
  )
}