import { Request, Response } from "express";
import { SignupInputDTO } from "../types/signupInputDTO";
import { LoginInputDTO } from "../types/userType";
import { UserBusiness } from "../business/UserBusiness";
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

    login = async (req: Request, res: Response) => {

      const {email, password } = req.body;
  
          const input: LoginInputDTO = {
            email, 
            password
          }
    try{
          const token = await this.userBusiness.login(input)
          console.log(token)
    
        res.status(200).send({message:'User logado com sucesso',token})
    } catch(err: any){ 
        res.status(400).send({message: err.message  || err.sqlMessage });
    }
  }
}