import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

export default async function getTasksService(userId) {
    
    const tasks = await prisma.toDoList.findMany({
        where: {
            userId
        }
    })

    if (!tasks) throw new ApiError(404, "Failed to find existing tasks")

    return tasks
}