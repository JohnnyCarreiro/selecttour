import { RequestPackage } from "../../entities/RequestPackage"
import { IMailProvider } from "../../providers/IMailProvider"
import { IRequestTopPackageDTO } from "./IRequestTopPackageDTO"

export class CreateRequestTopPackageUseCase {
    constructor(
        private mailProvider: IMailProvider
    ){}

    async execute(data:IRequestTopPackageDTO):Promise<RequestPackage>{
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
              body:`Recebemos sua Mensagem: <br/>
                Destino: ${data.destination}, <br/>
                Observações: ${data.observations}
              `
          })
          //Email to system
          await this.mailProvider.sendMail({
              to:{
                name:'Select Tour',
                address:'contato@selecttourviagens.com.br'
              },
              // from:{
              //   name: data.name ,
              //   address: data.email
              // },
              from:{
                name:'Select Tour',
                address:'contato@selecttourviagens.com.br'
              },
              subject:`Contato do Site - ${data.requestSource}`,
              //Complete with requestPackage fields
              body:`
                Nome: ${data.name}, <br/>
                Sobrenome: ${data.surname}, <br/>
                telefone: ${data.phone}, <br/>
                Email:${data.email}, <br/>
                Destino: ${data.destination}, <br/>
                Observações: ${data.observations}
              `
          })
          return (newContact)
        } catch (error) {
          console.log(error)
            throw new Error('Unexpected error whiling Send new contact email')
        }
    }
}
