import { Server } from "socket.io"
import { messageHandler } from "./handlers/message.handler.js"
import { connectionHandler } from "./handlers/connection.handler.js"
import { socketValidateToken } from "../middlewares/index.js"

export function initServer(server) {
    const io = new Server(server, {
        cors: {origin: process.env.ORIGIN}
    })

    io.use(socketValidateToken)

    io.on('connection', socket => {
        connectionHandler(io, socket)
        messageHandler(io, socket)
    })

    return io
}


