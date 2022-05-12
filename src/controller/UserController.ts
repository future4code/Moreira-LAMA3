import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { SignupInputDTO } from "../types/signupInputDTO";

//const userBusiness = new UserBusiness

export class UserController{
  constructor(private userBusiness: UserBusiness) {}

    createUser = async (req:Request, res:Response): Promise<string | undefined>=>{

        try {
            //entrada da requisição
            const {name, email, password, role} = req.body

            const input: SignupInputDTO ={
                name,
                email,
                password,
                role
            }
            
            const token: string = await this.userBusiness.create(input) //acessando UserBusiness e passando o Body

            //responder a requisição
            res.status(201).send({
                message:"Usuário cadastrado com sucesso!",
                token: token })
        
        return token 

        } catch(error: any){ 

          switch(error.message){
            case "conta não encontrada!":
              res.status(404).send(error.message)
            break 
            case "usuário já existente!":
              res.status(409).send(error.message)
            break
            case "Todos os dados precisam ser preenchidos!":
              res.status(422).send(error.message)
            break
            case "Erro no servidor!":
              res.status(500).send(error.message)
            default:
              res.status(400).send({message: error.message  || error.sqlMessage });
          }
          
        }
    }
}