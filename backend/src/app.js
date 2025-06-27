import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// router imports
import { healthCheck } from "./controllers/healthcheck.controllers.js"

const app = express()

app.use(
    cors({
        origin: process.env.BASE_URL,
        credentials: true,
        methods:['GET', 'POST', "DELETE", "PUT"],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use("/api/v1/healthcheck", healthCheck)

// app.use("/api/v1/auth", authRoutes)


export default app