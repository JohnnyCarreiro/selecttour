import { IContentProps } from "@/pages/blog"
import { api } from "@/utils/api"
import { NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { useQuery } from "react-query"

export async function getPosts(query?: ParsedUrlQuery): Promise<IContentProps>{
  const category_filter = query?.filter
  const tag_filter = query?.tag
  const page = query?.page

  const { data } = await api.post(`fetchingdata`,{
    category_filter,
    tag_filter,
    page
  })
  // console.log('Data: ', data, "\n", 'Query: ', query)
  return data
}

export function usePosts(query?:ParsedUrlQuery, STALE_TIME?: number){
  return useQuery(["posts", query?.page ? query.page : 1], async () => {
    return await getPosts(query)
  }, {
    staleTime: STALE_TIME ? STALE_TIME : 10000,
  })
}
