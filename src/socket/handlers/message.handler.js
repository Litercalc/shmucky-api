import userList from "../../utils/socket-id-username-pairs.js"

export function messageHandler(io, socket) {

    socket.on("send-message", (recipientUsername, message) => {
        const selfUsername = socket.user.username
        const recipientSocketId = userList[recipientUsername]
        const recipientSocket = io.sockets.sockets.get(recipientSocketId)

        if (!recipientSocket) {
            socket.emit('error', {success: false, reason: "recipient does not exist"})
            return
        }
        const roomId = [selfUsername, recipientUsername].sort().join("-")

        console.log(roomId)

        socket.join(roomId)
        recipientSocket.join(roomId)
        socket.to(roomId).emit('recieve-message', message)
        console.log("message")
    })
}