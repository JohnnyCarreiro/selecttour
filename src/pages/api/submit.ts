import { NextApiRequest, NextApiResponse } from 'next'
import { createRequestContactController } from '../../services/mailer/useCases/Contacts'
import { createRequestPackageController } from '../../services/mailer/useCases/RequestPackage'
import { createRequestTopDestinationController } from '../../services/mailer/useCases/TopDestinations'
import { createRequestTopPackageController } from '../../services/mailer/useCases/TopPackages'

export default async (request:NextApiRequest, response:NextApiResponse) => {

  console.log(request.body)
  const { requestSource } = request.body
  try {
    switch(requestSource){
      case 'Solicite um Pacote':
        console.log(requestSource)
        await createRequestPackageController.handle(request,response)
        response.status(200).send({ok: true})
        return
        break;


      case 'Pacotes Especiais':
        console.log(requestSource)
        await createRequestTopPackageController.handle(request,response)
        response.status(200).send({ok: true})
        break;

      case 'Destinos Tops':
        console.log(requestSource)
        await createRequestTopDestinationController.handle(request,response)
        response.status(200).send({ok: true})
        return
        break;

      case 'Contato':
        console.log(requestSource)
        await createRequestContactController.handle(request,response)
        response.status(200).send({ok: true})
        return
        break;

      default:
        throw new Error('Unhandled event!')
      }
    } catch (error) {
       response.status(500).json({error})
  }

  // try {
  //    await createRequestController.handle(request,response)
  //    response.json({ok: 'mensagem enviada'})
  // } catch (error) {
  //   response.status(500).json({error})
  //   console.log(error)
  // }
}
