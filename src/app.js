import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json({limit: "16kb"}))
app.use(cors({
    origin: process.env.ORIGIN?.split(",") || "http://localhost:5173",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
}))

app.get("/", (req, res) => {
    res.send("Hello world")
})

import authRouter from "./routes/auth.routes.js"

app.use("/api/v1/auth", authRouter)

import todoListRouter from "./routes/todolist.routes.js"

app.use("/api/v1/todolist", todoListRouter)


export default app
