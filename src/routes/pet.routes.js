import express from "express"
import { increasePetScore } from "../controllers/pet.controllers.js"
const router = express.Router()

import {apiValidateToken, validator} from "../middlewares/index.js"

router.use(apiValidateToken, validator)

router.patch("/increase-score/:action", increasePetScore)

export default router