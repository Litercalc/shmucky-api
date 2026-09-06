import { validationResult } from 'express-validator'
import ApiError from '../../utils/api-error.js'

const validate = (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {

        const allErrors = []

        errors.array().map((err) => allErrors.push({
            [err.path]: err.msg,
        }))

        console.log(allErrors)
        throw new ApiError(422, "Recieved data is not valid", allErrors)
    }

    return next()
}

export default validate
