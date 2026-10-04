import express from "express"
import {getNote, saveNote} from "../controllers/note.controller.js"
const router = express.Router()

import {apiValidateToken} from "../middlewares/index.js"

router.use(apiValidateToken)

router.get("/", getNote)
router.patch("/", saveNote)

export default router