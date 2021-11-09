import React, { useEffect, useState } from 'react'
import {  GetServerSideProps } from 'next'
import Head from 'next/head'
import { QueryClient, } from "react-query"
import { dehydrate } from "react-query/hydration"

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
import Button from '@/components/Button'
import { getPosts, usePosts } from "@/Hooks/usePosts"
import { useFilters } from "@/Hooks/useFilters"
import { getBlogHomeContent, useBlogHomeContent } from '@/Hooks/useBlogHome'

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


export interface IContentProps {
  blogHome: {
    id: string
    hero_title:string
    title: string
    content: string
  }
  contents:{
    posts: Array<PostData>
  }
  pages: {
    currentPage: number
    totalPages: number
  },
  filteredCategory:string
  filteredTag: string
  categories: Array<string>
  tags: Array<string>
  error?: { message: string }
}

export default function Blog<NextPage>(props: IContentProps) {

  const contacts = {
    whatsapp_number: '',
    whatsapp_message: '',
    phone_number: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  }

  const STALE_TIME = 10 * 1000
  const STALE_TIME_BLOG = 10 * 1000
  const [page, setPage] =useState<number>()

  const { filteredTag, filteredCategory } = useFilters()

  const { data, isLoading, isFetching, error } = usePosts(STALE_TIME, page, filteredTag, filteredCategory)
  const {
    data: blogData,
    isLoading: blogIsLoading,
    isFetching: blogIsFetching,
    error: blogError
  } = useBlogHomeContent(STALE_TIME_BLOG)

  console.log(blogData)

  useEffect(() => {
    if(data){
      setPage(data.pages.currentPage)
    }
  }, [data])

  const loadPosts = (pageNumber: number) => {
    setPage(pageNumber)
  }

  const prevPage = () => {

    if(data?.pages.currentPage === 1) return
    const pageNumber = Number(data?.pages.currentPage) -1

    loadPosts(pageNumber)
  }
  const nextPage = () => {
    if(data?.pages.currentPage === data?.pages.totalPages) return
    const pageNumber = Number(data?.pages.currentPage) +1

    loadPosts(pageNumber)
  }

  const [mainImage, setMainImage] = useState<PostData["image"] | undefined>({} as PostData["image"])

  useEffect(() => {
    const image = data?.contents.posts[Math.floor(Math.random() * (data.contents.posts.length - 0)) + 0]?.image

    setMainImage(image)
  },[data?.contents.posts])

  return (
    <Container>
      <Head>
        <title>Select Tour - Blog</title>
      </Head>
      <Header contacts={contacts} />
      <Hero image={mainImage ? mainImage?.url : ''} >
        <div className="wrapper">
          <div className="hero-content" >
            <img src="/assets/images/LOGO.svg" alt="Logo Select Tour" />
            <h1>{blogData && blogData.hero_title}</h1>
          </div>
        </div>
      </Hero>
      <section className="wrapper">
        <div className="main-section">
          <section className="posts">
            <div className="header">
              {blogData && (
                <>
                  <h2>{blogData.title}</h2>
                  <h3 dangerouslySetInnerHTML={{__html: blogData.content}} />
                </>
              )}
              {isFetching && (
                <p>Atualizando Postagens...</p>
              )}
            </div>
            <div className="widget-content">
              {isLoading && <p>Carregando Postagens...</p>}
              {!!data
                ? (
                  <>
                    <MainPost contentData={data?.contents.posts[0]} className="elevation" />
                    {data?.contents.posts.length > 1 && (
                      <Posts contentData={data.contents.posts} className="elevation"/>
                    )}
                  </>
                )
                : error && (
                  <p>Algum erro acontenceu em nosso Servidor, volte mais tarde ou entre em contato para nos notificar sobre o erro</p>
                )
              }
              {data?.pages.totalPages && data?.pages.totalPages > 1 && (
                <div className="pagination">
                <div>
                <Button
                  disabled={data?.pages.currentPage === 1}
                  text={"Primeira Página"}
                  isPrimary={false}
                  primaryColor={true}
                  onClick={() => {loadPosts(Number(1))}}
                />
                </div>
                <div>
                  <Button
                    disabled={data?.pages.currentPage === 1}
                    text={"Anterior"} isPrimary={false}
                    primaryColor={true}
                    onClick={prevPage}
                  />
                  <div className="current-page">{data?.pages.currentPage}</div>
                  <Button
                    disabled={data?.pages.currentPage === data?.pages.totalPages}
                    text={"Próxima"}
                    isPrimary={false}
                    primaryColor={true}
                    onClick={nextPage}
                  />
                </div>
                <div>
                  <Button
                    disabled={data?.pages.currentPage === data?.pages.totalPages}
                    text={"Última Página"}
                    isPrimary={false}
                    primaryColor={true}
                    onClick={() => {loadPosts(Number(data?.pages.totalPages))}}
                  />
                </div>
              </div>
              )
            }
            </div>
          </section>
          <aside className="sidebar">
            <Sidebar
              className="elevation"
              filteredCategory={data?.filteredCategory}
              filteredTag={data?.filteredTag}
            />
          </aside>
        </div>
      </section>
      <Footer />
    </Container>
  )
}
Blog.provider = BlogPostProvider

const queryClient = new QueryClient()
const STALE_TIME = 10 * 1000 // 10 sec // 60 * 60 * 24 * 1000 //24 hours
const STALE_TIME_BLOG = 10 * 1000 // 10 sec // 60 * 60 * 24 * 1000 //24 hours

export const getServerSideProps: GetServerSideProps = async (context) => {

  try {
    const tag = ''
    const category = ''
    const page = 1
    await queryClient.prefetchQuery(["posts",tag, category, page], async () => {
      return await getPosts()
    }, { staleTime: STALE_TIME})
    await queryClient.prefetchQuery(["home_blog"], async () => {
      return await getBlogHomeContent()
    }, {
      staleTime: STALE_TIME_BLOG ? STALE_TIME : 10000,
    })

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  } catch (error) {
    return {
      props: {
        error: {
          message: 'Algum erro acontenceu em nosso Servidor, volte mais tarde ou entre em contato para nos comunicar do erro'
        }
      }
    }
  }
}
