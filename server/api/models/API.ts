export class API {
    //Attributes
    private uri;

    constructor(uri:string){
        this.uri = uri
    }

    //Wrappers
    public getUri() {
        return this.uri
    }
    public setUri(uri:string) {
        this.uri = uri
    }

    //Methods
    public makeRequest(endpoint:string, method?:string, headers?:HeadersInit, body?:BodyInit | null) {
        const requestOpts:RequestInit = {}

        if(method) requestOpts.method = method
        if(headers) requestOpts.headers = headers
        if(body) requestOpts.body = body
        
        return fetch(this.uri + endpoint, requestOpts);
    }
}