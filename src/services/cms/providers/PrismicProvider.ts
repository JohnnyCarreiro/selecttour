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
      // Fetch all categories
      const fetchCategories = await prismic.query([
        Prismic.predicates.at('document.type', 'category')
      ])
      //Fetching all Tags
      const tags = await prismic.getTags()

      const categories = fetchCategories.results.map(category => {
        return RichText.asText(category.data.category)
      })
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
      // const post = response.results.map(post => {
      //   return {
      //     slug: post.uid,
      //     image: {
      //       url: post.data.image.url,
      //       alt: post.data.image.alt
      //     },
      //     categories: post.data.related_category.data.category,
      //     tags: post.tags,
      //     author: post.data.autohr.data.author,
      //     title: post.data.title,
      //     snippet: post.data.content.find((content:any) => content.type === 'paragraph')?.text ?? '',
      //     updatedAt: new Date(String(post.last_publication_date)).toLocaleDateString('pt-BR',{
      //       day: '2-digit',
      //       month: 'long',
      //       year: 'numeric'
      //     }),
      //   }
      // } )

      const contents = {
        posts
      }

      return {
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

      const contents = {
        posts,
      }

      const data = new ICMSData({
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

      const contents = {
        posts,
      }

      const data = new ICMSData({
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
