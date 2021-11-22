import { IContentProps } from "@/pages/blog"
import { api } from "@/utils/api"
import { useQuery } from "react-query"

export async function getBlogHomeContent(): Promise<IContentProps["blogHome"]>{

  const { data } = await api.get(`fetchingdata`)
  return data.blogHome
}

export function useBlogHomeContent( STALE_TIME?: number){

  return useQuery(["home_blog"], async () => {
    return await getBlogHomeContent()
  }, {
    staleTime: STALE_TIME ? STALE_TIME : 10000,
  })
}
