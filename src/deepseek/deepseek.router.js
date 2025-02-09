import { Router } from "express"
import { userMiddleware }from '../middlewares/user.middleware.js'
import { deepSeekController } from "./deepseek.controller.js"
import { body, check, query } from "express-validator"

const router = new Router()
const controller = new deepSeekController()
const _userMiddleware = new userMiddleware()

router.post(
    '/deepseek',
    _userMiddleware.isAuth,
    body('content').notEmpty(),
    query('api_key').notEmpty(),
    _userMiddleware.checkErrors,
    controller.deepSeekAnswer)

export const deepSeekRouter = router