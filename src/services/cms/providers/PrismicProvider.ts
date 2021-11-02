import { getPrismicClient } from "@/services/prismic"
import { ICMSData } from "../entities/CMSData"
import { ICMSProvider, IQueryParams } from "./ICMSProvider"

import Prismic from '@prismicio/client'
import { RichText } from 'prismic-dom'

export class PrismicProvider implements ICMSProvider {
  constructor(){}

  async fetchingAll(queryParams: Partial<IQueryParams>): Promise<ICMSData> {
    const prismic = getPrismicClient()

    const { page = 1 } = queryParams

    try {
      const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post'),
      ],
        {
          orderings : '[document.last_publication_date desc]' ,
          pageSize : 2,
          page,
          fetchLinks : ['author.author', 'category.category']
        },
      )
      console.log(JSON.stringify(response, null, 1))

      const pages = {
        currentPage: Number(response.page),
        totalPages: Number(response.total_pages)
      }

      const posts = response.results.map(post => {
        return {
          slug: RichText.asText(post.uid),
          image: {
            url: RichText.asText(post.data.image.url),
            alt: RichText.asText(post.data.image.alt)
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

      const contents = {
        posts,
      }
      const data = new ICMSData({contents, pages, filteredCategory: undefined, filteredTags: undefined})

      return data

    } catch (error) {
      throw new Error('Deu Merda')
    }
  }

  async fetchingByCategory(queryParams: Partial<IQueryParams>): Promise<ICMSData>{

    const prismic = getPrismicClient()

    const { category_filter, page = 1 } = queryParams

    try {
      const category = await prismic.query([
        Prismic.predicates.at('document.type', 'category'),
        Prismic.predicates.fulltext('my.category.uid', String(category_filter))// .toLowerCase().replace(' ', '-')Do this on the function wich will call this method
      ])
      console.log(category.results.filter(category => category.uid === String(category_filter))[0].id)
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
          slug: RichText.asText(post.uid),
          image: {
            url: RichText.asText(post.data.image.url),
            alt: RichText.asText(post.data.image.alt)
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

      const contents = {
        posts,
      }

      const data = new ICMSData({contents, pages, filteredCategory, filteredTags: undefined})

      return data
    } catch (error) {
      throw new Error('Deu Ruim')
    }
  }
  async fetchingByTag(): Promise<ICMSData> {

    return {}
  }
}
