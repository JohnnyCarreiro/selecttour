import { ICMSData } from "../../entities/CMSData"
import { IHomeData } from "../../entities/CMSHomeData"
import { ICMSProvider, IQueryParams } from "../../providers/ICMSProvider"

export class CMSRequestCategoriesUseCase {

  constructor(
    private cmsProvider: ICMSProvider<IHomeData>
  ){}//Create a CMS provider to handle with the request

  async execute(queryParams: IQueryParams): Promise<ICMSData>{
    //Receive query params to handle with the request
    //connect to CMS provider and passing paramenters to paginate and filter
    try {
      const cmsData = await this.cmsProvider.fetchingByCategory(queryParams)
      return cmsData
    } catch (error: any) {
      throw new Error('Deu ruim no prismic')
    }
  }
}
