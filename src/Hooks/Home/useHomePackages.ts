import { IContent, IHome } from "@/interfaces/IHome"
import { api } from "@/utils/api"
import { useQuery } from "react-query"

export async function getHomePackages(): Promise<Partial<IHome>>{

  const { data } = await api.post<IContent>(`fetchingdata`,{
    home: true
  })
  const { top_packages_section, top_destinations_section } = data.content
  return {
    top_packages_section,
    top_destinations_section
  }
}

export function useHomePackages( STALE_TIME?: number){

  return useQuery(["main_home_packages"], async () => {
    return await getHomePackages()
  }, {
    staleTime: STALE_TIME ? STALE_TIME : 10000,
  })
}
