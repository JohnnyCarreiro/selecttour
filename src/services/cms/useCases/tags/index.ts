import { PrismicProvider } from "../../providers/PrismicProvider"
import { CMSRequestTagsController } from "./CMSRequestTagsController"
import { CMSRequestTagsUseCase } from "./CMSRequestTagsUseCase"

const cmsProvider = new PrismicProvider()

const cmsRequestTagsuseCase = new CMSRequestTagsUseCase(
  cmsProvider
)

const cmsRequestTagsController = new CMSRequestTagsController(cmsRequestTagsuseCase)

export { cmsRequestTagsuseCase, cmsRequestTagsController}
