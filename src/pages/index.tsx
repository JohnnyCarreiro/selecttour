import React from 'react'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

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
import { getPrismicClient } from '@/services/prismic'
import { IContent } from '@/interfaces/IHome'
import { useNav } from '@/Hooks/useNav'

import { Container } from '../styles/Home'

export const Home:React.FC<IContent> = ({content}) => {
  const {
    show_case_section,
    how_we_work_section,
    top_destinations_section,
    about_us_section,
    top_packages_section,
    our_team_section,
    testimonials_section,
    contact_form_section,
    site_contacts_section
  } = content[0]

  const homeRef = useNav('Home')
  const aboutRef = useNav('About')
  const packagesRef = useNav('Top-packages')
  const workRef = useNav('How-we-work')
  const destiantionsRef = useNav('Top-destinations')
  const contactsRef = useNav('Contacts')

  return (
    <Container>
      <Head>
        <title>Select Tour - Mais que uma uma Viagem</title>
      </Head>
      <Header contacts={site_contacts_section} />
      <main>
        <section
          id="home"
          ref={homeRef}
        >
          <Showcase>
            <div className="wrapper">
              <div className="sowcase-content" >
                <img src="/assets/images/LOGO.svg" alt="Logo Select Tour" />
                <h1>{show_case_section?.main_title}</h1>
                { show_case_section?.sub_title && (
                  <h2>{show_case_section?.sub_title}</h2>
                ) }
              </div>
            </div>
          </Showcase>
        </section>
        <section id="travel-request" className="wrapper" >
          <RequestTravel />
        </section>
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
          <TopPackages content_data={ top_packages_section } />
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
          <TopDestinations content_data={top_destinations_section} />
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
        {/* <section id="latests" className="wrapper">
          <Latests />
        </section> */}
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
      </main>
      <Footer/>
    </Container>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {

  const prismic = getPrismicClient()

  const response = await prismic.query([
    Prismic.predicates.at('document.type', 'selecttour')
  ])

  const content = response.results.map(content => {
    const showCase = content.data
    const howWeWork = content.data.body.find((section: any) => section.slice_label === 'how_we_work')
    const packages = content.data.body.find((section: any) => section.slice_label === 'top_package')
    const aboutUs = content.data.body.find((section: any) => section.slice_label === 'about_us')
    const topDestinations = content.data.body.find((section: any) => section.slice_label === 'destinations')
    const ourTeam = content.data.body.find((section: any) => section.slice_label === 'our_team')
    const testimonials = content.data.body.find((section: any) => section.slice_label === 'testimonials')
    const contacts = content.data.body.find((section: any) => section.slice_label === 'contact_form')
    const siteContacts = content.data.body.find((section: any) => section.slice_label === 'site_contacts')

    return {
      show_case_section:{
        main_title: RichText.asText(showCase.main_title),
        sub_title: RichText.asText(showCase.main_subtitle),
      },
      how_we_work_section: {
        title: RichText.asText(howWeWork.primary.title),
        subtitle: RichText.asText(howWeWork.primary.subtitle),
        image_url: howWeWork.primary.text_image_img.url,
        content: RichText.asHtml(howWeWork.primary.content)
      },
      top_packages_section: {
        title: RichText.asText(packages.primary.package_title),
        subtitle: RichText.asText(packages.primary.package_subtitle),
        packages: packages.items.map((travelPackage: any) => {
          return {
            image: travelPackage.package_img.url,
            destination: RichText.asText(travelPackage.destination),
            value: RichText.asText(travelPackage.value),
            time_amount: RichText.asText(travelPackage.time_amount),
            hotel_classification: RichText.asText(travelPackage.hotel_classification),
            transportations: RichText.asText(travelPackage.transportations),
            meal_options: RichText.asText(travelPackage.meal_options),
            qualification: travelPackage.qualification,
            know_more_infos: RichText.asHtml(travelPackage.know_more),
            reservation: RichText.asHtml(travelPackage.reservation),
          }
        })
      },
      about_us_section: {
        title: RichText.asText(aboutUs.primary.title),
        subtitle: RichText.asText(aboutUs.primary.subtitle),
        image_url: aboutUs.primary.text_image_img.url,
        content: RichText.asHtml(aboutUs.primary.content)
      },
      top_destinations_section: {
        title: RichText.asText(topDestinations.primary.title),
        subtitle: RichText.asText(topDestinations.primary.subtitle),
        destinations: topDestinations.items.map((destination: any) => {
          return {
            image: destination.img.url,
            destination: RichText.asText(destination.country),
            highlights: RichText.asText(destination.highlights),
            know_more_infos: RichText.asHtml(destination.know_more),
          }
        })
      },
      our_team_section: {
        title: RichText.asText(ourTeam.primary.title),
        subtitle: RichText.asText(ourTeam.primary.subtitle),
        image_url: ourTeam.primary.text_image_img.url,
        content: RichText.asHtml(ourTeam.primary.content)
      },
      testimonials_section: {
        title: RichText.asText(testimonials.primary.title),
        subtitle: RichText.asText(testimonials.primary.subtitle),
        testimonials: testimonials.items.map((testimonial: any) => {
          return {
            image: testimonial.customer_img.url,
            name: RichText.asText(testimonial.name),
            testimonial: RichText.asText(testimonial.testimonial),
          }
        })
      },
      contact_form_section: {
        title: RichText.asText(contacts.primary.title),
        subtitle: RichText.asText(contacts.primary.subtitle),
        email: RichText.asText(contacts.primary.email),
        phone: RichText.asText(contacts.primary.phone),
      },
      site_contacts_section: {
        whatsapp_number: RichText.asText(siteContacts.primary.whatsapp_number),
        whatsapp_message: RichText.asText(siteContacts.primary.whatsapp_message),
        phone_number: RichText.asText(siteContacts.primary.phone_number),
        email: RichText.asText(siteContacts.primary.email),
        facebook: RichText.asText(siteContacts.primary.facebook),
        instagram: RichText.asText(siteContacts.primary.instagram),
        linkedin: RichText.asText(siteContacts.primary.linkedin),
      }
    }
  })

  return {
    props: {
      content
    },
    revalidate: 60 + 60 //24 hours 60 * 60 * 24
  }
}
