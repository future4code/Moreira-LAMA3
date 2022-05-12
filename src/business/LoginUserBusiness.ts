import { compare } from "bcryptjs"
import { LoginUserDatabase } from "../data/LoginUserDatabase"
import { login } from "../types/userType"
import { Authenticator } from "../services/Authenticator"



const loginUserDatabase = new LoginUserDatabase

export class UserBusiness{

    login = async (input:login):Promise<string>=>{

        //validacao do body
        const {email, password} = input

        if(!email || !password){
            throw new Error("'email' e 'senha' são obrigatórios")
        }

        //conferir se o usuario existe para pegar os dados - desestruturação do array
        const [user] = await (loginUserDatabase.findByEmail(email)) //função a ser criada indo para UserDatabase 

        //verificar senha
        const passwordIsCorrect: boolean = await compare(password, user?.password)

        if (!passwordIsCorrect) {
            throw new Error("Email ou Senha incorretos.")
        }

        //criar o token
        const authenticator = new Authenticator
        const token = authenticator.generateToken({id: user.id})

        return token
    }
}