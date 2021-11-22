import { cmsRequestHomeuseCase } from "."
import { CMSHomeData, IHomeData } from "../../entities/CMSHomeData"
import { ICMSProvider } from "../../providers/ICMSProvider"

export class CMSRequestHomeUseCase {

  constructor(
    private cmsProvider: ICMSProvider<IHomeData>,
  ){}//Create a CMS provider to handle with the request

  async execute(): Promise<CMSHomeData>{
    //Receive query params to handle with the request
    //connect to CMS provider and passing paramenters to paginate and filter
    try {
      const page = '1'
      const cmsData = await this.cmsProvider.fetchingHomeContent()
      const cmsPost = await this.cmsProvider.fetchingAll({page})

      console.log('CmsData: ', !!cmsData)

      return {
        content: cmsData,
        hasBlogposts: !!cmsPost.contents.posts,
        hasMoreThanthreePosts: cmsPost.contents.posts && cmsPost.contents.posts.length >= 3
      }
    } catch (error: any) {
      console.log(error)
      throw new Error('Deu ruim no prismic')
    }
  }
}
