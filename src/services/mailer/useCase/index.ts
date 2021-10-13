import { DomainMailProvider } from '../providers/domainMailProvider'
import { CreateRequestController } from './createRequestController'
import { CreateRequestUseCase } from './createRequestUseCase'

const mailtrapMailProvider = new DomainMailProvider()

const createRequestUseCase = new CreateRequestUseCase(
    mailtrapMailProvider
)

const createRequestController = new CreateRequestController(createRequestUseCase)

export { createRequestUseCase, createRequestController}
