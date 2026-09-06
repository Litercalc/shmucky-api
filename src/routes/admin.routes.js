import express from "express"
import { getStats, toggleBan } from "../controllers/admin.controllers.js"
const router = express.Router()

import {apiValidateToken, apiValidateRole, validator} from "../middlewares/index.js"

router.use(apiValidateToken, apiValidateRole, validator)

router.get("/:username", getStats)
router.patch("/:username/toggle-ban", toggleBan)

export default router