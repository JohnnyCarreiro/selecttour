import { GetStaticPaths, GetStaticProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import Prismic from '@prismicio/client'
import { RichText } from "prismic-dom"
import { parseCookies, setCookie } from "nookies"

import { Hero } from "@/components/Blog/Hero"
import { Header } from "@/components/Header"
import { Container } from '@/styles/Blog'
import { Sidebar } from "@/components/Blog/Sidebar"
import { Footer } from "@/components/Footer"
import { getPrismicClient } from "@/services/prismic"
import { useEffect, useState } from "react"
import { useFilters } from "@/Hooks/useFilters"
import { getPosts, usePosts } from "@/Hooks/usePosts"
import { QueryClient } from "react-query"
import WhatsappButton from "@/components/WhatsappButton"
import { useSiteContexts } from "@/Contexts/useSiteContext"

interface IPostProps {
  post: {
    slug: string
    image:{
      url: string
      alt: string
    }
    title: string
    content: string
    updatedAt: string
  },
  error?: {
    slug: string
  }
}

export default function Post({ post, error }: IPostProps) {

  const { locale } = useRouter()
  const { useContacts } = useSiteContexts()


  const STALE_TIME = 10 * 1000
  const page = 1
  const { filteredTag, filteredCategory } = useFilters()
  const { data, isLoading, isFetching } = usePosts(STALE_TIME, page, filteredTag, filteredCategory)

  return (
    <Container>
      {post && (
        <>
          <Head>
            <title>{post.slug} | My Blog</title>
          </Head>
          <Hero image={post.image.url} title={post.image.alt} >
            <div className="wrapper">
              <div className="hero-content" >
                <img src={"/assets/images/LOGO.svg"} alt={"Logo Select Tour"} />
                <h1>{'Blog muitcho loko'}</h1>
                { post.title && (
                  <h2>{post.title}</h2>
                ) }
              </div>
            </div>
          </Hero>
          <Header hasBlogPosts={true}/>
          <main className={''} >
            <section className="wrapper">
              <div className="main-section">
                <article className="posts">
                  <div className="widget-content">
                   <div className="post-content elevation">
                    <h2>{post.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: post.content}} >
                    </div>
                    </div>
                  </div>
                </article>
                <aside className="sidebar">
                <Sidebar
                  className="elevation"
                  filteredCategory={data?.filteredCategory}
                  filteredTag={data?.filteredTag}
                  ifNotHome={true}
                />
                </aside>
              </div>
            </section>
            <Footer />
          </main>
        </>
      )}
      {error && (
        <>
          <Head>
            <title> Não Encontrado | Select Tour Blog</title>
          </Head>
          <Hero image={post?.image.url} title="Algo deu Errado">
            <div className="wrapper">
              <div className="hero-content" >
                <img src="/assets/images/LOGO.svg" alt="Logo Select Tour" />
                <h1>{'Blog muitcho loko'}</h1>
              </div>
            </div>
          </Hero>
          <main className={''} >
          <section className="wrapper">
            <div className="main-section">
              <article className="posts">
                <div className="widget-content">
                  <div className="post-content elevation">
                  <h2>Post não encontrado</h2>
                  <p>Veja nossa ultimas publicações <a href='/blog'><strong>aqui</strong></a></p>
                  </div>
                </div>
              </article>
            </div>
          </section>
          </main>
          <Footer />
        </>
      )}
      {useContacts && (
        <WhatsappButton content={useContacts} />
      )}
    </Container>
  )
}

export const getStaticPaths: GetStaticPaths = async  () => {

  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'post'),
  ],
    {
      orderings : '[document.last_publication_date desc]' ,
      pageSize : 2,
      page: 1,
      fetchLinks : ['author.author', 'category.category']
    },
  )

  const posts = response.results

  const paths = posts.map((post) => ({
    params: { slug: post.uid, },
  }))
  return {
    paths,
    fallback: "blocking"
  }
}
const queryClient = new QueryClient()
const STALE_TIME = 10 * 1000


export const getStaticProps: GetStaticProps = async (context) => {

  const { params } = context
  const { slug } = params!

  const prismic = getPrismicClient()
  const response = await prismic.getByUID('post', String(slug),{})

  try {
    const tag = ''
    const category = ''
    const page = 1
    await queryClient.prefetchQuery(["posts",tag, category, page], async () => {
      return await getPosts()
    }, { staleTime: STALE_TIME})

    const post = {
      slug,
      title: RichText.asText(response.data.title),
      image: {
        url: response.data.image.url,
        alt: response.data.image.alt
      },
      content: RichText.asHtml(response.data.content),
      updatedAt: new Date(String(response.last_publication_date)).toLocaleDateString('pt-BR',{
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    }

    return {
      props:{
        post,
      },
      revalidate: 60 * 60 // 60 * 60 * 24 * 7
    }
  } catch (error) {
    return {
      props: {
        error: {
          slug
        }
      }
    }
  }
}
