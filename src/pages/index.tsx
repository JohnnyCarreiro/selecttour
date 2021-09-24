import Head from 'next/head'

import { Header } from '@/components/Header'
import { TextBlock } from '@/components/TextBlock'
import { RequestTravel } from '@/components/sections/RequestTravel'
import { Showcase } from '@/components/sections/Showcase'
import Image from 'assets/imgs/image.svg'

import { Container } from '../styles/Home'
import React from 'react'
import { TopPackages } from '@/components/sections/TopPackages'
import { Package } from '@/components/Package'
import { TopDestinations } from '@/components/sections/TopDestinations'
import { Destination } from '@/components/Destination'
import Testimonials from '@/components/sections/Testimonials'

export default function Home() {
  return (
    <Container id="home">
      <Head>
        <title>Select Tour - Mais que uma uma Viagem</title>
      </Head>
      <Header current="Inicio"/>
      <section>
        <Showcase>
          <div className="wrapper sowcase-content">
            <img src="/assets/images/LOGO.svg" alt="Logo Select Tour" />
            <h1>Mais que uma simples viagem</h1>
            <h2>Something goes here</h2>
          </div>
        </Showcase>
      </section>
      <section id="travel-request" className="wrapper" >
        <RequestTravel />
      </section>
      <section className="section-bg" >
        <div className="wrapper">
          <TextBlock content_data={{main_title: "Como Atuamos", subtitle:"Saiba como podemos te ajudar a ter uma experiência inesquecível", image:'assets/images/image.svg', contents:[{title:"title"}]}}/>
        </div>
      </section>
      <section id="top-packages" className="wrapper">
        <TopPackages>
          <Package />
          <Package />
          <Package />
          <Package />
          <Package />
          <Package />
        </TopPackages>
      </section>
      <section id="about" className="section-bg" >
        <div className="wrapper">
        <TextBlock content_data={{main_title: "Sobre a Select Tour", subtitle:"Saiba mais a nosso respeito, como atuamos e como temos você, nosso cliente no centro de tudo!", image:'assets/images/LOGO.svg', contents:[{title:"Something goes here"}]}}/>
        </div>
      </section>
      <section id="top-destinations" className="wrapper">
        <TopDestinations>
          <Destination />
          <Destination />
          <Destination />
          <Destination />
        </TopDestinations>
      </section>
      <section id="team" className="section-bg">
        <div className="wrapper">
          <TextBlock content_data={{main_title: "Conheça o nosso Time", subtitle:"Saiba mais a nosso respeito, como atuamos e como temos você, nosso cliente no centro de tudo!", image:'assets/images/LOGO.svg', contents:[{title:"Something goes here"}]}}/>
        </div>
      </section>
      <section id="testimonials" className="wrapper">
        <Testimonials testimonials={{main_title: "O que nossos clientes dizem", subtitle: "Mussum Ipsum, cacilds vidis litro abertis. Mauris nec dolor in eros commodo tempor."}} />
      </section>
    </Container>
  )
}
