import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
// routes
import { userRouter } from './src/users/user.router.js'
import { roleRouter } from './src/roles/role.router.js'
import { deepSeekRouter } from './src/deepseek/deepseek.router.js'
import helmet from 'helmet'
import compression from 'compression'

dotenv.config()

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  });

const app = express()
//const DB = process.env.DB_STRING

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', roleRouter)
app.use('/api', deepSeekRouter)
app.all('*', (req, res) => {
    res.status(404).json({message: 'Запрос не найден'})
})

app.use(cookieParser());
app.use(cors())
// app.use(limiter)
// app.use(helmet)
// app.use(compression)

// mongosh --host 192.168.1.11:27017 --username extectick --password Ovogup73_ --authenticationDatabase extectick
// 'mongodb://extectick:Ovogup73_@5.130.93.70:27017/?authMechanism=SCRAM-SHA-256'
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING)
        mongoose.connection.on('connected', () => console.log('connected'));
        
        
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
            
        })

        
        
    } catch (error) {
        console.log(error)
    }
}

start()

