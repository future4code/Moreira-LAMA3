import { UserDatabase } from "../data/UserDatabase"
import { SignupInputDTO } from "../types/signupInputDTO"
import { User } from "../types/userType"

const userDatabase = new UserDatabase

export class UserBusiness{

    create = async (input:SignupInputDTO)=>{

        //validacao do body
        const {name, email, password} = input

        if(!email || !name || !password){
            throw new Error("mensagem de erro")
        }

        //conferir se o usuario existe
        const registeredUser = await ("ir para UserDatabase passando argumento desejado: findByEmail(email)" )
        if(registeredUser){
            throw new Error("Email já cadastrado")
        }

        //criar uma id pro usuario

        //hashear o password

        //criar o usuario no banco

        //criar o token

        //retornar o token
        const token = 1

        return token
    }
}