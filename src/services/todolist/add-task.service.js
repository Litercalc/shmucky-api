import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

export default async function addTaskService(userId, task) {
    
    const newTask = await prisma.toDoList.create({
        data: {
            userId,
            task
        }
    })

    if (!newTask) throw new ApiError(500, "Failed to create new task")

    return newTask
}