import { prisma } from "../../db/index.js";
import ApiError from "../../utils/api-error.js";

export default async function getNoteService(userId) {
    const note = await prisma.note.findUnique({
        select: {
            text: true
        },
        where: {
            userId
        }
    })
    
    console.log(note)
    
    return note


}