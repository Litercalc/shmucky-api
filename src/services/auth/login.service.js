import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"
import bcrypt from 'bcrypt'
import generateSessionService from "./generate-session.service.js"

export default async function loginUserService(username, password) {

    const user = await prisma.user.findUnique({
        where: {
            username
        }
    })

    if (!user) throw new ApiError(404, "User not found")

    const passwordMatch = await  bcrypt.compare(password, user.password)

    if (!passwordMatch) throw new ApiError(400, "Passwords do not match")

    const {token, tokenExpiry} = generateSessionService()

    await prisma.session.create({
        data: {
            userId: user.id,
            sessionToken: token,
            sessionTokenExpiry: tokenExpiry
        }
    })
    
    
    return {token, user: [user.id, user.username, user.role]}
}