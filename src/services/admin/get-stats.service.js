import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

async function getStatsService(username) {
    const user = await prisma.user.findUnique({
        where: {
            username
        },
        select: {
            id: true,
            username: true,
            role: true,
            tokensSpentCount: true,
            pet: true
        }
    })

    if (!user) throw new ApiError(404, "Cant find user")

    return user
}

export default getStatsService