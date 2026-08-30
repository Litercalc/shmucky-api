import ApiResponse from "../../utils/api-response"
import {prisma} from "../../db/index.js"
import bcrypt from 'bcrypt'

export default async function registerUserService(username, password) {

    const existingUser = await prisma.user.findFirst({
        where: {
            username
        }
    })
}