import asyncHandler from "../utils/async-handler.js"
import ApiResponse from "../utils/api-response.js"

import {increasePetScoreService} from "../services/pet/index.js"

export const increasePetScore = asyncHandler(async(req,res) => {
    const userId = req.user.id
    const action = req.params.action

    const newPetScoreAndTime = await increasePetScoreService(userId, action)

    res.status(200).json(new ApiResponse(200, "Updated Pet Score", newPetScoreAndTime))
})