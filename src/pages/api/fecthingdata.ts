import { cmsRequestController } from "@/services/cms/useCases/posts"
import { NextApiRequest, NextApiResponse } from "next"

export default async (request:NextApiRequest, response:NextApiResponse) => {
  const { body } = request
  try {
    switch(body) {
      case !body.category_filter && !body.tags_filter:
        const cmsData = await cmsRequestController.handle(request,response)
        response.status(200).send(cmsData)
        break
    }
  } catch (error) {
    response.status(500).send(error)
  }
}
