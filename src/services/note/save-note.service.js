import prisma from "../../db/index.js";
import ApiError from "../../utils/api-error.js";

export default async function saveNoteService(userId, newText) {
    const note = await prisma.note.update({
        select: {
            text: true
        },
        where: {
            userId
        },
        data: {
            text: newText
        }
    })

    if (!note) throw new ApiError(400, "Something went wrong while trying to save")
    
    return note


}