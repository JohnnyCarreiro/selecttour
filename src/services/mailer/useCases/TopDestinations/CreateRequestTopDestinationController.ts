import { NextApiRequest, NextApiResponse } from "next";
import { CreateRequestTopDestinationUseCase } from "./CreateRequestTopDestinationUseCase";

export class CreateRequestTopDestinationController{
    constructor(
        private createRequestTopDestinationUseCase: CreateRequestTopDestinationUseCase
    ){}
    async handle(request:NextApiRequest, _:NextApiResponse):Promise<void>{
        const { name, surname, email, phone, observations, requestSource, destination } = request.body

        try{
            await this.createRequestTopDestinationUseCase.execute({name, surname, email, phone, observations, requestSource, destination})
        }catch(err: any){
             throw new Error(err)
        }
    }
}
