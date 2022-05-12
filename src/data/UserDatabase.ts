import { User } from "../types/userType";
import { BaseDatabase } from "./BaseDatabase";


export class UserDatabase extends BaseDatabase {

    create = async(user:User)=>{

        //queries para consultar/inserir no banco de dados
        await this.connection.raw(``)


    }    
}