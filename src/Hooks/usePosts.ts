import { IContentProps } from "@/pages/blog"
import { api } from "@/utils/api"
import { NextPage } from "next"
import { ParsedUrlQuery } from "querystring"
import { useQuery } from "react-query"

export async function getPosts( page?: number, tag_filter?: string, category_filter?: string): Promise<IContentProps>{

  const { data } = await api.post(`fetchingdata`,{
    category_filter,
    tag_filter,
    page
  })
  return data
}

export function usePosts( STALE_TIME?: number, page?: number, tag_filter?: string, category_filter?: string ){
  const tag = tag_filter ? tag_filter : ''
  const category = category_filter ? category_filter : ''
  return useQuery(["posts",tag, category, page ? page : 1], async () => {
    return await getPosts(page ? page : 1, tag, category)
  }, {
    staleTime: STALE_TIME ? STALE_TIME : 10000,
  })
}
