import { NextApiRequest, NextApiResponse } from "next"
import { CMSHomeData } from "../../entities/CMSHomeData"
import { CMSRequestHomeUseCase } from "./CMSRequestHomeUseCase"

export class CMSRequestHomeController {
  constructor (
    private cmsRequestHomeUseCase: CMSRequestHomeUseCase
  ){}

  async handle(request: NextApiRequest, response: NextApiResponse): Promise<CMSHomeData>{
    try{
      const cmsData =  await this.cmsRequestHomeUseCase.execute()
      return cmsData
    }catch(err: any){
      throw new Error('Deu ruim no prismic')
    }
  }
}
