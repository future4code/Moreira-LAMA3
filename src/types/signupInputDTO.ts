import { USER_ROLES } from "./userType"

export type SignupInputDTO = {
    name: string
    email: string
    password: string
    role?: USER_ROLES
}