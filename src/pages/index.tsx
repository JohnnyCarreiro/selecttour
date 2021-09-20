import { Header } from '@/components/Header'
import { Showcase } from '@/components/Showcase'
import Head from 'next/head'
import { Container } from '../styles/Home'

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Select Tour - Mais que uma uma Viagem</title>
      </Head>
      <Header current="Inicio"/>
      <section>
        <Showcase>
          <div className="wrapper">
            <img src="/assets/images/LOGO.svg" alt="Logo Select Tour" />
            <h1>Mais que uma simples viagem</h1>
            <h2>Something goes here</h2>
          </div>
        </Showcase>
      </section>
    </Container>
  )
}
