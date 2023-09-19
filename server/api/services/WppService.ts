import { WhatsAPI } from "./WhatsAPI";
import sequelize from "../../config/sequelize";
import https from "https"
const nodeFetch = require('node-fetch');

export function checkSessionConnection(session:string, token:string, phone:string){
    const wpp = new WhatsAPI("http://143.244.165.107/api", session, token)

    return wpp.checkNumberStatus(phone)
}

async function waitUntil(time:number) {
    return await new Promise(resolve => {
        setTimeout(() => {
            resolve("");
        }, time);
    });
}

function shuffle(array:any[]) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

export async function sendMessages(
    sessions:{session: string, token: string}[], 
    dispatches:{id:number, number: string, message: string}[],
    options: {period: number, delay: number, maxSubmissions: number, group: number, stopMoment?: Date}
) {
    let robots = sessions.map(session => new WhatsAPI("http://143.244.165.107/api", session.session, session.token))
    shuffle(robots)
    
    let response: {id:number, number: string, isSuccess: boolean}[] = []

    dispatches = dispatches.slice(0, options.maxSubmissions);

    for(let cycle = 0; cycle < (dispatches.length/options.group); cycle++){
        let dispatchGroup = dispatches.slice(cycle*options.group, (cycle+1)*options.group)

        //let sended = 0
        for(let finished = 0; finished < dispatchGroup.length; finished = finished+robots.length){
            if(options.stopMoment && new Date() >= options.stopMoment){
                return response
            }
            await waitUntil(options.delay*1000)

            let returns: Promise<Response>[] = []

            robots.forEach(async (robot, index) => {
                if(dispatchGroup[index+finished] === undefined){return}

                returns.push(
                    robot.sendMessage(
                    dispatchGroup[index+finished].message, 
                    dispatchGroup[index+finished].number)
                )
            })
            await Promise.all(returns)
                .then(results => Promise.all(results.map(result => result.json())))
                .then(results => results.forEach((result, index) => {
                    console.log("Number: " + dispatchGroup[index + finished].number, "Result: " + result.status)
                    if(result.status === 'success'){
                        //console.log(cycle*options.group + index + sended)
                        response.push({id:dispatchGroup[index+finished].id, number: dispatchGroup[index + finished].number, isSuccess: true})
                        //sended++
                    }
                    else{
                        console.log("Error! No robo de posicao " + index)
                        response.push({id:dispatchGroup[index+finished].id, number: dispatchGroup[index + finished].number, isSuccess: false})
                    }
            }))
        }

        await waitUntil(options.period*1000*60)
    }

    console.log(response)
    return response
}

export function sendRandomMessages(
    sessions:{session: string, token: string}[], 
    messages: string[], 
    numbers: string[], 
    options: {period: number, delay: number, maxSubmissions: number, group: number}
    ) {
        let robots = sessions.map(session => new WhatsAPI("http://143.244.165.107/api", session.session, session.token))

        for(let cycle = 0; cycle < (numbers.length/options.group); cycle++){
            let numbersGroup = numbers.slice(cycle*options.group, (cycle+1)*options.group)

            for(let finished = 0; finished < numbersGroup.length; finished = finished+robots.length){
                let returns: Promise<Response>[] = []
                
                robots.forEach((robot, index) => {
                    if(numbersGroup[index+finished] === undefined){return}

                    returns.push(robot.sendMessage(
                            messages[Math.floor(Math.random() * messages.length) + 0], 
                            numbersGroup[index+finished])
                    )
                })
                Promise.all(returns).then(() => console.log(cycle*options.group+robots.length+finished))
            }
        }

        return "Endo!"
}

export async function sendImages(
    sessions:{session: string, token: string}[], 
    message: {caption: string, image: string},
    numbers: string[],
    options: {period: number, delay: number, maxSubmissions: number, group: number}
){
    let robots = sessions.map(session => new WhatsAPI("http://143.244.165.107/api", session.session, session.token))
    
    let response: {number: string, result: string}[] = []

    numbers = numbers.slice(0, options.maxSubmissions);
    for(let cycle = 0; cycle < (numbers.length/options.group); cycle++){
        let numbersGroup = numbers.slice(cycle*options.group, (cycle+1)*options.group)

        let sended = 0
        for(let finished = 0; finished < numbersGroup.length; finished = finished+robots.length){
            let returns: Promise<Response>[] = []
            
            robots.forEach(async (robot, index) => {
                if(numbersGroup[index+finished] === undefined){return}
                
                returns.push(
                    robot.sendImage(
                    message.caption, 
                    numbersGroup[index+finished],
                    message.image)
                )
                await waitUntil(options.delay*1000)
            })
            await Promise.all(returns)
                .then(results => Promise.all(results.map(result => result.json())))
                .then(results => results.forEach((result, index) => {
                    //console.log(result.status)
                    if(result.status === 'success'){
                        console.log(cycle*options.group + index, numbersGroup[index])
                        response.push({number: numbersGroup[finished+index], result: "Sucess"})
                        sended++
                    }
            }))
        }

        if(cycle+1 < (numbers.length/options.group))await waitUntil(options.period*1000*60)
    }

    console.log(response)
    return response
}