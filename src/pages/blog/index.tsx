import type { NextPage } from "next"
import React, { useEffect, useState } from 'react'
import {  GetServerSideProps, GetStaticProps } from 'next'
import Head from 'next/head'
import { useQuery, QueryClient, QueryFunctionContext, QueryFunction } from "react-query"
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
import { setCookie } from 'nookies'
import { useRouter } from 'next/router'
import Button from '@/components/Button'
import { api } from '@/utils/api'
import { AxiosResponse } from "axios"
import { getPosts, usePosts } from "@/Hooks/usePosts"

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

  console.log(props)
  const contacts = {
    whatsapp_number: '',
    whatsapp_message: '',
    phone_number: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  }

  const router = useRouter()

  const { query } = router
  const STALE_TIME = 10 * 1000
  const [page, setPage] =useState<number>()
  const [tag, setTag] =useState<string>('')
  const [category, setCategory] =useState<string>('')

  const { data, isLoading, isFetching, error } = usePosts(query, STALE_TIME, page)

  useEffect(() => {
    if(data){
      setPage(data.pages.currentPage)
      // setTag(data.filteredTag)
      // setCategory(data.filteredCategory)
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
              <div className="pagination">
                <div>
                <Button
                  text={"Primeira Página"}
                  isPrimary={false}
                  primaryColor={true}
                  onClick={() => router.push(`/blog?page=1`)}
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
                    text={"Última Página"}
                    isPrimary={false}
                    primaryColor={true}
                    onClick={() => {router.push(`/blog?page=${data?.pages.totalPages}`)}}
                  />
                </div>
              </div>
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
Blog.provider = BlogPostProvider

const queryClient = new QueryClient()
const STALE_TIME = 10 * 1000 // 10 sec // 60 * 60 * 24 * 1000 //24 hours

export const getServerSideProps: GetServerSideProps = async (context) => {

  console.log(context.query)

  const { query } = context

  // const data = await getPosts(query)

  try {
    //Pass tags and categories here, before page
    const tag = ''
    const category = ''
    const page = 1
    await queryClient.prefetchQuery(["posts",tag, category, page], async () => {
      return await getPosts(query)
    }, { staleTime: STALE_TIME})

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
// export const getServerSideProps: GetServerSideProps = async (context) => {

//   // const { query } = context

//   // const prismic = getPrismicClient()

//   // try {
//   //   //Fetch all categories
//   //   const fetchCategories = await prismic.query([
//   //     Prismic.predicates.at('document.type', 'category')
//   //   ])
//   //   //Fetching all Tags
//   //   const tags = await prismic.getTags()

//   //   const categories = fetchCategories.results.map(category => {
//   //     return RichText.asText(category.data.category)
//   //   })


//   //   setCookie(context, 'selecttour.blog.tags', String(tags), {
//   //     maxAge: 60 * 60 * 24 * 7 ,// One week
//   //     path: "/"
//   //   })
//   //   setCookie(context, 'selecttour.blog.categories', String(categories), {
//   //     maxAge: 60 * 60 * 24 * 7 ,// One week
//   //     path: "/"
//   //   })
//   //   const page = query ? Number(query?.page) : 1

//   //   if(query.category_filter){
//   //     const { category_filter } = query
//   //     const category = await prismic.query([
//   //       Prismic.predicates.at('document.type', 'category'),
//   //       Prismic.predicates.fulltext('my.category.uid', String(category_filter))// .toLowerCase().replace(' ', '-')Do this on the function wich will call this method
//   //     ])
//   //     console.log(category.results.filter(category => category.uid === String(category_filter))[0].id)
//   //     const filteredCategoryId = category.results.filter(category => category.uid === String(category_filter))[0].id
//   //     const filteredCategory = category.results.filter(category => category.uid === String(category_filter))[0].uid

//   //     const response = await prismic.query([
//   //       Prismic.predicates.at('document.type', 'post'),
//   //       Prismic.predicates.at('my.post.related_category', filteredCategoryId )
//   //     ],
//   //       {
//   //         orderings : '[document.last_publication_date desc]' ,
//   //         pageSize : 2,
//   //         page,
//   //         fetchLinks : ['author.author', 'category.category']
//   //       },
//   //     )

//   //     const pages = {
//   //       currentPage: Number(response.page),
//   //       totalPages: Number(response.total_pages)
//   //     }

//   //     const posts = response.results.map(post => {
//   //       return {
//   //         slug: post.uid,
//   //         image: {
//   //           url: post.data.image.url,
//   //           alt: post.data.image.alt
//   //         },
//   //         categories: RichText.asText(post.data.related_category.data.category),
//   //         tags: post.tags,
//   //         author: RichText.asText(post.data.autohr.data.author),
//   //         title: RichText.asText(post.data.title),
//   //         snippet: post.data.content.find((content:any) => content.type === 'paragraph')?.text ?? '',
//   //         updatedAt: new Date(String(post.last_publication_date)).toLocaleDateString('pt-BR',{
//   //           day: '2-digit',
//   //           month: 'long',
//   //           year: 'numeric'
//   //         }),
//   //       }
//   //     } )

//   //     const contents = {
//   //       posts,
//   //     }

//   //     return {
//   //       props: {
//   //         contents,
//   //         pages,
//   //         filteredCategory
//   //       },
//   //       // revalidate: 60 + 60 //24 hours 60 * 60 * 24  YXcMShIAACwAyMWh
//   //     }

//   //   }
//   //   const response = await prismic.query([
//   //     Prismic.predicates.at('document.type', 'post'),
//   //   ],
//   //     {
//   //       orderings : '[document.last_publication_date desc]' ,
//   //       pageSize : 2,
//   //       page,
//   //       fetchLinks : ['author.author', 'category.category']
//   //     },
//   //   )
//   //   console.log(JSON.stringify(response, null, 1))

//   //   const pages = {
//   //     currentPage: Number(response.page),
//   //     totalPages: Number(response.total_pages)
//   //   }

//   //   const posts = response.results.map(post => {
//   //     return {
//   //       slug: post.uid,
//   //       image: {
//   //         url: post.data.image.url,
//   //         alt: post.data.image.alt
//   //       },
//   //       categories: RichText.asText(post.data.related_category.data.category),
//   //       tags: post.tags,
//   //       author: RichText.asText(post.data.autohr.data.author),
//   //       title: RichText.asText(post.data.title),
//   //       snippet: post.data.content.find((content:any) => content.type === 'paragraph')?.text ?? '',
//   //       updatedAt: new Date(String(post.last_publication_date)).toLocaleDateString('pt-BR',{
//   //         day: '2-digit',
//   //         month: 'long',
//   //         year: 'numeric'
//   //       }),
//   //     }
//   //   } )

//   //   const contents = {
//   //     posts,
//   //   }

//   //   return {
//   //     props: {
//   //       contents,
//   //       pages
//   //     },
//   //     // revalidate: 60 + 60 //24 hours 60 * 60 * 24
//   //   }

//   // } catch (error) {
//   //   return {
//   //     props: {
//   //       error: {
//   //         message: 'Algum erro acontenceu em nosso Servidor, volte mais tarde ou entre em contato para nos comunicar do erro'
//   //       }
//   //     }
//   //   }
//   // }

//   return {
//     props: {

//     }
//   }
// }
