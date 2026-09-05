
import validateToken from "../token-validator.middleware.js"

const apiValidateToken = async function(req,res,next) {
    try {
        const authToken = req.headers.authorization

        await validateToken(authToken, req, next)

    } catch (error) {
        next(error)
    }
}

export default apiValidateToken