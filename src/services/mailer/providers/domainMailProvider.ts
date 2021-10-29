import Mail from "nodemailer/lib/mailer"
import nodemailer from "nodemailer"
import { IMailProvider, IMessage } from "./IMailProvider"

export class DomainMailProvider implements IMailProvider{
    private transporter!: Mail
    private host: string | undefined
    private port: number | undefined
    private user: string | undefined
    private pass: string | undefined

    constructor() {
        this.host = String(process.env.EMAIL_HOST)
        this.port = Number(process.env.EMAIL_PORT)
        this.user = String(process.env.EMAIL_USER)
        this.pass = String(process.env.EMAIL_PASS)

        this.transporter = nodemailer.createTransport({
          name:'selecttourviagens.com.br',
          host:this.host,
          port:this.port,
          secure: true,
          auth:{
              user:this.user,
              pass:this.pass,
          },
          tls: {rejectUnauthorized: false},
          // sendmail: true,
          // newline: 'unix',
        })
    }
    async sendMail(message:IMessage):Promise<void>{
      const { to, from, subject, body } = message

        await this.transporter.sendMail({
            to:{
                name: to.name,
                address:to.address
            },
            from:{
                name:from.name,
                address: from.address
            },
            subject ,
            html: body
        })
    }
}
