import { PrismicProvider } from "../../providers/PrismicProvider"
import { CMSRequestPostsController } from "./CMSRequestPostsController"
import { CMSRequestPostsUseCase } from "./CMSRequestPostsUseCase"

const cmsProvider = new PrismicProvider()

const cmsRequestuseCase = new CMSRequestPostsUseCase(
  cmsProvider
)

const cmsRequestPostsController = new CMSRequestPostsController(cmsRequestuseCase)

export { cmsRequestuseCase, cmsRequestPostsController}
