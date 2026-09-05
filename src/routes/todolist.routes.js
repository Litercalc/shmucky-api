import express from "express"
import { addTask, editTask, deleteTask, getTasks, toggleTaskStatus } from "../controllers/todolist.controllers.js"
import {apiValidateToken, validator, checkUtilLockedTimer} from "../middlewares/index.js"

const router = express.Router()

router.use(apiValidateToken, checkUtilLockedTimer, validator)

router.post("/", addTask)
router.patch("/:taskId", editTask)
router.delete("/:taskId", deleteTask)
router.get("/", getTasks)
router.patch("/:taskId/toggle-status", toggleTaskStatus)

export default router