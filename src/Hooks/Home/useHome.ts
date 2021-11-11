import { IContent } from "@/interfaces/IHome"
import { api } from "@/utils/api"
import { useQuery } from "react-query"

export async function getHomeContent(): Promise<IContent>{

  const { data } = await api.post(`fetchingdata`,{
    home: true
  })
  return data
}

export function useHomeContent( STALE_TIME?: number){

  return useQuery(["main_home"], async () => {
    return await getHomeContent()
  }, {
    staleTime: STALE_TIME ? STALE_TIME : 10000,
  })
}
