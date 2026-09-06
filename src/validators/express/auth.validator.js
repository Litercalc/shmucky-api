import { body } from "express-validator"

export default function usernamePasswordValidator() {
    return [
        body("username")
            .trim()
            .isLength({min: 3, max: 15})
            .withMessage("Username must be between 3 and 15 characters long"),
        body("password")
            .isStrongPassword({
                minLength: 8,
                minNumbers: 1,
                minUppercase: 1,
                minLowercase: 1,
                minSymbols: 1
            })
            .withMessage("Password must be 8 characters long, and must contain 1 uppercase, 1 lowercase, 1 number, and 1 symbol")
    ]
}
