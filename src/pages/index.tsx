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
        </Showcase>
      </section>
    </Container>
  )
}
