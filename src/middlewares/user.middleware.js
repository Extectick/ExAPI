import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

export class userMiddleware {
    async validRegistration(req, res, next) {
        
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array()})
        }
        
        next()
    }
    async validLogin(req, res, next) {
        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(400).json({errors: result.array()})
        }

        next()
    }
    async isAuth(req,res, next) {
        if(req.method === "OPTIONS") {
            next()
        }

        try {
            if (!req.headers.authorization) {
                return res.status(403).json({message: "Пользователь не авторизован"}) 
            }
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "Пользователь не авторизован"})
            }
            const decodedData = jwt.verify(token, process.env.SECRET_KEY)
            req.user = decodedData
            
            next()

        } catch (error) {
            //console.log(error)
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
    }
}
