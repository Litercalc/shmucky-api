import { body } from "express-validator"

export default function usernamePasswordValidator() {
    return [
        body("username")
            .trim()
            .notEmpty()
            .withMessage("Username is required")
            .isLength({min: 3})
            .withMessage("Username is too short")
            .isLength({max: 15})
            .withMessage("Username is too long"),
        body("password")
            .trim()
            .notEmpty()
            .withMessage("Password is required")
            .isStrongPassword({
                minLength: 8,
                minNumbers: 1,
                minUppercase: 1,
                minLowercase: 1,
                minSymbols: 1
            })
            .withMessage("Password is not secure")
    ]
}
