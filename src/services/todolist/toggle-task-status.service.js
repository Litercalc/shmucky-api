import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

export default async function toggleTaskStatusService(userId, taskId) {
    
    const task = await prisma.toDoList.findUnique({
        where: {
            id: taskId
        }
    })

    if (!task) throw new ApiError(404, "Failed to find/edit existing task")

    if(task.userId !== userId) throw new ApiError(402, "User does not own this task")

    const editedTask = await prisma.toDoList.update({
        where: {
            id: task.id
        },
        data: {
            status: task.status === "NOT_COMPLETED" ? "COMPLETED" : "NOT_COMPLETED"
        }
    })

    return editedTask
}