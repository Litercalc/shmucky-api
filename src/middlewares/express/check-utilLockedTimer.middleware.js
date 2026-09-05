
import validateToken from "../token-validator.middleware.js"
import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

const checkUtilLockedTimer = async function(req,res,next) {
    const userId = req.user.id
    const pet = await prisma.pet.findUnique({
        where: {
            userId
        }
    })

    if (pet.utilLockedUntil === null) return next()
    if (pet.utilLockedUntil.getTime() > Date.now()) throw new ApiError(401, "Pet is still eating")

    next()
}

export default checkUtilLockedTimer