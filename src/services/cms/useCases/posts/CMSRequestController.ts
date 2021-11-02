import { NextApiRequest, NextApiResponse } from "next"
import { ICMSData } from "../../entities/CMSData"
import { CMSRequestUseCase } from "./CMSRequestUseCase"

export class CMSRequestController {
  constructor (
    private cmsRequestUseCase: CMSRequestUseCase
  ){}

  async handle(request: NextApiRequest, response: NextApiResponse): Promise<ICMSData>{
    const {
      category_filter,
      tag_filter,
      page
    } = request.body

        try{
          const cmsData =  await this.cmsRequestUseCase.execute({
            category_filter,
            tag_filter,
            page
          })
          return cmsData
        }catch(err: any){
             throw new Error(err)
        }
  }
}
