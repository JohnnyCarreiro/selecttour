import { NextApiRequest, NextApiResponse } from "next"
import { ICMSData } from "../../entities/CMSData"
import { CMSRequestPostsUseCase } from "./CMSRequestPostsUseCase"

export class CMSRequestPostsController {
  constructor (
    private cmsRequestPostsUseCase: CMSRequestPostsUseCase
  ){}

  async handle(request: NextApiRequest, response: NextApiResponse): Promise<ICMSData>{
    const {
      category_filter,
      tag_filter,
      page
    } = request.body

    try{
      const cmsData =  await this.cmsRequestPostsUseCase.execute({
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
