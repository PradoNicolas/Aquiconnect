import { API } from "../models/API";

//Decoretors
function parametersVerify(params: string[]) {
    return function (target:any, key:string, descriptor:PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]){
            args.forEach((arg, index) => {
                if(!arg){
                    throw new Error(params[index])
                }
            })
            const result = originalMethod.apply(this, args)
            return result
        }

        return descriptor
    }
}

export class WhatsAPI extends API {
    //Attributes
    private session
    private token
    private defaultHeader

    constructor(uri:string, session:string, token:string){
        super(uri)
        this.session = session
        this.token = token
        this.defaultHeader = {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`} 
    }

    //Wrappers
    public getSession(){
        return this.session
    }
    public setSession(session:string){
        this.session = session
    }

    public getToken(){
        return this.token
    }
    public setToken(token:string){
        this.token = token
    }

    //Methods
    @parametersVerify(["Destigo de checagem vazio"])
    public checkNumberStatus(phone:string){
        const endpoint = `/${this.session}/check-number-status/${phone}`
        const method = "GET"

        return this.makeRequest(endpoint, method, this.defaultHeader)
    }

    //@parametersVerify(["Corpo da mensagem vazio", "Destino da mensagem vazio"])
    public sendMessage(message:string, phone:string){
        const endpoint = `/${this.session}/send-message`
        const method = "POST"

        const isGroup = false

        return this.makeRequest(endpoint, method, this.defaultHeader, JSON.stringify({message: message, phone: phone, isGroup: isGroup}))
    }

    public sendImage(message:string, phone:string, image:string){
        const endpoint = `/${this.session}/send-image`
        const method = "POST"

        const isGroup = false

        return this.makeRequest(endpoint, method, this.defaultHeader, JSON.stringify({message: message, phone: phone, base64: image, isGroup: isGroup}))
    }
}