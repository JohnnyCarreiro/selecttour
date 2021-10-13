import { NextApiRequest, NextApiResponse } from "next";
import { CreateRequestTopPackageUseCase } from "./CreateRequestTopPackageUseCase";

export class CreateRequestTopPackageController{
    constructor(
        private createRequestTopPackageUseCase: CreateRequestTopPackageUseCase
    ){}
    async handle(request:NextApiRequest, _:NextApiResponse):Promise<void>{
        const { name, surname, email, phone, observations, requestSource, destination } = request.body

        try{
            await this.createRequestTopPackageUseCase.execute({name, surname, email, phone, observations, requestSource, destination})
        }catch(err: any){
             throw new Error(err)
        }
    }
}
