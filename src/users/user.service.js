import User from './user.model.js'
import Role from '../roles/role.model.js'
import { TokenService } from '../token/token.service.js';
// import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import UserDto from './user.dto.js'


dotenv.config()
const tokenService = new TokenService()

export default new class UserService {
    async registration(username, password) {
        try {
            //Проверка на существование такого же пользователя
            //const {username, password} = req.body
            const candidate = await User.findOne({username})
            
            if (candidate) {
                return {message: 'Пользователь с таким логином уже существует!'} 
            }

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()

            const userDto = new UserDto(user) // id, role
            const tokens = tokenService.generateTokens({...userDto})
                
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            
            return { ...tokens, user: userDto }


        } catch (error) {
            console.log(error)
            return {message:'Registration error'}
        }
    }
    async login(username, password) {
        try {
            const user = await User.findOne({username})

            if (!user) {
                return {message: `Пользователь ${username} не найден`}
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return {message: `Введен не верный пароль`}
            }

            // const token = generateAccessToken(user._id, user.roles)
            const userDto = new UserDto(user) // id, role
            const tokens = tokenService.generateTokens({...userDto})
                
            await tokenService.saveToken(userDto.id, tokens.refreshToken)
            
            return { ...tokens, user: userDto }

        } catch (error) {
            console.log(error)
            return {message:'Login error'}
        }
    }

    async getUsers() {
        try {
            const users = await User.find()
            console.log(users)
            return {message: users}
        } catch (error) {
            console.log(error)
            return {message:'Error'}
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