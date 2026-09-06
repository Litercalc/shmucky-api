import userList from "../../utils/socket-id-username-pairs.js"
import messageValidator from "../../validators/socket/message.validator.js"

export function messageHandler(io, socket) {

    socket.on("send-message", (recipientUsername, message) => {
        if (!messageValidator(message)) {
            socket.emit('error', {success: false, reason: "Message must be between 1 and 50 characters"})
            return
        }

        const selfUsername = socket.user.username
        const recipientSocketId = userList[recipientUsername]

        if (!recipientSocketId) {
            socket.emit('error', {success: false, reason: "recipient does not exist/is not active"})
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