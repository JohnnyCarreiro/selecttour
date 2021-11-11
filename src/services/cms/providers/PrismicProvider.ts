import { getPrismicClient } from "@/services/prismic"
import { ICMSData } from "../entities/CMSData"
import { ICMSProvider, IQueryParams } from "./ICMSProvider"

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'
import { CMSHomeData, IHomeData } from "../entities/CMSHomeData"

export class PrismicProvider implements ICMSProvider<IHomeData> {
  constructor(){}

  async fetchingHomeContent(): Promise<IHomeData> {
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
    })[0]

    const {
      about_us_section,
      contact_form_section,
      how_we_work_section,
      our_team_section,
      show_case_section,
      site_contacts_section,
      testimonials_section,
      top_destinations_section,
      top_packages_section,
    } = content

    return {
      about_us_section,
      contact_form_section,
      how_we_work_section,
      our_team_section,
      show_case_section,
      site_contacts_section,
      testimonials_section,
      top_destinations_section,
      top_packages_section
    }
  }

  async fetchingAll(queryParams: Partial<IQueryParams>): Promise<ICMSData> {
    const prismic = getPrismicClient()

    const { page = 1 } = queryParams

    try {
      // Fetch all categories
      const fetchCategories = await prismic.query([
        Prismic.predicates.at('document.type', 'category')
      ])
      //Fetching all Tags
      const tags = await prismic.getTags()

      const categories = fetchCategories.results.map(category => {
        return RichText.asText(category.data.category)
      })
      const postResponse = await prismic.query([
        Prismic.predicates.at('document.type', 'post'),
      ],
        {
          orderings : '[document.last_publication_date desc]' ,
          pageSize : 2,
          page,
          fetchLinks : ['author.author', 'category.category']
        },
      )

      const pages = {
        currentPage: Number(postResponse.page),
        totalPages: Number(postResponse.total_pages)
      }

      const posts = postResponse.results.map(post => {
        return {
          slug: post.uid,
          image: {
            url: post.data.image.url,
            alt: post.data.image.alt
          },
          categories: RichText.asText(post.data.related_category.data.category),
          tags: post.tags,
          author: RichText.asText(post.data.autohr.data.author),
          title: RichText.asText(post.data.title),
          snippet: post.data.content.find((content:any) => content.type === 'paragraph')?.text ?? '',
          updatedAt: new Date(String(post.last_publication_date)).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }),
        }
      } )
      const blogHomeResponse = await prismic.query([
        Prismic.predicates.at('document.type', 'blog_page'),
      ])
      const blogHome = blogHomeResponse.results.map(content => {
        return {
          id: String(content.uid),
          hero_title: RichText.asText(content.data.title),
          title: RichText.asText(content.data.subtitle),
          content: RichText.asHtml(content.data.texts)
        }
      })[0]

      const contents = {
        posts
      }

      return {
        blogHome,
        contents,
        pages,
        categories,
        tags,
        filteredCategory: '',
        filteredTag: '',
      }

    } catch (error: any) {
      throw new Error('Deu Merda')
    }
  }

  async fetchingByCategory(queryParams: Partial<IQueryParams>): Promise<ICMSData>{

    const prismic = getPrismicClient()

    const { category_filter, page = 1 } = queryParams
    // Fetch all categories
    const fetchCategories = await prismic.query([
      Prismic.predicates.at('document.type', 'category')
    ])
    //Fetching all Tags
    const tags = await prismic.getTags()

    const categories = fetchCategories.results.map(category => {
      return RichText.asText(category.data.category)
    })

    try {
      const category = await prismic.query([
        Prismic.predicates.at('document.type', 'category'),
        Prismic.predicates.fulltext('my.category.uid', String(category_filter))
      ])
      const filteredCategoryId = category.results.filter(category => category.uid === String(category_filter))[0].id
      const filteredCategory = category.results.filter(category => category.uid === String(category_filter))[0].uid

      const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post'),
        Prismic.predicates.at('my.post.related_category', filteredCategoryId )
      ],
        {
          orderings : '[document.last_publication_date desc]' ,
          pageSize : 2,
          page,
          fetchLinks : ['author.author', 'category.category']
        },
      )

      const pages = {
        currentPage: Number(response.page),
        totalPages: Number(response.total_pages)
      }

      const posts = response.results.map(post => {
        return {
          slug: post.uid,
          image: {
            url: post.data.image.url,
            alt: post.data.image.alt
          },
          categories: RichText.asText(post.data.related_category.data.category),
          tags: post.tags,
          author: RichText.asText(post.data.autohr.data.author),
          title: RichText.asText(post.data.title),
          snippet: post.data.content.find((content:any) => content.type === 'paragraph')?.text ?? '',
          updatedAt: new Date(String(post.last_publication_date)).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }),
        }
      } )
      const blogHomeResponse = await prismic.query([
        Prismic.predicates.at('document.type', 'blog_page'),
      ])
      const blogHome = blogHomeResponse.results.map(content => {
        return {
          id: String(content.uid),
          hero_title: RichText.asText(content.data.title),
          title: RichText.asText(content.data.subtitle),
          content: RichText.asHtml(content.data.texts)
        }
      })[0]

      const contents = {
        posts,
      }

      const data = new ICMSData({
        blogHome,
        contents,
        pages,
        tags,
        categories,
        filteredCategory,
        filteredTag: ''
      })

      return data
    } catch (error) {
      throw new Error('Deu Ruim')
    }
  }
  async fetchingByTag(queryParams: Partial<IQueryParams>): Promise<ICMSData> {

    const prismic = getPrismicClient()

    const { category_filter, tag_filter, page = 1 } = queryParams
    // Fetch all categories
    const fetchCategories = await prismic.query([
      Prismic.predicates.at('document.type', 'category')
    ])
    //Fetching all Tags
    const tags = await prismic.getTags()

    const categories = fetchCategories.results.map(category => {
      return RichText.asText(category.data.category)
    })

    try {
      const tag = await prismic.query([
        Prismic.predicates.at('document.type', 'category'),
        Prismic.predicates.fulltext('my.category.uid', String(tag_filter))
      ])

      const filteredTag = tags.filter(tag => tag === String(tag_filter))

      const response = await prismic.query([
        // Prismic.predicates.at('document.type', 'post'),
        // Prismic.predicates.at('my.post.tags', filteredTag )
        Prismic.Predicates.at("document.tags", filteredTag)
      ],
        {
          orderings : '[document.last_publication_date desc]' ,
          pageSize : 2,
          page,
          fetchLinks : ['author.author', 'category.category']
        },
      )

      const pages = {
        currentPage: Number(response.page),
        totalPages: Number(response.total_pages)
      }

      const posts = response.results.map(post => {
        return {
          slug: post.uid,
          image: {
            url: post.data.image.url,
            alt: post.data.image.alt
          },
          categories: RichText.asText(post.data.related_category.data.category),
          tags: post.tags,
          author: RichText.asText(post.data.autohr.data.author),
          title: RichText.asText(post.data.title),
          snippet: post.data.content.find((content:any) => content.type === 'paragraph')?.text ?? '',
          updatedAt: new Date(String(post.last_publication_date)).toLocaleDateString('pt-BR',{
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          }),
        }
      } )
      const blogHomeResponse = await prismic.query([
        Prismic.predicates.at('document.type', 'blog_page'),
      ])
      const blogHome = blogHomeResponse.results.map(content => {
        return {
          id: String(content.uid),
          hero_title: RichText.asText(content.data.title),
          title: RichText.asText(content.data.subtitle),
          content: RichText.asHtml(content.data.texts)
        }
      })[0]

      const contents = {
        posts,
      }

      const data = new ICMSData({
        blogHome,
        contents,
        pages,
        tags,
        categories,
        filteredCategory: '',
        filteredTag: tag_filter
      })

      return data
    } catch (error) {
      throw new Error('Deu Ruim')
    }
  }
}
