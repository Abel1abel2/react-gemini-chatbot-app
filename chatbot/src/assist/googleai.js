import {GoogleGenerativeAI} from '@google/generative-ai'
const google=new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)
export class ASSIST{
    constructor(model='gemini-2.0-flash'){
        
const gemini=google.getGenerativeModel({model})
this.chatbot=gemini.startChat({history:[]})

    }
async chat(content){
    try{
        const result=await this.chatbot.sendMessage(content)
        return result.response.text()
    }
    catch(error){
        return error

    }

    


}
async *chatStream(content){
    try{
        const result=await this.chat.sendMessageStream(content)
        for await (const chunk of result.stream){
            yield chunk.text()
        }

    }
    catch(error){
        return  error
    }
}



}


