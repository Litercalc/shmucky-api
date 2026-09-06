import userList from "../../utils/socket-id-username-pairs.js"

export function messageHandler(io, socket) {

    socket.on("send-message", (recipientUsername, message) => {
        const selfUsername = socket.user.username
        const recipientSocketId = userList[recipientUsername]

        if (!recipientSocketId) {
            socket.emit('error', {success: false, reason: "recipient does not exist"})
            return
        }
        const roomId = [selfUsername, recipientUsername].sort().join("-")

        socket.join(roomId)

        for (let client of recipientSocketId) {
            const recipientSocket = io.sockets.sockets.get(client)
            recipientSocket.join(roomId)
        }

        socket.to(roomId).emit('recieve-message', message)
        io.socketsLeave(roomId)
    })
}