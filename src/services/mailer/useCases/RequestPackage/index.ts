import { DomainMailProvider } from '../../providers/domainMailProvider'
import { CreateRequestPackageController } from './CreateRequestPackageController'
import { CreateRequestPackageUseCase } from './CreateRequestPackageUseCase'

const mailtrapMailProvider = new DomainMailProvider()

const createRequestPackageUseCase = new CreateRequestPackageUseCase(
    mailtrapMailProvider
)

const createRequestPackageController = new CreateRequestPackageController(createRequestPackageUseCase)

export { createRequestPackageUseCase, createRequestPackageController}
