import { ICMSData } from "../../entities/CMSData"
import { ICMSProvider, IQueryParams } from "../../providers/ICMSProvider"

export class CMSRequestTagsUseCase {

  constructor(
    private cmsProvider: ICMSProvider
  ){}//Create a CMS provider to handle with the request

  async execute(queryParams: IQueryParams): Promise<ICMSData>{
    //Receive query params to handle with the request
    //connect to CMS provider and passing paramenters to paginate and filter
    try {
      const cmsData = await this.cmsProvider.fetchingByTag(queryParams)
      return cmsData
    } catch (error: any) {
      throw new Error('Deu ruim no prismic')
    }
  }
}
