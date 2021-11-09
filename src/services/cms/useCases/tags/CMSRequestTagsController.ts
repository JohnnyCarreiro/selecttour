import { NextApiRequest, NextApiResponse } from "next"
import { ICMSData } from "../../entities/CMSData"
import { CMSRequestTagsUseCase } from "./CMSRequestTagsUseCase"

export class CMSRequestTagsController {
  constructor (
    private cmsRequestTagsUseCase: CMSRequestTagsUseCase
  ){}

  async handle(request: NextApiRequest, response: NextApiResponse): Promise<ICMSData>{
    const {
      category_filter,
      tag_filter,
      page
    } = request.body

    try{
      const cmsData =  await this.cmsRequestTagsUseCase.execute({
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
