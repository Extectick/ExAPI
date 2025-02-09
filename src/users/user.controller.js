import User from './user.model.js'
import Role from '../roles/role.model.js'
import UserService from './user.service.js'
// import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'


dotenv.config()


export class userController {
    async registration(req, res, next) {
        try {
            const {username, password} = req.body
            const userData = await UserService.registration(username, password)
            // для https добавить secure: true
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)

        } catch (error) {
            console.log(error)
            res.status(400).json({message:'Registration error'})
        }
    }
    async login(req, res, next) {
        try {
            const {username, password} = req.body
            const userData = await UserService.login(username, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)

        } catch (error) {
            console.log(error)
            res.status(400).json({message:'Login error'})
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserService.getUsers()
            
            res.json(users)
        } catch (error) {
            console.log(error)
            res.status(400).json({message:'Error to get users'})
        }
    }

    async logout(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }

    async refresh(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
}
