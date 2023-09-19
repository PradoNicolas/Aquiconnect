import { Op } from "sequelize"
import loteHdr from "../models/LoteHdrModel"
import LoteLin from "../models/LoteLinModel"
import loteLin from "../models/LoteLinModel"

type ErrorJSON = {
    errorTitle:string
    errorMessage:string
    rawError:any
}

function generateErrorJSON(rawError:any, errorTitle?:string, errorMessage?:string){
    console.log(rawError)
    return {
        errorTitle: errorTitle,
        errorMessage: errorMessage,
        rawError: rawError
    } as ErrorJSON
}

function createLote(name:string){
    const newLote = loteHdr.build({ name: name })
    return newLote.save().catch(generateErrorJSON)
}

export function getNewestUnfinishedLotePopulated(){
    return loteHdr.findOne({
        where: {
            closedDate: null
        },
        order: [
            ['createdAt', 'ASC']
        ],
        include: {
            model: LoteLin,
            as: 'lotesLin',
            where: {
                conclusionDate: null
            }
        }
    }).catch(generateErrorJSON)
}

export function updateFinishedLotesLin(ids:number[]){
    return loteLin.update({ conclusionDate: new Date() }, {
        where: {
            id: {
                [Op.in]: ids
            },
            conclusionDate: null
        }
    }).catch(generateErrorJSON)
}

export function updateFinishedLoteHdr(id:number){
    return loteHdr.update({ closedDate: new Date() }, {
        where: {
            id: id
        }
    })
}

export async function updateLote(idLoteHdr:number, idLoteLins:number[]){
    try {
        const updatedLins = await updateFinishedLotesLin(idLoteLins)
        if('rawError' in updatedLins)
                throw updatedLins

        if(!updatedLins)
            updateFinishedLoteHdr(idLoteHdr)
        
    } catch (err:any) {
        if('rawError' in err)
            return err
        
        return generateErrorJSON(err)
    }
}

export async function addLoteLinUsingPattern(loteLin:loteLin) {
    try{
        let lastLote = await loteHdr.findOne({
            order: [
                ['id', 'DESC']
            ]
        })

        if(!lastLote || await lastLote.countLoteLins() == lastLote.limit){
            const result = await createLote(new Date().toISOString().slice(0, -5) + 'Z')
            if('rawError' in result)
                throw result
            lastLote = result
        }

        return lastLote.createLoteLin(loteLin)

    } catch (err:any) {
        if('rawError' in err)
            return err
        
        return generateErrorJSON(err)
    }
}