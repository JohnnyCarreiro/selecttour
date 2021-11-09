import { cmsRequestTagsController } from "@/services/cms/useCases/tags"
import { cmsRequestCategoriesController } from "@/services/cms/useCases/categories"
import { cmsRequestPostsController } from "@/services/cms/useCases/posts"
import { NextApiRequest, NextApiResponse } from "next"

export default async (request:NextApiRequest, response:NextApiResponse) => {
  const { body } = request
  console.log("Body: ", body)
  try {
    switch(true) {
      case !!body.tag_filter :
        console.log('Caiu no tag')
        const cmsDataTags = await cmsRequestTagsController.handle(request,response)
        response.status(200).send(cmsDataTags)
        break
      case !!body.category_filter :
        const cmsDataFilter = await cmsRequestCategoriesController.handle(request,response)
        response.status(200).send(cmsDataFilter)
        break
      default :
        const cmsData = await cmsRequestPostsController.handle(request,response)
        response.status(200).send(cmsData)
        break
    }
  } catch (error) {
    console.log(error)
    response.status(500).send(error)
  }
}
