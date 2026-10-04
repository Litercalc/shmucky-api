import asyncHandler from "../utils/async-handler.js"
import ApiResponse from "../utils/api-response.js"
import {loginUserService, registerUserService, logoutUserService} from "../services/auth/index.js"

export const registerUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const {token, user} = await registerUserService(username, password)

    res.status(201).json(new ApiResponse(201, "Created new session and user", {token, user}))
})

export const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const {token, user} = await loginUserService(username, password)

    res.status(201).json(new ApiResponse(201, "Created new session", {token, user}))
})

export const logoutUser = asyncHandler(async (req, res) => {
    const token = req.token

    await logoutUserService(token)

    res.status(200).json(new ApiResponse(200, "Deleted user session and logged out"))
})