import { Request, Response } from "express";
import { ShowInputDTO } from "../types/showInputDTO";
import { ShowBusiness } from "../business/showBusiness";

export class ShowController{
  constructor(private showBusiness: ShowBusiness) {}

    createShow = async (req:Request, res:Response): Promise<void>=>{

        try {

            const {week_day, start_time, end_time, band_id} = req.body

            const input: ShowInputDTO ={
              week_day,
              start_time,
              end_time,
              band_id
            }
            
            await this.showBusiness.createShow(input) 

            res.status(201).send({message:"Show cadastrado com sucesso!"})

        } catch(error: any){ 

          switch(error.message){
            case "banda não encontrada!":
              res.status(404).send(error.message)
            break 
            case "show já existente!":
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

    getShow = async (req: Request, res: Response) =>{
      try{
        const diaShow = req.params
        console.log(diaShow)

        const show = await this.showBusiness.getShow(diaShow.dia);

        res.status(200).send({show})

      }catch(error: any){
        switch(error.message){
          case "banda não encontrada ou show não encontrado!":
            res.status(404).send(error.message)
          break 
            case "Você precisa colocar um dia no params":
            res.status(401).send(error.message)
          break
          case "Erro no servidor!":
            res.status(500).send(error.message)
          default:
            res.status(400).send({message: error.message  || error.sqlMessage });
        }

      }
      
    }
}