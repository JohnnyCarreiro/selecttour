import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { GetServerSideProps, GetStaticProps } from 'next'
import Image from 'next/image'

import { Header } from '@/components/Header'
import { TextBlock } from '@/components/TextBlock'
import { RequestTravel } from '@/components/sections/RequestTravel'
import { Showcase } from '@/components/sections/Showcase'
import { TopPackages } from '@/components/sections/TopPackages'
import { TopDestinations } from '@/components/sections/TopDestinations'
import Testimonials from '@/components/sections/Testimonials'
import { Latests } from '@/components/sections/Latests'
import { Contact } from '@/components/sections/Contact'
import { Footer } from '@/components/Footer'
import { useNav } from '../Hooks/useNav'

import { Container } from '../styles/Home'

import { IContent, IHome } from '@/interfaces/IHome'
import { getHomeContent, useHomeContent } from '@/Hooks/Home/useHome'
import { dehydrate, QueryClient } from 'react-query'
import { useHomePackages } from '@/Hooks/Home/useHomePackages'
import WhatsappButton from '@/components/WhatsappButton'
import { useSiteContexts } from '@/Contexts/useSiteContext'


export const Home:React.FC<IContent> = () => {
  const STALE_TIME = 10 * 1000
  const STALE_TIME_PACKAGES = 10 * 1000
  const { data, isLoading, isFetching, error } = useHomeContent(STALE_TIME)

  const [content, setContent] = useState<IHome>(data?.content as IHome)
  const [packages, setPackages] = useState<Partial<IHome>>({} as Partial<IHome>)
  const { useContacts } = useSiteContexts()

  const {
    data:packages_data ,
    isLoading:packages_isLoading ,
    isFetching:packages_isFetching ,
    error:packages_error
  } = useHomePackages(STALE_TIME_PACKAGES)

  useEffect(() => {
    if(data){
      setContent(data.content)
    }
    if(packages_data){
      setPackages(packages_data)
    }
  })

  const {
    show_case_section,
    how_we_work_section,
    about_us_section,
    our_team_section,
    testimonials_section,
    contact_form_section,
  } = content

  const {
    top_packages_section,
    top_destinations_section
  } = packages

  const homeRef = useNav('Home')
  const aboutRef = useNav('About')
  const packagesRef = useNav('Top-packages')
  const workRef = useNav('How-we-work')
  const destiantionsRef = useNav('Top-destinations')
  const contactsRef = useNav('Contacts')

  return (
    <Container>
      <Head>
      {data && (
        <>
          <title>Select Tour - Mais que uma uma Viagem</title>

          <meta name="description" content={about_us_section.content} />

          <meta property="og:site_name" content="Select Tour Viagens" />

          <meta property="og:title" content={'Select Tour - Mais que uma uma Viagem'} />
          <meta property="og:description" content={about_us_section.content} />
          {/* Images */}
          <meta property="og:image" content={'https://selecttour.cdn.prismic.io/selecttour/b7be64f6-4edf-4d0d-99ad-6e732633294f_LOGO.svg'} />
          <meta property="og:image:type" content="image/png" />

          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={'Select Tour - Mais que uma uma Viagem'} />
          <meta name="twitter:description" content={about_us_section.content} />
          <meta name="twitter:image" content={'https://selecttour.cdn.prismic.io/selecttour/b7be64f6-4edf-4d0d-99ad-6e732633294f_LOGO.svg'} />
          {/* <link rel="canonical" href="https://www.selecttourviagens.com.br"/> */}
        </>
      )}
      </Head>
      {data && (
        <Header hasBlogPosts={data.hasBlogposts}/>
      )}
      <main>
        <section
          id="home"
          ref={homeRef}
        >
          <Showcase>
            <div className="wrapper">
              <div className="sowcase-content" >
                <img
                  loading="lazy"
                  src="./assets/images/LOGO.svg"
                  alt="Logo Select Tour"
                  // width={'422.19px'}
                  // height={'121.41px'}
                />
                {isLoading && (
                  <p>Carregando ...</p>
                )}
                {data && (
                  <>
                    <h1>{show_case_section?.main_title}</h1>
                    { show_case_section?.sub_title && (
                      <h2>{show_case_section?.sub_title}</h2>
                    ) }
                  </>
                )}
              </div>
            </div>
          </Showcase>
        </section>
        <section id="travel-request" className="wrapper" >
          <RequestTravel />
        </section>
        {isLoading && (
          <p>Carregando ...</p>
        )}
        {data && (
          <>
            <section
              style={{scrollMargin:"6.25rem 0 0 0"}}
              id="about"
              ref={aboutRef}
              className="section-bg"
            >
              <div className="wrapper">
                <TextBlock content_data={ about_us_section }/>
              </div>
            </section>
            <section
              style={{scrollMargin:"6.25rem 0 0 0"}}
              className="wrapper"
              id="top-packages"
              ref={packagesRef}
            >
              {top_packages_section && (
                <TopPackages content_data={top_packages_section} />
              )}
            </section>
            <section
              style={{scrollMargin:"6.25rem 0 0 0"}}
              className="section-bg"
              id="how-we-work"
              ref={workRef}
            >
              <div className="wrapper">
                <TextBlock content_data={ how_we_work_section }/>
              </div>
            </section>
            <section
              style={{scrollMargin:"6.25rem 0 0 0"}}
              id="top-destinations"
              className="wrapper"
              ref={destiantionsRef}
            >
              {top_destinations_section && (
                <TopDestinations content_data={top_destinations_section} />
              )}
            </section>
            <section
              style={{scrollMargin:"6.25rem 0 0 0"}}
              id="Team"
              className="section-bg"
            >
              <div className="wrapper">
                <TextBlock slice_label="our_team" content_data={ our_team_section }/>
              </div>
            </section>
            { testimonials_section.testimonials.length > 0
                && (
                  <section
                    style={{scrollMargin:"6.25rem 0 0 0"}}
                    id="testimonials"
                    className="wrapper"
                  >
                    <Testimonials content_data={testimonials_section} />
                  </section>
                )
            }
            {data.hasMoreThanthreePosts &&
            (
              <section id="latests" className="wrapper">
                <Latests />
              </section>
            )}
            <section
              style={{scrollMargin:"6.25rem 0 0 0"}}
              className="section-bg"
              id="contacts"
              ref={contactsRef}
            >
              <div className="wrapper">
                <Contact content_data={contact_form_section} />
              </div>
            </section>
          </>
        )}
        {content && (
          <WhatsappButton content={content.site_contacts_section} />
        )}
      </main>
      <Footer/>
    </Container>
  )
}

export default Home

const queryClient = new QueryClient()
const STALE_TIME = 10 * 1000 // 10 sec // 60 * 60 * 24 * 1000 //24 hours

export const getStaticProps: GetStaticProps = async () => {

  try {
    await queryClient.prefetchQuery(["main_home"], async () => {
      return await getHomeContent()
    }, { staleTime: STALE_TIME})

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
      revalidate: 60 * 60
    }
  } catch (error) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }
}
