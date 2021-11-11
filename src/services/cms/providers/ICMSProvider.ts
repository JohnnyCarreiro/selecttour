import { ICMSData } from "../entities/CMSData";
import { CMSHomeData, IHomeData } from "../entities/CMSHomeData";

export type IQueryParams = {
  category_filter?: string
  tag_filter?: string
  page?: string
}

export interface ICMSProvider<T>{
  fetchingHomeContent: () => Promise<T>
  fetchingAll: (queryParams: Partial<IQueryParams>) => Promise<ICMSData>
  fetchingByTag: (queryParams: Partial<IQueryParams>) => Promise<ICMSData>
  fetchingByCategory: (queryParams: Partial<IQueryParams>) => Promise<ICMSData>
}
