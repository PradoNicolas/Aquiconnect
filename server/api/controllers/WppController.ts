import { Request, Response } from 'express'
import * as wppService from "./../services/WppService"

export async function checkSessionConnection(req:Request, res:Response){
    const session = req.query.session
    const token = req.query.token
    const phone = req.query.phone

    if(typeof session !== 'string') {
        res.json("Error: Session not provided")
    }

    const serviceResponse = await wppService.checkSessionConnection(session as string, token as string, phone as string)

    res.json(await serviceResponse.json())
}

export async function sendRandomMessages(req:Request, res:Response) {
    const serviceResponse = await wppService.sendRandomMessages(req.body.sessions, req.body.messages, req.body.numbers, req.body.options)

    res.json(serviceResponse)
}

export async function sendMenssages(req:Request, res:Response) {
    if(typeof req.body.sessions === 'undefined'){
        req.body.sessions = [
            {session: "ZXBrX2VwazFfMjAyMzA5MDQ=", 
             token: "$2b$10$3cImVSNLvvsCvrvtnqcMw.pkdoVhSAxOUjfo9qKTCHzd_SvS2szMO"},
            {session: "ZXBrX2VwazJfMjAyMzA5MDQ=", 
             token: "$2b$10$_GrFe1ATjw84wEVBAUn5Wef_dw8gYESjWCHVsSAvLu8a9U3PUbl9W"},
            {session: "ZXBrX2VwazNfMjAyMzA5MDQ=", 
             token: "$2b$10$112a5fjxhaxQvWsXgCmXfev_yzTAonoAHuiQ7vqowplh4GGU3RtIm"},
            {session: "ZXBrX2VwazRfMjAyMzA5MDQ=", 
             token: "$2b$10$N7olOmpNsv1wdyknlTsv3e3pr5Yd8eNO7Q4J5HEksWmrJ.Z7rF2fq"}
        ]
    }
    if(typeof req.body.options === 'undefined'){
        req.body.options = {
            period: 20,
            delay: 60,
            maxSubmissions: 1000,
            group: 100
        }
    }

    if(!Array.isArray(req.body.dispatches)){
        res.status(400)
        res.json("Invalid request!")
        return
    }

    const serviceResponse = await wppService.sendMessages(req.body.sessions, req.body.dispatches, req.body.options)

    res.json(serviceResponse)
}

export async function sendImages(req:Request, res:Response) {
    const serviceResponse = await wppService.sendImages(req.body.sessions, req.body.message, req.body.numbers, req.body.options)

    res.json(serviceResponse)
}