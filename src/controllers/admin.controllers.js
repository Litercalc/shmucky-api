import asyncHandler from "../utils/async-handler.js"
import ApiResponse from "../utils/api-response.js"

import {getStatsService, toggleBanService} from "../services/admin/index.js"

export const getStats = asyncHandler(async(req,res) => {
    const username = req.params.username

    const userStats = await getStatsService(username)

    res.status(200).json(new ApiResponse(200, "Retrieved user's statistics", userStats))
})

export const toggleBan = asyncHandler(async(req,res) => {
    const username = req.params.username

    const userStats = await toggleBanService(username)

    res.status(200).json(new ApiResponse(200, "Updated isBanned of user", userStats))
})