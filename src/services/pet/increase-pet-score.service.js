import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"

async function increaseScore(increaseAmount, userId, pet) {
    return await prisma.pet.update({
            select: {
                petScore: true,
                utilLockedUntil: true
            },
            where: {
                userId
            },
            data: {
                petScore: pet.petScore + increaseAmount,
            }
        })
}

export default async function increasePetScoreService(userId, action) {

    const ACTIONS = {
        FEED : 10,
        PET: 1
    }
    console.log(userId)

    if(!ACTIONS.hasOwnProperty(action)) throw new ApiError(404, "Action is not available")
    
    const pet = await prisma.pet.findUnique({
        where: {
            userId
        }
    })

    if (!pet) throw new ApiError(404, "Failed to find pet")

    return increaseScore(ACTIONS[action], userId, pet)

    
}