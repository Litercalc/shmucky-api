import userList from "../../utils/socket-id-username-pairs.js"

export function connectionHandler(io, socket) {

    userList[socket.user.username] = socket.id
    console.log(`${socket.user.username} has connected`)

    socket.on("disconnect", () => {
        delete userList[socket.user.username]
        console.log(`${Object.keys(userList).find(key => userList[key] === socket.id)} has disconnected`)
    })
}