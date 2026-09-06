import userList from "../../utils/socket-id-username-pairs.js"

export function connectionHandler(io, socket) {

    if (!userList.hasOwnProperty(socket.user.username)) {
        userList[socket.user.username] = new Set([socket.id])
    } else {
        userList[socket.user.username].add(socket.id)
    }
    console.log(`${socket.user.username} has connected`)

    socket.on("disconnect", () => {
        if(userList[socket.user.username].size === 1) {
            delete userList[socket.user.username]
        } else {
            userList[socket.user.username].delete(socket.id)
        }
        console.log(`${Object.keys(userList).find(key => userList[key] === socket.id)} has disconnected`)
    })
}