import { DomainMailProvider } from '../../providers/domainMailProvider'
import { CreateRequestContactController } from './createRequestContactController'
import { CreateContactUseCase } from './createRequestContactUseCase'

const mailtrapMailProvider = new DomainMailProvider()

const createRequestUseCase = new CreateContactUseCase(
    mailtrapMailProvider
)

const createRequestContactController = new CreateRequestContactController(createRequestUseCase)

export { createRequestUseCase, createRequestContactController}
