import { UserDatabase } from "../data/UserDatabase"
import User from "../model/Usuario"
import { Authenticator } from "../services/Authenticator"
import { HashManager } from "../services/HashManager"
import { Idgenerator } from "../services/IdGenerator"
import { SignupInputDTO } from "../types/signupInputDTO"



export class UserBusiness{
  constructor(private userDatabase: UserDatabase) {}

 
    create = async (input:SignupInputDTO)=>{

        //validacao do body
        const {name, email, password} = input

        if(!email || !name || !password){
            throw new Error("Fill in all data")
        }

        if (!email || email.indexOf("@") === -1) {
          throw new Error("Email invalid!");
        }

        if (!password || password.length < 6) {
          throw new Error("Password invalid!");
        }

        //conferir se o usuario existe
        const checkEmail = await this.userDatabase.findUserByEmail(email);

        if (checkEmail) {
          throw new Error("Email already exists!");
        }

        //criar uma id pro usuario

        const idGenerator = new Idgenerator();
        const id = idGenerator.generateId()
        console.log(id)

        //hashear o password
        

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(password)
        console.log(hashPassword)

        //criar o usuario no banco

        const user = {id, name, email, password: hashPassword}

        await this.userDatabase.create(user)
        

        //criar o token
        const authenticator = new Authenticator         
        const token = authenticator.generateToken({id}) 

        return token
    }
}