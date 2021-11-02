import { ICMSData } from "../entities/CMSData";

export type IQueryParams = {
  category_filter?: string
  tag_filter?: string
  page?: string
}

export interface ICMSProvider{
  fetchingAll: (queryParams: Partial<IQueryParams>) => Promise<ICMSData>
  fetchingByTag: (queryParams: Partial<IQueryParams>) => Promise<ICMSData>
  fetchingByCategory: (queryParams: Partial<IQueryParams>) => Promise<ICMSData>
}
