import express from "express"
import { addTask, editTask, deleteTask, getTasks, toggleTaskStatus } from "../controllers/todolist.controllers.js"
import {apiValidateToken, validator} from "../middlewares/index.js"
import taskValidator from "../validators/express/task.validator.js"

const router = express.Router()

router.use(apiValidateToken)

router.post("/", taskValidator(), validator, addTask)
router.patch("/:taskId", taskValidator(), validator, editTask)
router.delete("/:taskId", deleteTask)
router.get("/", getTasks)
router.patch("/:taskId/toggle-status", toggleTaskStatus)

export default router