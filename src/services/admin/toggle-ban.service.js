import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

async function toggleBanService(id) {
    const user = await prisma.user.findUnique({
        where: {
            id
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