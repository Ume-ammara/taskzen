import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// router imports
import { healthCheck } from "./controllers/healthcheck.controllers.js"
// import { loginUser, registerUser } from './controllers/auth.controllers.js'
import router from './routes/auth.routes.js'
import projectRouter from './routes/project.routes.js'
import taskRouter from './routes/task.routes.js'

const app = express()

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods:['GET', 'POST', "DELETE", "PUT"],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())



app.use("/api/v1/healthcheck", healthCheck)
app.use("/api/v1/auth", router)
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/task", taskRouter)




export default app