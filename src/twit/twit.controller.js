import { Router } from "express";
import { TwitService } from "./twit.service.js";

const router = Router()

const twistService = new TwitService()

router.post('/', (req, res) => {
    if(req.body?.text?.length < 1) {
        return res.status(400).json({message: 'Text is empty'})   
    }

    const twit = twistService.createTwit(req.body)
    res.status(201).json(twit)
})

export const twitRouter = router