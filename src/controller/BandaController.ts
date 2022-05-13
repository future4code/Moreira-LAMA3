import { Request, Response } from "express";
import { BandaInputDTO } from "../types/bandaInputDTO";
import { BandaBusiness } from "../business/BandaBusiness";
import { Authenticator } from "../services/Authenticator";

export class BandaController{
  constructor(private bandaBusiness: BandaBusiness) {}

    createBanda = async (req:Request, res:Response): Promise<string | undefined>=>{

        try {
          const token = req.headers.authorization as string

          


            //entrada da requisição
            const {name, music_genre, responsible} = req.body

            const input: BandaInputDTO ={
              name,
              music_genre,
              responsible,
            }
            
            await this.bandaBusiness.createBanda(input, token) //acessando UserBusiness e passando o Body

            //responder a requisição
            res.status(201).send({message:"Banda cadastrado com sucesso!"})
        
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