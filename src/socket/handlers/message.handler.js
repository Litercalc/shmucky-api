import userList from "../../utils/socket-user-id-pairs.js"

export function messageHandler(io, socket) {

    socket.on("send-message", (selfUsername, recipientUsername, message) => {
        const recipientSocketId = userList[recipientUsername]
        const recipientSocket = io.sockets.sockets.get(recipientSocketId)
        const roomId = [selfUsername, recipientUsername].sort().join("-")

        socket.join(roomId)
        recipientSocket.join(roomId)
        socket.to(roomId).emit('recieve-message', message)
    })
}