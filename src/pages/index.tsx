import Head from 'next/head'

import { Header } from '@/components/Header'
import { TextBlock } from '@/components/TextBlock'
import { RequestTravel } from '@/components/sections/RequestTravel'
import { Showcase } from '@/components/sections/Showcase'
import Image from 'assets/imgs/image.svg'

import { Container } from '../styles/Home'
import React from 'react'

export default function Home() {
  return (
    <Container>
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
      <section className="wrapper" >
        <RequestTravel />
      </section>
      <section className="how-we-work" >
        <div className="wrapper">
          <TextBlock content_data={{image:'assets/images/image.svg', contents:[{title:"title"}]}}/>
        </div>
      </section>
    </Container>
  )
}
