import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config();


// router imports
import { healthCheck } from "./controllers/healthcheck.controllers.js"
import router from './routes/auth.routes.js'
import projectRouter from './routes/project.routes.js'
import taskRouter from './routes/task.routes.js'
import projectNoteRouter from './routes/note.routes.js'
import subtaskRouter from './routes/subtask.routes.js'
import { errorHandler } from './middlewares/error.middleware.js';


const app = express()

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods:['GET', 'POST', "DELETE", "PUT","OPTIONS","PATCH"],
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
app.use("/api/v1/subtask", subtaskRouter)
app.use("/api/v1/projectnote", projectNoteRouter)


// error middleware
app.use(errorHandler)

export default app