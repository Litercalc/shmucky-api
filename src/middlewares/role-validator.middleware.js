import ApiError from "../utils/api-error.js"
import {prisma} from "../db/index.js"

const validateRole = async function(req, next) {

    const user = await prisma.user.findUnique({
        select: {
            role: true,
        },
        where: {
            id: req.user.id
        }
    })

    if(user.role !== "ADMIN") return next(new ApiError(401, "User is not an admin"))

    next()
}

export default validateRole