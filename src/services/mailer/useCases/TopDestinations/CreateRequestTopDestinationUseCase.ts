import { RequestPackage } from "../../entities/RequestPackage"
import { IMailProvider } from "../../providers/IMailProvider"
import { IRequestTopDestinationDTO } from "./IRequestTopDestinationDTO"

export class CreateRequestTopDestinationUseCase {
    constructor(
        private mailProvider: IMailProvider
    ){}

    async execute(data:IRequestTopDestinationDTO):Promise<RequestPackage>{
      const newContact = new RequestPackage(data)
        try {
          //Email to client
          await this.mailProvider.sendMail({
              to:{
                name:data.name,
                address: data.email
              },
              from:{
                name:'Select Tour',
                address:'contato@selecttourviagens.com.br'
              },
              subject:`Select Tour - ${data.requestSource}`,
              body:`Recebemos sua Mensagem: ${data.observations}`
          })
          //Email to system
          await this.mailProvider.sendMail({
              to:{
                name:'Select Tour',
                address:'contato@selecttourviagens.com.br'
              },
              from:{
                name:'Johnny Carreiro',
                address:'contact@johnnycarreiro.com'
              },
              subject:`Contato do Site - ${data.requestSource}`,
              //Complete with requestPackage fields
              body:`Nome: ${data.name}, Sobrenome: ${data.surname}, telefone: ${data.phone}, Email:${data.email},
              Destino: ${data.destination}
              Observações: ${data.observations}`
          })
          return (newContact)
        } catch (error) {
            throw new Error('Unexpected error whiling Send new contact email')
        }
    }
}
