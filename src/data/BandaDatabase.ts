import { FindByNameBanda, Banda } from "../types/bandaType";
import { BaseDatabase } from "./BaseDatabase";


export class BandaDatabase extends BaseDatabase {
  protected TABLE_NAME = "BANDAS"

  createBanda =  async (banda: Banda) => {
    try{
      await BaseDatabase.connection(this.TABLE_NAME)
      .insert(banda)
      
    } catch(error: any){
      throw new Error(error.sqlMessage || error.message)
    }
  }
    
    findBandaByName = async (name: string)=>{
      try {
          const nameBanda : FindByNameBanda= await BaseDatabase.connection(this.TABLE_NAME)
          .select()
          .where({ name })
      return nameBanda[0];
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }

    findBandaById = async (id: string)=>{
      try {
          const banda = await BaseDatabase.connection(this.TABLE_NAME)
          .select('*')
          .where({ id })
      return banda[0];
      } catch (error: any) {
        throw new Error(error.sqlMessage || error.message);
      }
    }
}