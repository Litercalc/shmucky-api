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

import petRouter from "./routes/pet.routes.js"

app.use("/api/v1/pet", petRouter)

import adminRouter from "./routes/admin.routes.js"

app.use("/api/v1/admin", adminRouter)

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    errors: err.errors 
  })
})


export default app
