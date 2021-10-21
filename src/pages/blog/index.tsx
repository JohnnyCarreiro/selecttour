import React from 'react'
import Head from 'next/head'

import { Container } from '@/styles/Blog'
import { Hero } from '@/components/Blog/Hero'
import { Header } from '@/components/Header'
import { MainPost } from '@/components/Blog/MainPost'
import { Posts } from '@/components/Blog/Posts'
import { Sidebar } from '@/components/Blog/Sidebar'

export default function Blog() {
  const contacts = {
    whatsapp_number: '',
    whatsapp_message: '',
    phone_number: '',
    email: '',
    facebook: '',
    instagram: '',
    linkedin: '',
  }
  return (
    <Container>
      <Head>
        <title>Select Tour - Blog</title>
      </Head>
      <Header contacts={contacts} />
      <Hero>
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
            <Sidebar className="elevation" />
          </aside>
        </div>
      </section>
    </Container>
  )
}
