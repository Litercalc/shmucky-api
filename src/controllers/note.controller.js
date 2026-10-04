import asyncHandler from "../utils/async-handler.js"
import ApiResponse from "../utils/api-response.js"
import {saveNoteService, getNoteService} from "../services/note/index.js"

export const saveNote = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const newText = req.body

    const newNote = await saveNoteService(userId, newText)

    res.status(200).json(new ApiResponse(200, "Saved note content", newNote))
})

export const getNote = asyncHandler(async(req,res) => {
    const userId = req.user.id

    const note = await getNoteService(userId)
    console.log(note)

    res.status(200).json(new ApiResponse(200, "Retrieved note content", note))
})