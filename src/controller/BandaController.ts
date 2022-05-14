import { Request, Response } from "express";
import { BandaInputDTO } from "../types/bandaInputDTO";
import { BandaBusiness } from "../business/BandaBusiness";

export class BandaController{
  constructor(private bandaBusiness: BandaBusiness) {}

    createBanda = async (req:Request, res:Response): Promise<string | undefined>=>{

        try {
          const token = req.headers.authorization as string

            const {name, music_genre, responsible} = req.body

            const input: BandaInputDTO ={
              name,
              music_genre,
              responsible,
            }
            
            await this.bandaBusiness.createBanda(input, token) 

            res.status(201).send({message:"Banda cadastrado com sucesso!"})
        
        return token 

        } catch(error: any){ 

          switch(error.message){
            case "você não é autorizado a cadastrar uma banda":
              res.status(401).send(error.message)
            break 
            case "banda já existente!":
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

    getBanda = async (req: Request, res: Response) =>{
      try{
        const idBanda = req.params

        const banda = await this.bandaBusiness.getBanda(idBanda.id)

        res.status(200).send({banda})

      }catch(error: any){
        res.status(400).send({message: error.message  || error.sqlMessage });

      }
    }
}