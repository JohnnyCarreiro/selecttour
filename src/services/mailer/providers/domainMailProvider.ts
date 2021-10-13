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
        this.host = process.env.MT_HOST
        this.port = Number(process.env.MT_PORT)
        this.user = process.env.MT_USER
        this.pass = process.env.MT_PASS

        this.transporter = nodemailer.createTransport({
            name:'johnnycarreiro.com',
            host:this.host,
            port:this.port,
            auth:{
                user:this.user,
                pass:this.pass,
            }
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
