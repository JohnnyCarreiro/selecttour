import { Header } from '@/components/Header'
import { RequestTravel } from '@/components/RequestTravel'
import { Showcase } from '@/components/Showcase'
import Head from 'next/head'
import { Container } from '../styles/Home'

export default function Home() {
  const travelFields = {
      name_label: 'string',
      name_field: 'string',
      email_label: 'string',
      email_field: 'string',
      phone_label: 'string',
      phone_field: 'string',
      from_label: 'string',
      from_field: 'string',
      to_label: 'string',
      to_field: 'string',
      departure_label: 'string',
      departure_field: 'string',
      returns_label: 'string',
      returns_field: 'string',
      adults_label: 'string',
      adults_field: 'string',
      child_label: 'string',
      child_field: 'string',
      class_label: 'string',
      class_field: 'string',
      accomodatio_label: 'string',
      accomodation_field: 'string',
      observations_label: 'string',
      observations_field: 'string',
      whatsapp_message: 'string',
    }
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
    </Container>
  )
}
