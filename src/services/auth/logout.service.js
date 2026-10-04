
import prisma from "../../db/index.js"
import ApiError from "../../utils/api-error.js"

export default async function logoutUserService(token) {


    await prisma.session.delete({
        where: {
            sessionToken: token
        }
    })

    
}