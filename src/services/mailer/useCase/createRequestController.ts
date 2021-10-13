import { NextApiRequest, NextApiResponse } from "next";
import { CreateRequestUseCase } from "./createRequestUseCase";

export class CreateRequestController{
    constructor(
        private createRequestUseCase: CreateRequestUseCase
    ){}
    async handle(request:NextApiRequest, _:NextApiResponse):Promise<void>{
        const { name, surname, email, phone, observations, requestSource } = request.body

        try{
            await this.createRequestUseCase.execute({name, surname, email, phone, observations, requestSource})
        }catch(err: any){
             throw new Error(err)
        }
    }
}
