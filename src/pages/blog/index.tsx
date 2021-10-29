import React, { useEffect, useState } from 'react'
import {  GetServerSideProps } from 'next'
import Head from 'next/head'

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

import { Container } from '@/styles/Blog'
import { Hero } from '@/components/Blog/Hero'
import { Header } from '@/components/Header'
import { MainPost } from '@/components/Blog/MainPost'
import { Posts } from '@/components/Blog/Posts'
import { Sidebar } from '@/components/Blog/Sidebar'
import { Footer } from '@/components/Footer'
import { getPrismicClient } from '@/services/prismic'
import { BlogPostProvider } from '@/Contexts/BlogPostContext'
import { setCookie } from 'nookies'

type PostData = {
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


interface IContentProps {
  contents:{
    posts: Array<PostData>
  }
}

export default function Blog({contents}: IContentProps) {
  const contacts = {
    whatsapp_number: '',
    whatsapp_message: '',
    phone_number: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  }

  const { posts } = contents

  const [mainImage, setMainImage] = useState<PostData["image"]>({} as PostData["image"])

  useEffect(() => {
    const image = posts[Math.floor(Math.random() * (posts.length - 0)) + 0]?.image

    setMainImage(image)
  },[posts])

  return (
    <Container>
      <Head>
        <title>Select Tour - Blog</title>
      </Head>
      <Header contacts={contacts} />
      <Hero image={mainImage?.url} >
        <div className="wrapper">
          <div className="hero-content" >
            <img src="/assets/images/LOGO.svg" alt="Logo Select Tour" />
            <h1>{'Blog muitcho loko'}</h1>
            {/* { show_case_section?.sub_title && (
              <h2>{show_case_section?.sub_title}</h2>
            ) } */}
          </div>
        </div>
      </Hero>
      <section className="wrapper">
        <div className="main-section">
          <section className="posts">
            <div className="header">
              <h2>Confira nossas últimas postagens</h2>
              <h3>
                Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.
                Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.
              </h3>
            </div>
            <div className="widget-content">
              <MainPost contentData={posts[0]} className="elevation" />
              <Posts contentData={posts} className="elevation"/>
            </div>
          </section>
          <aside className="sidebar">
            <Sidebar
              className="elevation"
            />
          </aside>
        </div>
      </section>
      <Footer />
    </Container>
  )
}
// Blog.provider = BlogPostProvider
export const getServerSideProps: GetServerSideProps = async (context) => {

  const { query } = context

  const prismic = getPrismicClient()

  //Fetch all categories
  const fetchCategories = await prismic.query([
    Prismic.predicates.at('document.type', 'category')
  ])
  //Fetching all Tags
  const tags = await prismic.getTags()

  const categories = fetchCategories.results.map(category => {
    return RichText.asText(category.data.category)
  })


  setCookie(context, 'selecttour.blog.tags', String(tags), {
    maxAge: 60 * 60 * 24 * 7 ,// One week
    path: "/"
  })
  setCookie(context, 'selecttour.blog.categories', String(categories), {
    maxAge: 60 * 60 * 24 * 7 ,// One week
    path: "/"
  })

  //Fetching all posts to main blog page
  const page = query ? Number(query) : 1
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ],
    {
      orderings : '[document.last_publication_date desc]' ,
      pageSize : 10, page
    },
  )

  const posts = response.results.map(post => {
    return {
      slug: post.uid,
      image: {
        url: post.data.image.url,
        alt: post.data.image.alt
      },
      categories: post.data.related_category.slug,
      tags: post.tags,
      author: post.data.autohr.slug,
      title: RichText.asText(post.data.title),
      snippet: post.data.content.find((content:any) => content.type === 'paragraph')?.text ?? '',
      updatedAt: new Date(String(post.last_publication_date)).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      }),
    }
  } )

  const contents = {
    posts,
  }

  return {
    props: {
      contents
    },
    // revalidate: 60 + 60 //24 hours 60 * 60 * 24
  }
}
