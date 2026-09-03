import 'dotenv/config'
import app from './app.js'

import { createServer } from 'http'
import { initServer } from './socket/index.js'

const httpServer = createServer(app)
const io = initServer(httpServer)

const PORT = process.env.PORT || 3000

httpServer.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
