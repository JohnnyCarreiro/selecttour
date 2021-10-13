import { RequestVisit } from "../entities/Contact"
import { IMailProvider } from "../providers/IMailProvider"
import { IRequestVisitDTO } from "./IRequestVisitDTO"

export class CreateRequestUseCase {
    constructor(
        private mailProvider: IMailProvider
    ){}

    async execute(data:IRequestVisitDTO):Promise<RequestVisit>{
      const newContact = new RequestVisit(data)
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
              subject:`Select Tour - ${data.name}`,
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
              subject:`Contato do Site - ${data.name}`,
              body:`Nome: ${data.name}, Sobrenome: ${data.surname}, telefone: ${data.phone}, Email:${data.email},
              Observações: ${data.observations}`
          })
          return (newContact)
        } catch (error) {
            throw new Error('Unexpected error whiling Send new contact email')
        }
    }
}
