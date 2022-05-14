import { FindByShowBanda, Show } from "../types/showType"
import { BaseDatabase } from "./BaseDatabase"



export class ShowDatabase extends BaseDatabase {
  protected TABLE_NAME = "SHOWS"

  createShow =  async (show: Show) => {
    try{
      await BaseDatabase.connection(this.TABLE_NAME)
      .insert(show)
      
    } catch(error: any){
      throw new Error(error.sqlMessage || error.message)
    }
  }

  findShowByDayHora = async (dia: string, hora: number)=>{
    try {
        const showDia : FindByShowBanda= await BaseDatabase.connection(this.TABLE_NAME)
        .select('*')
        .where({week_day: dia, start_time:hora})
    return showDia[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  findShowByDay = async (dia: string)=>{
    try {
        const showDia = await BaseDatabase.connection.raw(`
        SELECT name, music_genre, week_day  FROM SHOWS  JOIN BANDAS ON SHOWS.band_id = BANDAS.id WHERE week_day = '${dia}';
        `)

    return showDia[0];
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}