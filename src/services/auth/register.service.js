import ApiError from "../../utils/api-error.js"
import {prisma} from "../../db/index.js"
import bcrypt from 'bcrypt'
import generateSessionService from "./generate-session.service.js"

export default async function registerUserService(username, password) {

    const existingUser = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if (existingUser) throw new ApiError(409, "Username already exists")

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            password: hashedPassword,
            username
        },
         select: {
            username: true,
            id: true,
            role: true
        }
    })

    const {token, tokenExpiry} = generateSessionService()

    await prisma.session.create({
        data: {
            userId: user.id,
            sessionToken: token,
            sessionTokenExpiry: tokenExpiry
        }
    })

    await prisma.pet.create({
        data: {
            userId: user.id,
        }
    })

    return {token, user: [user.id, user.username, user.role]}
}