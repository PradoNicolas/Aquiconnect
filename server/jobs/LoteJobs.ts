import { CronJob } from './CronJobType'
import * as loteService from './../api/services/LoteService'
import * as wppService from "./../api/services/WppService"

async function processNewestLote(){
    const data = await loteService.getNewestUnfinishedLotePopulated()
    if(data === null)
        console.log('No lote to run')
    else if('rawError' in data)
        console.log('Error!')
    else if(typeof data.loteLins === 'undefined')
        console.log('No lote lin to run')
    else{

        const sessions = [
            {session: "ZXBrX2VwazFfMjAyMzA5MDQ=", 
            token: "$2b$10$3cImVSNLvvsCvrvtnqcMw.pkdoVhSAxOUjfo9qKTCHzd_SvS2szMO"},
            {session: "ZXBrX2VwazJfMjAyMzA5MDQ=", 
            token: "$2b$10$_GrFe1ATjw84wEVBAUn5Wef_dw8gYESjWCHVsSAvLu8a9U3PUbl9W"},
            {session: "ZXBrX2VwazNfMjAyMzA5MDQ=", 
            token: "$2b$10$112a5fjxhaxQvWsXgCmXfev_yzTAonoAHuiQ7vqowplh4GGU3RtIm"},
            {session: "ZXBrX2VwazRfMjAyMzA5MDQ=", 
            token: "$2b$10$N7olOmpNsv1wdyknlTsv3e3pr5Yd8eNO7Q4J5HEksWmrJ.Z7rF2fq"}
        ]

        const dispatches = data.loteLins.map(loteLin => { return { id:loteLin.id, number: loteLin.number, message: loteLin.message } })

        const options = {
            period: 0,
            delay: 60,
            maxSubmissions: data.limit || 500,
            group: 100,
            stopMoment: (() => {const today = new Date(); today.setHours(23, 0, 0); return today})()
        }

        const results = await wppService.sendMessages(sessions, dispatches, options)

        loteService.updateLote(data.id, results.filter(result => result.isSuccess).map(result => result.id))
    }
}

const jobs:CronJob[] = [
    {
        moment: '0 11 * * *',
        function: () => console.log('Running: ', new Date())//processNewestLote
    },
    {
        moment: '30 11 * * *',
        function: () => console.log('Running2: ', new Date())//processNewestLote
    }
]

export default jobs