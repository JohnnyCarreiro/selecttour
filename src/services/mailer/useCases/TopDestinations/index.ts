import { DomainMailProvider } from '../../providers/domainMailProvider'
import { CreateRequestTopDestinationController } from './CreateRequestTopDestinationController'
import { CreateRequestTopDestinationUseCase } from './CreateRequestTopDestinationUseCase'

const mailtrapMailProvider = new DomainMailProvider()

const createRequestTopDestinationUseCase = new CreateRequestTopDestinationUseCase(
    mailtrapMailProvider
)

const createRequestTopDestinationController = new CreateRequestTopDestinationController(createRequestTopDestinationUseCase)

export { createRequestTopDestinationUseCase, createRequestTopDestinationController}
