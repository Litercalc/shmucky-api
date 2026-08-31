import ApiError from "../utils/api-error.js"
import {prisma} from "../db/index.js"
import validate from "./validator.middleware.js"

const validateToken = async function(req,res,next) {
    try {
        const authToken = req.headers.authorization

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

        req.user = await prisma.user.findUnique({
            select: {
                username: true,
                id: true
            },
            where: {
                id: sessionToken.userId
            }
        })

        next()
    } catch (error) {
        next(error)
    }
}

export default validateToken