import { NextApiRequest, NextApiResponse } from "next";
import { CreateRequestPackageUseCase } from "./CreateRequestPackageUseCase";

export class CreateRequestPackageController{
    constructor(
        private createRequestUseCase: CreateRequestPackageUseCase
    ){}
    async handle(request:NextApiRequest, _:NextApiResponse):Promise<void>{
        const requestPakcageData = request.body

        try{
            await this.createRequestUseCase.execute(requestPakcageData)
        }catch(err: any){
             throw new Error(err)
        }
    }
}
