import { NextApiRequest, NextApiResponse } from 'next'
import { createRequestController } from '../../services/mailer/useCase'

export default async (request:NextApiRequest, response:NextApiResponse) => {

  console.log(request.body)
  const { requestSource } = request.body
  try {
    switch(requestSource){
      case 'Solicite um Pacote':
        console.log(requestSource)
        response.status(200).send({ok: true})
        break

      case 'Pacotes Especiais':
        console.log(requestSource)
        response.status(200).send({ok: true})
        break

      case 'Destinos Tops':
        console.log(requestSource)
        response.status(200).send({ok: true})
        break

      case 'Contato':
        console.log(requestSource)
        response.status(200).send({ok: true})
        break

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
