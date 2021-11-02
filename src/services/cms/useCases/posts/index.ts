import { PrismicProvider } from "../../providers/PrismicProvider"
import { CMSRequestController } from "./CMSRequestController"
import { CMSRequestUseCase } from "./CMSRequestUseCase"

const cmsProvider = new PrismicProvider()

const cmsRequestuseCase = new CMSRequestUseCase(
  cmsProvider
)

const cmsRequestController = new CMSRequestController(cmsRequestuseCase)

export { cmsRequestuseCase, cmsRequestController}
