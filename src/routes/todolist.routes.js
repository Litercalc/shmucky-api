import express from "express"
import { addTask, editTask, deleteTask, getTasks, toggleTaskStatus } from "../controllers/todolist.controllers.js"
import {validateToken, validator} from "../middlewares/index.js"

const router = express.Router()

router.use(validateToken, validator)

router.post("/", addTask)
router.patch("/:taskId", editTask)
router.delete("/:taskId", deleteTask)
router.get("/", getTasks)
router.patch("/:taskId/toggle-status", toggleTaskStatus)

export default router