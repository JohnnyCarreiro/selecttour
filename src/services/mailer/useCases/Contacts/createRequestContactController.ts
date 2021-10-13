import { NextApiRequest, NextApiResponse } from "next";
import { CreateContactUseCase } from "./createRequestContactUseCase";

export class CreateRequestContactController{
    constructor(
        private createContactUseCase: CreateContactUseCase
    ){}
    async handle(request:NextApiRequest, _:NextApiResponse):Promise<void>{
        const { requestSource, name, email, phone, subject, message } = await request.body

        try{
            await this.createContactUseCase.execute({requestSource, name, email, phone, subject, message})
        }catch(err: any){
             throw new Error(err)
        }
    }
}
