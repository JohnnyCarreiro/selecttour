import { DomainMailProvider } from '../../providers/domainMailProvider'
import { CreateRequestTopPackageController } from './CreateRequestTopPackageController'
import { CreateRequestTopPackageUseCase } from './CreateRequestTopPackageUseCase'

const mailtrapMailProvider = new DomainMailProvider()

const createRequestTopPackageUseCase = new CreateRequestTopPackageUseCase(
    mailtrapMailProvider
)

const createRequestTopPackageController = new CreateRequestTopPackageController(createRequestTopPackageUseCase)

export { createRequestTopPackageUseCase, createRequestTopPackageController}
