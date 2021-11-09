import { PrismicProvider } from "../../providers/PrismicProvider"
import { CMSRequestCategoriesController } from "./CMSRequestCategoriesController"
import { CMSRequestCategoriesUseCase } from "./CMSRequestCategoriesUseCase"

const cmsProvider = new PrismicProvider()

const cmsRequestCategoriesuseCase = new CMSRequestCategoriesUseCase(
  cmsProvider
)

const cmsRequestCategoriesController = new CMSRequestCategoriesController(cmsRequestCategoriesuseCase)

export { cmsRequestCategoriesuseCase, cmsRequestCategoriesController}
