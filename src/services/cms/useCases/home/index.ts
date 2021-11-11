import { PrismicProvider } from "../../providers/PrismicProvider"
import { CMSRequestHomeController } from "./CMSRequestHomeController"
import { CMSRequestHomeUseCase } from "./CMSRequestHomeUseCase"

const cmsProvider = new PrismicProvider()

const cmsRequestHomeuseCase = new CMSRequestHomeUseCase(
  cmsProvider
)

const cmsRequestHomeController = new CMSRequestHomeController(cmsRequestHomeuseCase)

export { cmsRequestHomeuseCase, cmsRequestHomeController}
