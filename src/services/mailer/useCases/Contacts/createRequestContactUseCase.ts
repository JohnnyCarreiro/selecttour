import { Contact } from "../../entities/Contact"
import { IMailProvider } from "../../providers/IMailProvider"
import { IRequestContactDTO } from "./IRequestContactDTO"

export class CreateContactUseCase {
    constructor(
        private mailProvider: IMailProvider
    ){}

    async execute(data:IRequestContactDTO):Promise<Contact>{
      const newContact = new Contact(data)
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
              subject:`Select Tour - ${data.subject}`,
              body:`Recebemos sua Mensagem: <br/> ${data.message}`,
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
              subject:`Contato do Site - ${data.subject}`,
              body:`
                Nome: ${data.name}, <br/>
                telefone: ${data.phone}, <br/>
                Email:${data.email}, <br/>
                Observações: ${data.message}
              `
          })
          return (newContact)
        } catch (error) {
            throw new Error('Unexpected error whiling Send new contact email')
        }
    }
}
