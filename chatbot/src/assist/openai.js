import OpenAI from 'openai';
const api=import.meta.env.VITE_DEEPSEEK_API_KEY
console.log(api)
const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: api, // Correct key name
    dangerouslyAllowBrowser:true
    
});

export class ASSISTANT{
    constructor(model='deepseek-chat'){
        this.model=model
    }
    async chat(content, history) {
        try {
            const result = await openai.chat.completions.create({
                model: this.model,
                messages: [...history, { content, role: 'user' }]
            });
            return result.choices[0].message.content;
        } catch (error) {
            console.error('Error in chat method:', error);
            throw error; // Rethrow the error for the caller to handle
        }
    }
}
