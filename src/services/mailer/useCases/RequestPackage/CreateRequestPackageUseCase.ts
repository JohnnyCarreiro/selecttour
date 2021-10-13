import { RequestPackage } from "../../entities/RequestPackage"
import { IMailProvider } from "../../providers/IMailProvider"
import { IRequestPackageDTO } from "./IRequestPackageDTO"

export class CreateRequestPackageUseCase {
    constructor(
        private mailProvider: IMailProvider
    ){}

    async execute(data:IRequestPackageDTO):Promise<RequestPackage>{
      const newContact = new RequestPackage(data)

      const {
        name,
        surname,
        email,
        phone,
        observations,
        from,
        to,
        departure,
        returns,
        adults,
        childs,
        childrenAge,
        flightClass,
        accomodation,
       } = data
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
                Nome: ${name}, \n <br/>
                Sobrenome: ${surname}, \n <br/>
                telefone: ${phone},
                Email:${email},
                Origem: ${from}, \n <br/>
                Destino: ${to}, \n <br/>
                Partida: ${departure}, \n <br/>
                Retorno: ${returns}, \n <br/>
                Adultos: ${adults}, \n <br/>
                Crianças: ${childs}, \n <br/>
                Idade das crianças: ${childrenAge}, \n <br/>
                Classe: ${flightClass}, \n <br/>
                Acomodações: ${accomodation}, \n <br/>

                Observações: ${observations}
              `
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
              subject:`Contato do Site - ${name}`,
              //Complete with requestPackage fields
              body:`Nome: ${name}, \n <br/>
                Sobrenome: ${surname}, \n <br/>
                telefone: ${phone},
                Email:${email},
                Origem: ${from}, \n <br/>
                Destino: ${to}, \n <br/>
                Partida: ${departure}, \n <br/>
                Retorno: ${returns}, \n <br/>
                Adultos: ${adults}, \n <br/>
                Crianças: ${childs}, \n <br/>
                Idade das crianças: ${childrenAge}, \n <br/>
                Classe: ${flightClass}, \n <br/>
                Acomodações: ${accomodation}, \n <br/>

                Observações: ${observations}`
          })
          return (newContact)
        } catch (error) {
            throw new Error('Unexpected error whiling Send new contact email')
        }
    }
}
