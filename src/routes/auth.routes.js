import express from "express"
import { loginUser, registerUser } from "../controllers/auth.controllers.js"
import validate from "../middlewares/express/validator.middleware.js"
import usernamePasswordValidator from "../validators/express/auth.validator.js"
const router = express.Router()

router.post("/register",usernamePasswordValidator(), validate, registerUser)
router.post("/login",usernamePasswordValidator(), validate, loginUser)

export default router