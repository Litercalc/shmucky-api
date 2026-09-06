import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

async function toggleBanService(username) {
    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (!user) throw new ApiError(404, "Cannot find user")

    const newUserStatus = await prisma.user.update({
        select: {
            id: true,
            username: true,
            isBanned: true
        },
        where: {
            id: user.id
        },
        data: {
            isBanned: !user.isBanned
        }
    })

    return newUserStatus
}

export default toggleBanService