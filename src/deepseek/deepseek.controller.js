import deepseekService from './deepseek.service.js'


export class deepSeekController {
    async deepSeekAnswer(req, res, next) {
        try {
            const {content} = req.body
            const {api_key} = req.query

            const deepSeekAnswer = await deepseekService.deepSeekAnswer(api_key, content)

            return res.status(200).json({deepSeekAnswer})
        } catch (error) {
            return res.status(400).json({message: error})
        }

    }
}