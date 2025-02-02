import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// routes
import { userRouter } from './src/users/user.router.js'
import { roleRouter } from './src/roles/role.router.js'



dotenv.config()

const app = express()
//const DB = process.env.DB_STRING

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', roleRouter)
app.all('*', (req, res) => {
    res.status(404).json({message: 'Not Found'})
})
app.use(cookieParser());
app.use(cors())

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

