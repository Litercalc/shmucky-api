import { body } from "express-validator"

export default function taskValidator(){ 
    return [
        body("task")
            .trim()
            .isLength({min:1, max:75})
            .withMessage("A task description can only be between 1 and 100 characters long")
    ]
}