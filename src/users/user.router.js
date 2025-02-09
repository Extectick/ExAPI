import { Router } from "express";
import { userController } from "./user.controller.js";
import { body, check, query } from "express-validator"
import { userMiddleware } from "../middlewares/user.middleware.js"
import { validRole } from "../middlewares/role.middleware.js"


//const controller = require('./user.controller')
const router = new Router()
const controller = new userController()
const _userMiddleware = new userMiddleware()


router.post(
    '/registration',
    body('username').notEmpty(),
    body('password').notEmpty().isStrongPassword().withMessage({message: "Слабый пароль"}),
    _userMiddleware.checkErrors, 
    controller.registration)

router.post(
    '/login',
    body('username').notEmpty(),
    body('password').notEmpty(), 
    _userMiddleware.checkErrors,
    controller.login)

router.post('/logout', controller.logout)

router.get('/users', 
    validRole(['ADMIN']),
    controller.getUsers)

router.get('/refresh', controller.refresh)

//module.exports = router
export const userRouter = router