
import validateRole from "../role-validator.middleware.js"

const apiValidateRole = async function(req,res,next) {
    try {

        await validateRole( req, next)

    } catch (error) {
        next(error)
    }
}

export default apiValidateRole