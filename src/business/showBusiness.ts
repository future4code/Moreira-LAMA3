import { ShowDatabase } from "../data/ShowDatabase";
import { Idgenerator } from "../services/IdGenerator";
import { ShowInputDTO } from "../types/showInputDTO";
import { SHOW_ROLES } from "../types/showType";

export class ShowBusiness{
  constructor(private showDatabase: ShowDatabase) {}

    createShow = async (input: ShowInputDTO)=>{

        const {week_day, start_time, end_time, band_id} = input

        if(!week_day || !start_time || !end_time || !band_id){
            throw new Error("Fill in all data")
        }

        if(start_time < 8 || end_time > 23){
          throw new Error("O shows só podem ser entre 8h até 23h")
        }

        if(week_day !== SHOW_ROLES.DOMINGO && 
          week_day !== SHOW_ROLES.SABADO &&
          week_day !== SHOW_ROLES.SEXTA
          ){
          throw new Error("O shows só podem ser entre sexta até domingo")
        }

        const checkShow = await this.showDatabase.findShowByDayHora(week_day, start_time );

        if (checkShow) {
          throw new Error("Dia e horário ocupado, tente outra data ou hora");
        }

        const idGenerator = new Idgenerator();
        const id = idGenerator.generateId()
        console.log(id)

        const show = {id, week_day, start_time, end_time, band_id}

        await this.showDatabase.createShow(show)
        
    }

    getShow = async (week_day: string)=>{

      // if(!week_day){
      //     throw new Error("você precisar 'sexta', 'sabado' ou 'domingo")
      // }
      //conferir se a banda existe
      const checkShowDate = await this.showDatabase.findShowByDay(week_day);
    return checkShowDate

  }
}