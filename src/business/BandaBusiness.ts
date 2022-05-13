import { BandaDatabase } from "../data/BandaDatabase";
import { UserDatabase } from "../data/UserDatabase";
import { Authenticator } from "../services/Authenticator";
import { Idgenerator } from "../services/IdGenerator";
import { BandaInputDTO } from "../types/bandaInputDTO";

export class BandaBusiness{
  constructor(private bandaDatabase: BandaDatabase) {}

    createBanda = async (input: BandaInputDTO, token: string)=>{



      const authenticatorUser = new Authenticator 

      const tokenData = authenticatorUser.getTokenData(token)

      console.log("tokennn",tokenData)

      const userDatabase = new UserDatabase();

      const role: any  = userDatabase.findUserById(tokenData.id) 

      

      console.log("aqui roleeeee",role)

        if (role !== 'ADMIN') {
         throw new Error("Você precisar ser ADMIN para cadastrar a banda!");
         }

      
        //validacao do body
        const {name, music_genre, responsible} = input

        if(!name || !music_genre || !responsible){
            throw new Error("Fill in all data")
        }

        //conferir se a banda existe
        const checkNameBanda = await this.bandaDatabase.findBandaByName(name);

        if (checkNameBanda) {
          throw new Error("Name Banda already exists!");
        }

        //criar uma id pro usuario

        const idGenerator = new Idgenerator();
        const id = idGenerator.generateId()
        console.log(id)

        //criar banda no banco

        const banda = {id, name, music_genre, responsible}

        await this.bandaDatabase.createBanda(banda)
        
    }
}