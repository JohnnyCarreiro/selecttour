import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import Link from "next/link"
import Prismic from '@prismicio/client'
import { RichText } from "prismic-dom"
import { parseCookies, setCookie } from "nookies"

import { Hero } from "@/components/Blog/Hero"
import { Header } from "@/components/Header"
import { Container } from '@/styles/Blog'
import { Sidebar } from "@/components/Blog/Sidebar"
import { Footer } from "@/components/Footer"
import { getPrismicClient } from "@/services/prismic"

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

  // const [post, setPost] = useState()

  const { 'test.cookie':test } = parseCookies()

  console.log('Teste: ', test)

  const { locale } = useRouter()
  const contacts = {
    whatsapp_number: '',
    whatsapp_message: '',
    phone_number: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  }

  // const {
  //   slug,
  //   title,
  //   image,
  //   content,
  //   updatedAt,
  // } = post

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
          <Header contacts={contacts} />
          <main className={''} >
            <section className="wrapper">
              <div className="main-section">
                <article className="posts">
                  {/* <div className="header">
                    <h2>Confira nossas últimas postagens</h2>
                    <h3>
                      Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.
                      Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.
                    </h3>
                  </div> */}
                  <div className="widget-content">
                   <div className="post-content elevation">
                    <h2>{post.title}</h2>
                    <div dangerouslySetInnerHTML={{__html: post.content}} >
                    </div>
                    </div>
                  </div>
                </article>
                <aside className="sidebar">
                  <Sidebar className="elevation" />
                </aside>
              </div>
            </section>
            <Footer />
            {/* <article className={''} >
              <h1>{post.title}</h1>
              <time>{post.updatedAt}</time>
              <div
                className={''}
                dangerouslySetInnerHTML={{ __html:post.content }}
              />
            </article> */}
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
                {/* { show_case_section?.sub_title && (
                  <h2>{show_case_section?.sub_title}</h2>
                ) } */}
              </div>
            </div>
          </Hero>
          <main className={''} >
          <section className="wrapper">
            <div className="main-section">
              <article className="posts">
                {/* <div className="header">
                  <h2>Confira nossas últimas postagens</h2>
                  <h3>
                    Mussum Ipsum, cacilds vidis litro abertis. Casamentiss faiz malandris se pirulitá.
                    Interessantiss quisso pudia ce receita de bolis, mais bolis eu num gostis.
                  </h3>
                </div> */}
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
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query, params, req } = context
  const { slug } = params!

  const prismic = getPrismicClient(req)
  const response = await prismic.getByUID('post', String(slug),{})

  console.log(response)

  try {

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
      }
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

  const post = {
    slug,
    image: 'https://images.prismic.io/selecttour/b64d11a8-0407-470a-b9e2-7cc6b16bc7dd_La+Torre.jpg',
    title: 'Título foda',
    content: '<p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às <strong>pessoas que buscam viagens</strong> tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.</p><p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às pessoas que buscam viagens tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.</p><p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às pessoas que buscam viagens tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.<img src="https://images.prismic.io/selecttour/b64d11a8-0407-470a-b9e2-7cc6b16bc7dd_La+Torre.jpg"></img></p><p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às pessoas que buscam viagens tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.</p><p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às pessoas que buscam viagens tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.</p><p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às pessoas que buscam viagens tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.</p><p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às pessoas que buscam viagens tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.</p><p>A Select Tour Viagens é uma agência de viagens focada no atendimento ao cliente. Nossa missão é proporcionar uma experiência diferenciada às pessoas que buscam viagens tanto a lazer quanto a trabalho, oferecendo atendimento personalizado. </p><p>Seja uma simples passagem aérea, ou um roteiro personalizado, estamos aqui para ajudá-lo a realizar o seu sonho de viajar! Nossos principais produtos são: passagens aéreas nacionais e internacionais, hotéis nacionais e internacionais, seguro viagem, locação de carro, passeios, transfers, ingressos, pacotes promocionais, roteiros completos com guia, roteiros personalizados, assessoria para vistos. Tudo isso aliado a um atendimento rápido e assessoria completa, que acompanhará você desde o orçamento, fechamento da viagem, embarque e retorno.</p>',
    updatedAt: new Date().toLocaleDateString('pt-BR',{
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })
  }

  return {
    props:{
      post,
    }
  }
  // return {
  //   props: {
  //     post,
  //     error: {
  //       slug
  //     }
  //   }
  // }


  // try {
  //   const prismic = getPrismicClient(req)
  //   const response = await prismic.getByUID('posts', String(slug),{
  //   lang: String(locale)
  // })

  // const post = {
  //   slug,
  //   title: RichText.asText(response.data.title),
  //   content: RichText.asHtml(response.data.content),
  //   updatedAt: new Date(String(response.last_publication_date)).toLocaleDateString('en-US',{
  //     day: '2-digit',
  //     month: 'long',
  //     year: 'numeric'
  //   })
  // }

  // return {
  //   props:{
  //     post,
  //   }
  // }
  // } catch (error) {
  //   return {
  //     props: {
  //       error: {
  //         slug
  //       }
  //     }
  //   }
  // }
}
