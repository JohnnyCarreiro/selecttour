import { NextApiRequest, NextApiResponse } from 'next'
import { createRequestContactController } from '../../services/mailer/useCases/Contacts'
import { createRequestPackageController } from '../../services/mailer/useCases/RequestPackage'
import { createRequestTopDestinationController } from '../../services/mailer/useCases/TopDestinations'
import { createRequestTopPackageController } from '../../services/mailer/useCases/TopPackages'

export default async (request:NextApiRequest, response:NextApiResponse) => {

  const { requestSource } = request.body
  try {
    switch(requestSource){
      case 'Solicite um Pacote':
        await createRequestPackageController.handle(request,response)
        response.status(200).send({ok: true})
        break;


      case 'Pacotes Especiais':
        await createRequestTopPackageController.handle(request,response)
        response.status(200).send({ok: true})
        break;

      case 'Destinos Tops':
        await createRequestTopDestinationController.handle(request,response)
        response.status(200).send({ok: true})
        break;

      case 'Contato':
        await createRequestContactController.handle(request,response)
        response.status(200).send({ok: true})
        break;

      default:
        throw new Error('Unhandled event!')
      }
    } catch (error) {
      response.status(500).send(error)
  }

}
