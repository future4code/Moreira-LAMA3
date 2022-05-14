import { BandaDatabase } from "../data/BandaDatabase";
import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";
import { BandaInputDTO } from "../types/bandaInputDTO";
import { USER_ROLES } from "../types/userType";

export class BandaBusiness{
  constructor(private bandaDatabase: BandaDatabase) {}

    createBanda = async (input: BandaInputDTO, token: string)=>{

        const {name, music_genre, responsible} = input

        if(!name || !music_genre || !responsible){
            throw new Error("Fill in all data")
        }

        const authenticatorUser = new Authenticator 

        const tokenData = authenticatorUser.getTokenData(token)
  
          if (tokenData.role !== USER_ROLES.ADMIN) {
          throw new Error("Você precisar ser ADMIN para cadastrar a banda!");
          }

        const checkNameBanda = await this.bandaDatabase.findBandaByName(name);

        if (checkNameBanda) {
          throw new Error("Name Banda already exists!");
        }

        const idGenerator = new Idgenerator();
        const id = idGenerator.generateId()
        console.log(id)

        const banda = {id, name, music_genre, responsible}

        await this.bandaDatabase.createBanda(banda)
        
    }

    getBanda = async (idBanda: any)=>{

      if(!idBanda){
          throw new Error("você precisar usar um id")
      }

      const checkBanda = await this.bandaDatabase.findBandaById(idBanda);
    return checkBanda

  }
}