import ApiError from "../utils/api-error.js"
import {prisma} from "../db/index.js"

const validateToken = async function(authToken, req, next) {

    if (!authToken || !authToken.startsWith("Bearer ")) return next(new ApiError(401, "No bearer token found with session token"))

    const token = authToken.split(" ")[1]

    const sessionToken = await prisma.session.findUnique({
        where: {
            sessionToken: token
        }
    })

    if (!sessionToken) return next(new ApiError(404, "Session token does not exist"))

    if (sessionToken.sessionTokenExpiry.getTime() < Date.now()) {
        await prisma.session.delete({
            where: {
                id: sessionToken.id
            }
        })

        return next(new ApiError(401, "Session token has expired"))
    }

    const user = await prisma.user.findUnique({
        select: {
            username: true,
            id: true,
            role: true,
            isBanned: true
        },
        where: {
            id: sessionToken.userId
        }
    })

    if(user.isBanned === true) return next(new ApiError(401, "User is banned"))

    req.user = user

    next()
}

export default validateToken