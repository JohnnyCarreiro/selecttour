import React, { useContext, useEffect } from 'react'
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
import { GetServerSideProps, GetStaticProps } from 'next'
import { useBlogPost, BlogPostProvider } from '@/Contexts/BlogPostContext'

interface IContentProps {
  tags:Array<string>
  categories: Array<{category:string}>
}

export default function Blog({contents}: any) {
  const contacts = {
    whatsapp_number: '',
    whatsapp_message: '',
    phone_number: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  }
  console.log(contents)

  const { tags , categories, posts:apiPost } = contents

  const { setTags, setCategories } = useBlogPost()
  useEffect(() => {
    setTags(tags)
    setCategories(categories)
  },[])
  console.log('Categorias', categories)
  return (
    <Container>
      <Head>
        <title>Select Tour - Blog</title>
      </Head>
      <Header contacts={contacts} />
      <Hero image={'https://images.prismic.io/selecttour/4a8c29d7-1559-4c96-8e2f-863c65040f39_foto-abre-pgalinhas011.jpg'} >
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
              <MainPost className="elevation" />
              <Posts className="elevation"/>
            </div>
          </section>
          <aside className="sidebar">
            <Sidebar
              className="elevation"
              categories={categories}
              tags={tags}
            />
          </aside>
        </div>
      </section>
      <Footer />
    </Container>
  )
}
// Blog.provider = BlogPostProvider
export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient()

  //Fetching all posts to main blog page
  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post')
  ])
  //Fetch all categories
  const fetchCategories = await prismic.query([
    Prismic.predicates.at('document.type', 'category')
  ])
  //Fetching all Tags
  const tags = await prismic.getTags()

  // const response2 = await prismic.query([
  //   Prismic.predicates.at('document.type', 'post'),
  //   Prismic.Predicates.at('my.post.related_category', 'YXcMShIAACwAyMWh')
  // ])
  // const response3 = await prismic.query([
  //   Prismic.predicates.at('document.type', 'post'),
  //   Prismic.Predicates.at('my.post.related_category', 'YXcMShIAACwAyMWh'),
  //   Prismic.predicates.any('document.tags',[])
  // ])
  const categories = fetchCategories.results.map(category => {
    return {
      category: RichText.asText(category.data.category)
    }
  })

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
    categories,
    tags,
    posts
  }



  // console.log('Conteúdo',JSON.stringify(content, null , 2))
  // console.log('o resto:',JSON.stringify(content.splice(-1,1), null , 2))
  // console.log('Tags:',JSON.stringify(tags, null , 2))


  return {
    props: {
      contents
    },
    revalidate: 60 + 60 //24 hours 60 * 60 * 24
  }
}
