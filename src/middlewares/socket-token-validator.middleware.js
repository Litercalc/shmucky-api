
import validateToken from "./token-validator.middleware.js"

const socketValidateToken = async function(socket ,next) {
    try {
        const authToken = socket.handshake.auth.token
        await validateToken(authToken, socket, next)

    } catch (error) {
        next(error)
    }
}

export default socketValidateToken