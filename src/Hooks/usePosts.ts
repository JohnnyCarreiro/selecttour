import { IContentProps } from "@/pages/blog"
import { api } from "@/utils/api"
import { NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { useQuery } from "react-query"

export async function getPosts(query?: ParsedUrlQuery, page?: number): Promise<IContentProps>{
  const category_filter = query?.filter
  const tag_filter = 'França'
  // const page = query?.page

  const { data } = await api.post(`fetchingdata`,{
    category_filter,
    tag_filter,
    page
  })
  // console.log('Data: ', data, "\n", 'Query: ', query)
  return data
}

export function usePosts(query?:ParsedUrlQuery, STALE_TIME?: number, page?: number){
  const tag = ''
  const category = ''
  return useQuery(["posts",tag, category, page ? page : 1], async () => {
    return await getPosts(query, page ? page : 1)
  }, {
    staleTime: STALE_TIME ? STALE_TIME : 10000,
  })
}
