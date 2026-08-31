import asyncHandler from "../utils/async-handler.js"
import ApiResponse from "../utils/api-response.js"
import {loginUserService, registerUserService} from "../services/auth/index.js"

export const registerUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const token = await registerUserService(username, password)

    res.status(201).json(new ApiResponse(201, "Created new session and user", token))
})

export const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body

    const token = await loginUserService(username, password)

    res.status(201).json(new ApiResponse(201, "Created new session", token))
})