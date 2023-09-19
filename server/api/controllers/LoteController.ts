import { Request, Response } from "express"
import * as loteService from "../services/LoteService"
import LoteLin from "../models/LoteLinModel"

function invalidRequest(res:Response){
    res.status(400)
    res.json({error: "Invalid request"})
}

export async function addLoteLin(req:Request, res:Response) {
    if(typeof req.body.message !== 'string' || typeof req.body.number !== 'string'){
        invalidRequest(res)
        return
    }

    const data = await loteService.addLoteLinUsingPattern({ message: req.body.message, number: req.body.number, imageUrl:req.body.imageUrl, fileBase64:req.body.fileBase64 } as LoteLin)

    res.status(201)
    if('rawError' in data)
        res.status(500)

    res.json(data)
}