import dotenv from 'dotenv'
import { TokenService } from '../token/token.service.js'
import OpenAI from "openai"

dotenv.config()
const tokenService = new TokenService()

export default new class deepSeekService {
    async deepSeekAnswer(api_key, content) {
        try {
            const openai = new OpenAI({
                baseURL: 'https://api.deepseek.com',
                apiKey: api_key 
            });

            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: content }],
                model: "deepseek-chat",
            });

            return {api_key: `Ключ API: ${api_key}`, 
                    question: `Вопрос: ${content}`,
                    answer: completion
                }
        } catch (error) {
            return {message: error}
        }
    }
}