import { NextApiRequest, NextApiResponse } from "next"
import { ICMSData } from "../../entities/CMSData"
import { CMSRequestCategoriesUseCase } from "./CMSRequestCategoriesUseCase"

export class CMSRequestCategoriesController {
  constructor (
    private cmsRequestCategoriesUseCase: CMSRequestCategoriesUseCase
  ){}

  async handle(request: NextApiRequest, response: NextApiResponse): Promise<ICMSData>{
    const {
      category_filter,
      tag_filter,
      page
    } = request.body

    try{
      const cmsData =  await this.cmsRequestCategoriesUseCase.execute({
        category_filter,
        tag_filter,
        page
      })
      return cmsData
    }catch(err: any){
      throw new Error('Deu ruim no prismic')
    }
  }
}
