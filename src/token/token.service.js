import jwt from 'jsonwebtoken'
import Token from './token.model.js'

export class TokenService {
    generateTokens(payload) {
        const accessToken  = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "30m"})
        const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {expiresIn: "30d"})
        

        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({user: userId})

        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save()
        }
        const token = await Token.create({user: userId, refreshToken})
        
        return token
    }

}
