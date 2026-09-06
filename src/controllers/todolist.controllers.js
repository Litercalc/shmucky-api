import asyncHandler from "../utils/async-handler.js"
import ApiResponse from "../utils/api-response.js"
import {addTaskService, editTaskService, deleteTaskService, getTasksService, toggleTaskStatusService} from "../services/todolist/index.js"

export const addTask = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const {task} = req.body

    const newTask = await addTaskService(userId, task)

    res.status(201).json(new ApiResponse(201, "Created new task", newTask))
})

export const editTask = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const taskId = req.params.taskId
    const {task} = req.body
    
    const editedTask = await editTaskService(userId, taskId, task)

    res.status(200).json(new ApiResponse(200, "Edited task", editedTask))
})

export const deleteTask = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const taskId = req.params.taskId

    const deletedTask = await deleteTaskService(userId, taskId)

    res.status(200).json(new ApiResponse(200, "Deleted task", deletedTask))
    
})

export const getTasks = asyncHandler(async(req,res) => {
    const userId = req.user.id

    const tasks = await getTasksService(userId)

    res.status(200).json(new ApiResponse(200, "Retrieved tasks", tasks))
    
})

export const toggleTaskStatus = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const taskId = req.params.taskId

    const editedTask = await toggleTaskStatusService(userId, taskId)

    res.status(200).json(new ApiResponse(200, "Updated task status", editedTask))
    
})