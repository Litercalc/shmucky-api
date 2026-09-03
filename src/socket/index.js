import { Server } from "socket.io"

export function initServer(server) {
    const io = new Server(server, {
        cors: process.env.ORIGIN
    })

    io.on('connection', socket => {
        console.log(socket.id)
    })

    return io
}


